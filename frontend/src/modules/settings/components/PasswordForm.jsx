import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";

import { changePassword } from "@/features/profile/profileThunk";

import {
  selectPasswordLoading,
  selectProfileMessage,
  selectProfileError,
} from "@/features/profile/profileSelectors";

const PasswordForm = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectPasswordLoading);

  const message = useSelector(selectProfileMessage);

  const error = useSelector(selectProfileError);

  const {
    register,

    handleSubmit,

    reset,

    watch,

    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  useEffect(() => {
    if (message) {
      toast.success(message);

      reset();
    }

    if (error) {
      toast.error(error);
    }
  }, [message, error, reset]);

  const onSubmit = (data) => {
    dispatch(
      changePassword({
        oldPassword: data.oldPassword,

        newPassword: data.newPassword,
      }),
    );
  };

  return (
    <div
      className="
        space-y-6
        "
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
            space-y-5
            "
      >
        <div>
          <label
            className="
                    text-sm
                    text-gray-300
                    "
          >
            Current Password
          </label>

          <input
            type="password"
            placeholder="Enter current password"
            {...register("oldPassword", {
              required: "Current password required",
            })}
            className="
                    w-full
                    mt-2
                    bg-[#0c0a09]
                    border
                    border-[#292524]
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    outline-none
                    focus:border-orange-500
                    transition
                    "
          />

          {errors.oldPassword && (
            <p
              className="
                        text-red-400
                        text-sm
                        mt-1
                        "
            >
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        <div>
          <label
            className="
                    text-sm
                    text-gray-300
                    "
          >
            New Password
          </label>

          <input
            type="password"
            placeholder="Create new password"
            {...register("newPassword", {
              required: "New password required",

              minLength: {
                value: 6,

                message: "Minimum 6 characters required",
              },
            })}
            className="
                    w-full
                    mt-2
                    bg-[#0c0a09]
                    border
                    border-[#292524]
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    outline-none
                    focus:border-orange-500
                    transition
                    "
          />

          {errors.newPassword && (
            <p
              className="
                        text-red-400
                        text-sm
                        mt-1
                        "
            >
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div>
          <label
            className="
                    text-sm
                    text-gray-300
                    "
          >
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            {...register(
              "confirmPassword",

              {
                required: "Confirm password required",

                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              },
            )}
            className="
                    w-full
                    mt-2
                    bg-[#0c0a09]
                    border
                    border-[#292524]
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    outline-none
                    focus:border-orange-500
                    transition
                    "
          />

          {errors.confirmPassword && (
            <p
              className="
                        text-red-400
                        text-sm
                        mt-1
                        "
            >
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          disabled={loading}
          type="submit"
          className="
                w-full
                sm:w-auto
                px-8
                py-3
                rounded-xl
                font-medium
                text-white
                bg-gradient-to-r
                from-orange-600
                to-yellow-500
                hover:scale-[1.02]
                transition
                disabled:opacity-50
                "
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>

      {/* Email Reset */}

      <div
        className="
            pt-6
            border-t
            border-[#292524]
            "
      >
        <p
          className="
                text-sm
                text-gray-400
                "
        >
          Forgot your current password?
        </p>

        <Link
          to="/forgot-password"
          className="
                inline-block
                mt-2
                text-orange-400
                hover:text-orange-300
                text-sm
                font-medium
                transition
                "
        >
          Reset password using email →
        </Link>
      </div>
    </div>
  );
};

export default PasswordForm;
