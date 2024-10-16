import React from "react";
import Avatar from "./Avatar";

function GroupPendingSelectMember(props) {
  const { member } = props;
  console.log(member);

  return (
    <div className="flex gap-2 items-center p-2 hover:bg-slate-300">
      <div className="w-7 h-7 bg-white rounded-full overflow-hidden">
        <Avatar imgSrc={member.user.Profile[0].profileImage} />
      </div>
      <p>{member.user.Profile[0].name}</p>
    </div>
  );
}

export default GroupPendingSelectMember;
