import {
  Mail,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const RecentEmails = ({ emails = [] }) => {
  const getStatus = (status) => {
    if (status === "sent") {
      return {
        icon: CheckCircle,
        className:
          "bg-green-500/10 text-green-400",
      };
    }

    if (status === "failed") {
      return {
        icon: XCircle,
        className:
          "bg-red-500/10 text-red-400",
      };
    }

    return {
      icon: Clock,
      className:
        "bg-yellow-500/10 text-yellow-400",
    };
  };

  return (
    <div
      className="
        rounded-2xl
        border
        border-stone-800
        bg-stone-900
        p-5
      "
    >
      {emails.length === 0 ? (
        <div
          className="
            flex
            min-h-[220px]
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-stone-800
              text-stone-500
            "
          >
            <Mail size={21} />
          </div>

          <p className="mt-4 text-sm text-stone-400">
            No emails found
          </p>

          <p className="mt-1 text-xs text-stone-600">
            Your recent email activity will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {emails.slice(0, 5).map((email) => {
            const status = getStatus(email.status);
            const StatusIcon = status.icon;

            return (
              <div
                key={email._id}
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  rounded-xl
                  border
                  border-transparent
                  bg-stone-800/50
                  p-4
                  transition
                  hover:border-stone-700
                  hover:bg-stone-800
                "
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-stone-700/60
                      text-stone-400
                    "
                  >
                    <Mail size={16} />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        truncate
                        text-sm
                        font-medium
                        text-white
                      "
                    >
                      {email.subject || "No subject"}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-stone-500
                      "
                    >
                      Email activity
                    </p>
                  </div>
                </div>

                <div
                  className={`
                    flex
                    shrink-0
                    items-center
                    gap-1.5
                    rounded-full
                    px-3
                    py-1
                    text-[11px]
                    font-medium
                    ${status.className}
                  `}
                >
                  <StatusIcon size={12} />

                  {email.status || "pending"}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentEmails;