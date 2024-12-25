import { useSelector } from "react-redux";
import { useCheckAuth } from "../middleware";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function CrmFormOdati() {
  useCheckAuth();
  const selector = useSelector((state) => state.user);
  const [msgSend, setMsgSend] = useState({
    state: 0,
    msg: "",
  });
  const [formData, setFormData] = useState({
    name: selector.name,
    code: selector.code,
    type: "",
    dateSale: "",
    barcode: "",
    count: "",
    tozih: "",
    media: "خیر"

   
  });

  const [MsgFull, setMsgFull] = useState(0);
  let navigator = useNavigate();

  const handelFormInput = (e) => {
    setFormData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
    console.log(formData);
  };

  const clearAll = () => {
    setFormData({
      name: selector.name,
      code: selector.code,
      type: "",
      dateSale: "",
      barcode: "",
      count: "",
      tozih: "",
      media: "خیر"

     
    });
  };

  const HandleSend = (e) => {
    e.preventDefault();

    let jsonData = JSON.stringify(formData);

    axios
      .post("http://192.168.1.99/tar/crm/saveFormOdati.php", jsonData)
      .then(function (response) {
        console.log(response.data);
        if (response.data === "ok") {
          clearAll();

          setMsgSend({ state: 1, msg: " ثبت موفق " });
          setMsgFull(1);
        }
      })
      .catch(function (error) {
        console.log("errrrrrr");
        setMsgFull(2);
        setMsgSend({ state: 2, msg: "  خطا در ثبت  " });
      });
  };
  return (
    <div
      className="container py-3 "
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3 className="text-center pb-3 ">فرم درخواست عودتی</h3>

      {MsgFull === 1 && (
        <div
          style={{
            backgroundColor: "#000000c9",
            position: "fixed",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            zIndex: "10",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="h3 text-warning pb-3"> ثبت موفق </div>
          <button
            className="btn btn-info"
            onClick={() => {
              navigator("/");
            }}
          >
            بازکشت
          </button>
        </div>
      )}

      {MsgFull === 2 && (
        <div
          style={{
            backgroundColor: "#000000c9",
            position: "fixed",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            zIndex: "10",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="h3 text-warning pb-3"> خطا در ثبت </div>
          <button
            className="btn btn-info"
            onClick={() => {
              setMsgFull(0);
            }}
          >
            بازکشت
          </button>
        </div>
      )}

      {msgSend.state != 0 && msgSend.state == 1 ? (
        <span className="text-success">{msgSend.msg}</span>
      ) : (
        <span className="text-danger">{msgSend.msg}</span>
      )}

      <form action="#" method="POST"  style={{ minWidth: "550px"}} onSubmit={HandleSend}>
        <div className="form-group ">
          <label htmlFor="name"> نام مشتری </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name={selector.name}
            value={selector.name}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="code"> کد مشتری </label>
          <input
            type="text"
            className="form-control"
            id="code"
            name={selector.code}
            value={selector.code}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="type"> نوع محصول </label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            required
            onChange={handelFormInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateSale"> تاریخ خرید محصول </label>
          <input
            type="text"
            className="form-control"
            id="dateSale"
            name="dateSale"
            required
            onChange={handelFormInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="barcode"> بارکد لیبل </label>
          <input
            type="text"
            className="form-control"
            id="barcode"
            name="barcode"
            onChange={handelFormInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="count"> تعداد یا متر </label>
          <input
            type="text"
            className="form-control"
            id="count"
            name="count"
            required
            onChange={handelFormInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tozih"> شرح مشکل </label>
          <input
            type="text"
            className="form-control"
            id="tozih"
            name="tozih"
            required
            onChange={handelFormInput}
          />
        </div>
        عکس/ویدیو
        <div className="form-check">

          <input
            className="form-check-input"
            type="checkbox"
            name="media"
            id="radio1"
            onChange={(e)=>{
             
              setFormData((pre) => {
                const med = e.target.checked ? "بله" : "خیر";
                return { ...pre, media: med };
              });
              
            }}
          />
          <label className="form-check-label" htmlFor="radio1">
            ارسال شده
          </label>

        </div>
        
        <button
          className="btn btn-primary float-right "
         type="submit"
        >
          ارسال
        </button>
        <br />
      </form>
      <div className="text-center bg-success text-white p-2 mt-1">
        کیفیت زیبایی می آفریند
      </div>
    </div>
  );
}

export default CrmFormOdati;
