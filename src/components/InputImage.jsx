import React from "react";

function InputImage(props) {
  const { selectedImage, setSelectedImage } = props;
  return (
    <div>
      <button
        className="absolute top-1 right-1"
        onClick={() => setSelectedImage(null)}
      >
        ✕
      </button>
      <img src={selectedImage} alt="Selected" className="w-16 h-16" />
    </div>
  );
}

export default InputImage;
