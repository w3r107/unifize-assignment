import React from "react";

interface IUserAvatarProps {
  name?: string;
  otherThings?: string | React.ReactNode;
}
const UserAvatar = ({ name, otherThings }: IUserAvatarProps) => {
  const firstNm = name?.split(" ")[0];
  const lastNm = name?.split(" ")[1];
  return (
    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm">
      {name && (
        <p className="text-center">
          {firstNm?.[0]}
          {lastNm?.[0]}
        </p>
      )}
      {otherThings && otherThings}
    </div>
  );
};

export default UserAvatar;
