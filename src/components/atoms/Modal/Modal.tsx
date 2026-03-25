import React from "react";

const Modal: React.FC<{
  onClickBackdrop: React.MouseEventHandler<HTMLDivElement> | undefined;
  children: React.ReactNode;
  height: number;
}> = ({ onClickBackdrop, children, height }) => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 999,
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,.4)",
            width: "100%",
            height: "100%",
          }}
          onClick={onClickBackdrop}
        ></div>
        <div
          style={{
            background: "#fff",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            width: "100%",
            position: "fixed",
            bottom: 0,
            height,
            paddingTop: 30,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
