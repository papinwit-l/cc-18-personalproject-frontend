import React from "react";
import GroupBar from "../components/GroupBar";
import useFriendStore from "../stores/friendStore";
import GroupChatBody from "../components/GroupChatBody";
import GroupChatHeader from "../components/GroupChatHeader";
import GroupChatFooter from "../components/GroupChatFooter";

function Group() {
  const activeGroup = useFriendStore((state) => state.activeGroup);

  return (
    <div className="bg-slate-100 h-full flex">
      {/* Chat List */}
      <div className="w-[300px] h-full">
        <GroupBar />
      </div>

      {/* Chat Content */}
      <div className="flex-1 h-full w-[calc(100%-300px)] flex flex-col bg-[url(./public/bg_logo.jpg)] bg-no-repeat bg-[length:300px_300px] bg-center bg-[#cfcfcf]">
        {activeGroup && (
          <>
            <GroupChatHeader />
            <GroupChatBody />
            <GroupChatFooter />
          </>
        )}
      </div>
    </div>
  );
}

export default Group;
