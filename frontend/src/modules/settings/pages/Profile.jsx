import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import ProfileAvatar from "../components/ProfileAvatar";
import ProfileForm from "../components/ProfileForm";
import PasswordForm from "../components/PasswordForm";

import { getProfile } from "@/features/profile/profileThunk";

import {
  selectProfile,
  selectProfileLoading,
} from "@/features/profile/profileSelectors";

const Profile = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectProfile);

  const loading = useSelector(selectProfileLoading);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div
        className="
            min-h-[400px]
            flex
            items-center
            justify-center
            text-gray-400
            "
      >
        Loading Profile...
      </div>
    );
  }

  return (
    <div
      className="
        w-full
        space-y-8
        "
    >
      {/* Profile Header */}

      <div
        className="
            bg-[#1c1917]
            border
            border-[#292524]
            rounded-2xl
            p-6
            sm:p-8
            "
      >
        <ProfileAvatar user={user} />
      </div>

      {/* Page Title */}

      <div>
        <h1
          className="
                text-3xl
                font-bold
                text-white
                "
        >
          Profile Settings
        </h1>

        <p
          className="
                text-gray-400
                mt-2
                "
        >
          Manage your personal information and account security.
        </p>
      </div>

      {/* Personal Information */}

      <section
        className="
            bg-[#1c1917]
            border
            border-[#292524]
            rounded-2xl
            p-6
            sm:p-8
            "
      >
        <div className="mb-6">
          <h2
            className="
                    text-xl
                    font-semibold
                    text-white
                    "
          >
            Personal Information
          </h2>

          <p
            className="
                    text-sm
                    text-gray-400
                    mt-1
                    "
          >
            Update your profile details
          </p>
        </div>

        <ProfileForm user={user} />
      </section>

      {/* Security */}

      <section
        className="
            bg-[#1c1917]
            border
            border-[#292524]
            rounded-2xl
            p-6
            sm:p-8
            "
      >
        <div className="mb-6">
          <h2
            className="
                    text-xl
                    font-semibold
                    text-white
                    "
          >
            Security
          </h2>

          <p
            className="
                    text-sm
                    text-gray-400
                    mt-1
                    "
          >
            Manage password and account recovery
          </p>
        </div>

        <PasswordForm />
      </section>
    </div>
  );
};

export default Profile;
