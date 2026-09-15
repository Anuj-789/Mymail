const EmailUsage = require("../../models/usermaillimit/emailUsage.model");

// Daily limits according to user plan
const DAILY_LIMITS = {
    free: 10,
    pro: 200,
    enterprise: 1000
};

// Get today's date (YYYY-MM-DD)
const getToday = () => {
    return new Date().toISOString().split("T")[0];
};

// Get daily limit according to plan
const getDailyLimit = (plan = "free") => {
    return DAILY_LIMITS[plan] || DAILY_LIMITS.free;
};

// Check whether user can send email
const checkDailyEmailLimit = async (userId, plan = "free") => {

    const today = getToday();

    const limit = getDailyLimit(plan);

    let usage = await EmailUsage.findOne({
        userId,
        date: today
    });

    if (!usage) {
        usage = await EmailUsage.create({
            userId,
            date: today,
            count: 0
        });
    }

    return {
        allowed: usage.count < limit,
        used: usage.count,
        remaining: limit - usage.count,
        limit
    };
};

// Increase email count after successful email
const incrementDailyEmailCount = async (userId) => {

    const today = getToday();

    await EmailUsage.findOneAndUpdate(
        {
            userId,
            date: today
        },
        {
            $inc: {
                count: 1
            }
        },
        {
            upsert: true,
            new: true
        }
    );
};

// Remaining emails
const getRemainingEmails = async (userId, plan = "free") => {

    const result = await checkDailyEmailLimit(
        userId,
        plan
    );

    return result.remaining;
};

module.exports = {
    checkDailyEmailLimit,
    incrementDailyEmailCount,
    getRemainingEmails,
    getDailyLimit
};