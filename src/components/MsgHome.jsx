import React from "react";

function MsgHome({ msg }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "15px",
        left: "15px",
        width: "250px",
        height: "120px",
        backgroundColor: "#ffca67de",
        borderRadius: "10px",
        border: "1px solid #bebebe",
        padding: "10px",
        color: "#000000",
        zIndex: "1000",
       direction:"ltr"
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "-15px",
          bottom: "15px",

          borderTop: "15px solid transparent",
          borderRight: "15px solid black",
          borderLeft: "none",
          borderBottom: "15px solid transparent",
        }}
      ></div>

      {/* با سلام
      <br />
      به پنل مشتریان شرکت یکتا فیلم تبریز خوش آمدید.
      <br />
      با آرزوی بهترین ها برای شما */}

   {msg}

     
    </div>
  );
}

export default MsgHome;
