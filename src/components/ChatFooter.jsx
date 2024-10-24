import React, { useContext, useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import { SocketContext } from "../contexts/SocketContext";
import useFriendStore from "../stores/friendStore";
import { IconDownArrow, IconPicture, IconUpArrow } from "../icons";
import useUtilStore from "../stores/utilStore";
import { toast } from "react-toastify";

function ChatFooter() {
  const socket = useContext(SocketContext);
  const activeChat = useFriendStore((state) => state.activeChat);
  const chatId = activeChat.id;
  const user = useUserStore((state) => state.user);
  const user_name = user.profile.name;
  //   console.log(user_name);
  const [message, setMessage] = useState("");
  const [menuState, setMenuState] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const setElevateChatOnMsg = useUtilStore(
    (state) => state.setElevateChatOnMsg
  );

  const hdlOnchange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    //check if file size more than 10mb
    if (e.target.files[0].size > 100000000) {
      // alert("File size is too large. Please select a file smaller than 10MB.");
      toast.error(
        "File size is too large. Please select a file smaller than 10MB."
      );
      return;
    }

    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Set the selected image

      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result; // Get base64 representation of the image
        setImgPreview(base64Image); // Set the image to be previewed
      };

      reader.readAsDataURL(file); // Read the file as a data URL (Base64)
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImgPreview(null);
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    // console.log(message);
    if (message && user_name) {
      // socket.emit("message", {
      //   message: message,
      //   name: user_name,
      //   serderId: user.id,
      //   chatId: chatId,
      //   socketID: socket.id,
      // });
      //check message length not more than 150
      if (message.length > 150) {
        toast.error("Message cannot be more than 150 characters");
        // alert("Message cannot be more than 150 characters");
        return;
      }
      socket.emit("message", {
        message: message,
        senderId: user.id,
        chatId: chatId,
        socketID: socket.id,
      });
      setMessage("");
    }
    if (selectedImage) {
      const arrayBuffer = await selectedImage.arrayBuffer();
      socket.emit("imageSend", {
        imageBuffer: arrayBuffer,
        senderId: user.id,
        chatId: chatId,
        socketID: socket.id,
      });
      clearImage();
    }
    setElevateChatOnMsg(chatId);
  };

  const hdlMenuState = (e) => {
    e.preventDefault();
    setMenuState(!menuState);
  };

  return (
    <div>
      {imgPreview && (
        <div id="BG" className="bg-gray-400 p-2 bg-opacity-25">
          <div className="flex w-full h-full items-center gap-2">
            <div className="relative">
              <button
                className="absolute -top-2 -right-2 bg-white bg-opacity-50 rounded-full w-6 h-6 flex items-center justify-center"
                onClick={clearImage}
              >
                ✕
              </button>
              <img
                src={imgPreview}
                alt="image"
                className="w-20 h-20 opacity-100"
              />
            </div>
          </div>
        </div>
      )}

      <div className="min-h-[3rem]">
        <form
          className="w-full h-full flex flex-col items-center gap-2 p-2"
          onSubmit={hdlSubmit}
        >
          {menuState && (
            <div
              className="flex w-full h-full gap-2"
              onClick={() => document.getElementById("image-input").click()}
            >
              <div className="h-7 w-7 p-1 bg-gray-200 rounded-full hover:bg-gray-100 cursor-pointer">
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <IconPicture className="w-full h-full" />
              </div>
            </div>
          )}
          <div className="flex w-full h-full items-center justify-center gap-2">
            <button
              className="h-7 w-7 p-2 bg-gray-200 rounded-full hover:bg-gray-100"
              onClick={hdlMenuState}
            >
              {menuState ? (
                <IconDownArrow className="w-full h-full" />
              ) : (
                <IconUpArrow className="w-full h-full" />
              )}
            </button>
            <input
              type="text"
              className="flex-1 h-full rounded-full border-2 border-slate-300 p-2"
              placeholder="Enter a message"
              value={message}
              onChange={hdlOnchange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  hdlSubmit(e);
                }
              }}
            />
            <button className="btn btn-sm" onClick={hdlSubmit}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatFooter;
