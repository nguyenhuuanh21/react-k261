import React from "react";

const Popup = ({ image, ref }) => {
  return (
    <dialog ref={ref} className="image-dialog">
      <form method="dialog">
        <button className="close-btn">✕</button>
      </form>

      <img src={image} alt="" />
    </dialog>
  );
};

export default Popup;
