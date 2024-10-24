import React, { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import Avatar from "./Avatar";
import { IconEdit } from "../icons";
import axios from "axios";
import { toast } from "react-toastify";

function MyProfileEdit(props) {
  const { setEditMode } = props;
  const token = useUserStore((state) => state.token);
  const currentUser = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [displayName, setDisplayName] = useState(currentUser.profile.name);
  const [previewProfileImage, setPreviewProfileImage] = useState(
    currentUser.profile.profileImage
  );
  const [selectedImage, setSelectedImage] = useState(null);

  const profileModal = document.getElementById("myprofile-modal");
  profileModal.addEventListener("close", () => {
    setEditMode(false);
  });

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewProfileImage(currentUser.profile.profileImage);
  };

  const hdlCancelEdit = (e) => {
    e.preventDefault();
    clearImage();
    setEditMode(false);
  };

  const hdlNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Set the selected image

      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result; // Get base64 representation of the image
        setPreviewProfileImage(base64Image); // Set the image to be previewed
      };

      reader.readAsDataURL(file); // Read the file as a data URL (Base64)
    }
  };

  const updateProfile = async () => {
    try {
      const body = new FormData();
      body.append("name", displayName);
      if (selectedImage) {
        body.append("profileImage", selectedImage);
      }
      const res = await axios.patch(
        import.meta.env.VITE_HOST_IP + "/user/editprofile",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data);
      // console.log(currentUser);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    // console.log(displayName);
    // console.log(selectedImage);
    updateProfile();
    setEditMode(false);
    toast.success("Profile updated successfully");
  };

  return (
    <form className="flex flex-col gap-2 items-center" onSubmit={hdlSubmit}>
      <div className="relative">
        <div className="w-40 h-40 bg-white rounded-full overflow-hidden">
          <Avatar imgSrc={previewProfileImage} />
        </div>
        <div
          className="w-7 h-7 absolute bottom-1 right-1 rounded-full p-1 bg-slate-300 cursor-pointer hover:bg-slate-200"
          onClick={() => {
            document.getElementById("profile-image-input").click();
          }}
        >
          <input
            id="profile-image-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <IconEdit />
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <input
          type="text"
          className="input input-sm"
          value={displayName}
          onChange={hdlNameChange}
        />
      </div>
      <p>Username: {currentUser.username}</p>
      <p>Email: {currentUser.email}</p>
      <div className="flex gap-2">
        <button className="btn btn-primary">Save</button>
        <button className="btn" onClick={hdlCancelEdit}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default MyProfileEdit;
