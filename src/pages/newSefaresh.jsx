import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import { useSelector } from "react-redux";

export const NewSefaresh = () => {
  const dd = new Date();
  const [dateShamsi, setdateShamsi] = useState(dd.toLocaleString("fa-IR"));
  const inputMahsoulRef = useRef(null);
  const [listMahsolatSearch, setListMahsolatSearch] = useState([]);
  const [msgErrorMahsol, setMsgErrorMahsol] = useState("");
  const [showFullImageCode, setShowFullImageCode] = useState("");

  const selector = useSelector((state) => state.user);

  const [listMahsolat, setListMahsolat] = useState([]);
  const [codes, setCodes] = useState([]);
  const [isSaveing, setIsSaveing] = useState(false);
  const [saveState, setSaveState] = useState("");
  const [inputMahsol, setInputMahsol] = useState(false);
  const [successSend, setSuccessSend] = useState([0, "در حال ارسال سفارش"]);

  const [tempRow, setTempRow] = useState(1);

  const [tempSefaresh, setTempSefaresh] = useState({
    id: 0,
    customerCode: selector.code,
    customerName: selector.name,
    date: dateShamsi,
    type: "1",
    dateNiaz: "",
    userSabt: "",
  });

  const [tempCode, setTempCode] = useState({
    id: "",
    codeMahsol: "",
    nameMahsol: "",
    type: "هات استمپ-لیزر",
    width: "",
    metraj: "",
    count: "",
    tozih: "",
    state: "ثبت مشتری",
  });

  const clearAll = () => {
    setCodes([]);
    setTempRow(1);
    setTempSefaresh({
      id: 0,
      customerCode: selector.code,
      customerName: selector.name,
      date: dateShamsi,
      type: "1",
      dateNiaz: "",
      userSabt: "",
    });
    setTempCode({
      id: "",
      codeMahsol: "",
      nameMahsol: "",
      type: "هات استمپ-لیزر",
      width: "",
      metraj: "",
      count: "",
      tozih: "",
      state: "ثبت مشتری",
    });
  };

  const removeCode = (id) => {
    setCodes(codes?.filter((e) => e.id !== id));
    //console.log(codes);
  };

  const handellFocus = () => {
    setTimeout(() => {
      if (inputMahsoulRef.current) {
        inputMahsoulRef.current.focus();
      }
    }, 200);
  };

  useEffect(() => {
    axios.get("http://192.168.1.99/tar/getMahsolat.php").then((res) => {
      setListMahsolat(res.data);
    });
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {isSaveing && <Loading status={successSend[0]} msg={successSend[1]} />}

      {showFullImageCode !== "" && (
        <>
          <div
            style={{
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
              backgroundColor: "#181818cb",
              zIndex: "1000",
            }}
            onClick={(e) => {
              if(e.target.className === "showImg") return

              setShowFullImageCode("");
            }}
          >
            <img
              style={{ width: "40%" }}
              className="showImg"
              src={
                "http://192.168.1.99/tar/mahsolat/orginal/" + showFullImageCode
              }
              alt="pic"
            />
          </div>
        </>
      )}

      {/* {saveState !== "" && (
            <div className={`alert alert-dismissible fade show ${saveState === "ok" ? "alert-success" : "alert-danger"}`} role="alert">
                <strong> {saveState === "ok" ? "سفارش ما با موفقیت ثبت شد." : "خطا در ثبت سفارش"} </strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        )} */}

      <div
        className="card border  "
        style={{ width: "96%", textAlign: "center" }}
      >
        <h3 className="card-title " style={{ paddingTop: "10px" }}>
          سفارش جدید
        </h3>

        <div className="card-body">
          <div className="row  p-2">
            <div className="col">
              <label htmlFor="code"> کد مشتری </label>
              <input
                id="code"
                className="form-control mb-2"
                type="text"
                placeholder="  کد "
                value={selector.code}
                readOnly
              />
            </div>
            <div className="col">
              <label htmlFor="name"> نام مشتری </label>
              <input
                id="name"
                className="form-control mb-2"
                type="text"
                placeholder="  نام "
                readOnly
                value={selector.name}
              />
            </div>
            <div className="col">
              <label htmlFor="date"> تاریخ سفارش </label>
              <input
                id="date"
                className="form-control  mb-2"
                style={{ fontSize: "12px" }}
                type="text"
                value={dateShamsi}
                placeholder="تاریخ  "
                onChange={(e) => {
                  setTempSefaresh({ ...tempSefaresh, date: e.target.value });
                }}
              />
            </div>
            <div className="col">
              <label htmlFor="type">نوع سفارش </label>

              <select
                className="form-control "
                defaultValue="1"
                id="type"
                onChange={(e) => {
                  setTempSefaresh({ ...tempSefaresh, type: e.target.value });
                }}
              >
                <option value="1" style={{ color: "#07eaf2" }}>
                  هات استمپ کلد
                </option>
                <option value="2" style={{ color: "#f20713" }}>
                  هات استمپ هیت
                </option>
                <option value="3" style={{ color: "#f207cb" }}>
                  هات استمپ ماربل
                </option>
                <option value="4" style={{ color: "#f28507" }}>
                  روکش پی وی سی
                </option>
                <option value="5" style={{ color: "#07f20f" }}>
                  وکیوم
                </option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="zaman"> زمان مورد نیاز </label>
              <input
                id="zaman"
                className="form-control mb-2"
                type="text"
                placeholder="   زمان  "
                onChange={(e) => {
                  setTempSefaresh({
                    ...tempSefaresh,
                    dateNiaz: e.target.value,
                  });
                }}
              />
            </div>
            <div className="col">
              <label htmlFor="userSabt"> کاربر ثبت کننده </label>
              <input
                id="userSabt"
                className="form-control mb-2"
                type="text"
                placeholder="    ثبت کننده"
                onChange={(e) => {
                  setTempSefaresh({
                    ...tempSefaresh,
                    userSabt: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <hr />

          <div className="row p-1">
            <div className="col relative">
              <label htmlFor="codeMahsol"> کد محصول </label>
              <input
                id="codeMahsol"
                className="form-control  "
                type="text"
                placeholder="کد محصول "
                style={{ fontSize: "10px" }}
                value={tempCode.codeMahsol}
                onChange={(e) => {
                  setTempCode({ ...tempCode, codeMahsol: e.target.value });
                }}
                onClick={() => {
                  setInputMahsol(true);

                  setListMahsolatSearch([]);

                  handellFocus();
                }}
                readOnly
              />
              {inputMahsol && (
                <>
                  <div
                    style={{
                      backgroundColor: "#8080804d",
                      position: "fixed",
                      top: "0",
                      bottom: "0",
                      left: "0",
                      right: "0",
                      zIndex: "10",
                    }}
                    onClick={() => {
                      setInputMahsol(false);
                    }}
                  ></div>
                  <div
                    className="card  text-light"
                    style={{
                      width: "350px",
                      position: "absolute",
                      height: "320px",
                      zIndex: "100",
                      backgroundColor: "#6c7e7e",
                    }}
                  >
                    <h5 className="text-light">کدها</h5>
                    <input
                      type="text"
                      placeholder="search"
                      ref={inputMahsoulRef}
                      style={{
                        textAlign: "center",
                        borderRadius: "5px",
                        padding: "5px 15px",
                        margin: "2px 10px",
                      }}
                      onChange={(e) => {
                        setListMahsolatSearch([]);
                        listMahsolat.map((i) => {
                          if (i.code === e.target.value) {
                            console.log("find: " + i.name);

                            setListMahsolatSearch([i]);
                          }
                          return false;
                        });
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",

                        padding: "2px 10px",
                        overflow: "auto",
                      }}
                    >
                      {listMahsolatSearch.length > 0 ? (
                        <>
                          {listMahsolatSearch.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                backgroundColor: "#e7e7e7",
                                borderRadius: "5px",
                                marginTop: "10px",
                                height: "80px",
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "0 10px",
                              }}
                              onClick={(e) => {
                                if (e.target.className === "imgclick") return;

                                setInputMahsol(false);

                                setTempCode({
                                  ...tempCode,
                                  codeMahsol: item.code,
                                  nameMahsol: item.name,
                                  type: item.type,
                                });
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <div
                                  style={{
                                    textAlign: "right",
                                    padding: "5px 15px",
                                    fontSize: "15px",
                                    color: "black",
                                  }}
                                >
                                  کد: {item.code}
                                </div>
                                <div
                                  style={{
                                    textAlign: "right",
                                    padding: "0px 15px",
                                    fontSize: "12px",
                                    color: "#464646",
                                  }}
                                >
                                  {item.type}
                                </div>
                                <div
                                  style={{
                                    textAlign: "right",
                                    padding: "5px 15px",
                                    fontSize: "12px",
                                    color: "#464646",
                                  }}
                                >
                                  📃 {item.discription}
                                </div>
                              </div>

                              <div>
                                <img
                                  onClick={() => {
                                    setShowFullImageCode(item.image);
                                  }}
                                  className="imgclick"
                                  src={
                                    "http://192.168.1.99/tar/mahsolat/tamnails/" +
                                    item.image
                                  }
                                  width="80"
                                  alt=""
                                />
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {listMahsolat.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                backgroundColor: "#e7e7e7",
                                borderRadius: "5px",
                                marginTop: "10px",
                                height: "80px",
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "0 10px",
                              }}
                              onClick={(e) => {
                                if (e.target.className === "imgclick") return;

                                setInputMahsol(false);
                                // console.log(item.id);
                                setTempCode({
                                  ...tempCode,
                                  codeMahsol: item.code,
                                  nameMahsol: item.name,
                                  type: item.type,
                                });
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <div
                                  style={{
                                    textAlign: "right",
                                    padding: "5px 15px",
                                    fontSize: "15px",
                                    color: "black",
                                  }}
                                >
                                  کد: {item.code}
                                </div>
                                <div
                                  style={{
                                    textAlign: "right",
                                    padding: "0px 15px",
                                    fontSize: "12px",
                                    color: "#464646",
                                  }}
                                >
                                  {item.type}
                                </div>
                                <div
                                  style={{
                                    textAlign: "right",
                                    padding: "5px 15px",
                                    fontSize: "12px",
                                    color: "#464646",
                                  }}
                                >
                                  📃 {item.discription}
                                </div>
                              </div>

                              <div onClick={() => {}}>
                                <img
                                  className="imgclick"
                                  onClick={() => {
                                    setShowFullImageCode(item.image);
                                  }}
                                  src={
                                    "http://192.168.1.99/tar/mahsolat/tamnails/" +
                                    item.image
                                  }
                                  width="80"
                                  alt=""
                                />
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="col">
              <label htmlFor="nameMahsol"> نام محصول </label>
              <input
                id="nameMahsol"
                className="form-control  "
                type="text"
                placeholder="نام  "
                style={{ fontSize: "12px" }}
                value={tempCode.nameMahsol}
                onChange={(e) => {
                  setTempCode({ ...tempCode, nameMahsol: e.target.value });
                }}
                readOnly
              />
            </div>
            <div className="col">
              <label htmlFor="typeMahsol"> نوع محصول </label>
              <input
                type="text"
                id="typeMahsol"
                className="form-control  "
                style={{ fontSize: "10px" }}
                placeholder="نوع  "
                value={tempCode.type}
                readOnly
              />

              {/* <select
                id="typeMahsol"
                className="form-control "
                defaultValue="هات استمپ-لیزر"
                onChange={(e) => {
                  setTempCode({ ...tempCode, type: e.target.value });
                }}
                
              >
                <option value="هات استمپ-لیزر" style={{ color: "#e2f207" }}>
                  
                  هات استمپ-لیزر
                </option>
                <option
                  value="هات استمپ-اصفهان(کلد)"
                  style={{ color: "#072af2" }}
                >
                  
                  هات استمپ-اصفهان(کلد)
                </option>
                <option
                  value="هات استمپ-اصفهان(هیت)"
                  style={{ color: "#f20790" }}
                >
                  
                  هات استمپ-اصفهان(هیت)
                </option>
                <option value="ماربل(کلد)" style={{ color: "#07d7f2" }}>
                  
                  ماربل(کلد)
                </option>
                <option value="ماربل(هیت)" style={{ color: "#f23607" }}>
                  
                  ماربل(هیت)
                </option>
                <option value="پی وی سی " style={{ color: "#f0a636" }}>
                  
                  پی وی سی
                </option>
              </select> */}
            </div>

            <div className="col">
              <label htmlFor="with"> عرض </label>
              <input
                id="with"
                className="form-control  "
                type="number"
                placeholder="عرض "
                value={tempCode.width}
                onChange={(e) => {
                  setTempCode({ ...tempCode, width: e.target.value });
                }}
              />
            </div>
            <div className="col">
              <label htmlFor="metraj"> متراژ </label>
              <input
                id="metraj"
                className="form-control  "
                type="number"
                placeholder="متراژ "
                value={tempCode.metraj}
                onChange={(e) => {
                  setTempCode({ ...tempCode, metraj: e.target.value });
                }}
              />
            </div>
            <div className="col">
              <label htmlFor="count"> تعداد رول </label>
              <input
                id="count"
                className="form-control  "
                type="number"
                placeholder="تعداد رول "
                value={tempCode.count}
                onChange={(e) => {
                  setTempCode({ ...tempCode, count: e.target.value });
                }}
              />
            </div>
            <div className="col">
              <label htmlFor="tozih"> توضیح </label>
              <input
                id="tozih"
                className="form-control  "
                type="text"
                placeholder=" توضیح "
                value={tempCode.tozih}
                onChange={(e) => {
                  setTempCode({ ...tempCode, tozih: e.target.value });
                }}
              />
            </div>
            <div className="col">
              <button
                type="button"
                className="btn  btn-warning mt-4 "
                onClick={() => {
                  if (tempCode.codeMahsol === "") {
                    setMsgErrorMahsol(" کد محصول خالی است");
                    return false;
                  }
                  if (tempCode.width === "") {
                    setMsgErrorMahsol(" عرض خالی است");
                    return false;
                  }
                  if (tempCode.metraj === "") {
                    setMsgErrorMahsol(" متراژ خالی است");
                    return false;
                  }
                  if (tempCode.count === "") {
                    setMsgErrorMahsol(" تعداد رول خالی است");
                    return false;
                  }
                  setTempRow(tempRow + 1);

                  setCodes([
                    ...codes,
                    {
                      id: tempRow,
                      codeMahsol: tempCode.codeMahsol,
                      nameMahsol: tempCode.nameMahsol,
                      type: tempCode.type,
                      width: tempCode.width,
                      metraj: tempCode.metraj,
                      count: tempCode.count,
                      tozih: tempCode.tozih,
                      state: tempCode.state,
                    },
                  ]);

                  setTempCode({
                    id: "",
                    codeMahsol: "",
                    nameMahsol: "",
                    type: "هات استمپ-لیزر",
                    width: "",
                    metraj: "",
                    count: "",
                    tozih: "",
                    state: "ثبت مشتری",
                  });
                  setMsgErrorMahsol("");
                }}
              >
                +
              </button>
            </div>
          </div>
          {msgErrorMahsol !== "" && (
            <>
              <div className="text-center text-danger">{msgErrorMahsol}</div>
            </>
          )}
          <hr />
          <div className="row  p-3">
            <h5 className="text-primary px-1 ">محصولات درخواستی</h5>
            <div className="table-responsive">

           
            <table className="table ">
              <thead>
                <tr>
                  <th>کد محصول </th>
                  <th>نام محصول </th>
                  <th>نوع محصول </th>
                  <th>عرض</th>
                  <th>متراژ</th>
                  <th>تعداد رول </th>
                  <th>توضیح</th>
                  <th>حذف</th>
                </tr>
              </thead>

              <tbody>
                {codes?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.codeMahsol}</td>
                      <td>{item.nameMahsol}</td>
                      <td>{item.type}</td>
                      <td>{item.width}</td>
                      <td>{item.metraj}</td>
                      <td>{item.count}</td>
                      <td>{item.tozih}</td>
                      <td>
                        <button
                          className="btn text-danger"
                          onClick={() => {
                            removeCode(item.id);
                          }}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        </div>
        <div className="card-footer ">
          <button
            className="btn btn-success "
            onClick={() => {
              setTempSefaresh({
                ...tempSefaresh,
                customerCode: selector.code,
                customerName: selector.name,
              });

              if (codes.length < 1) {
                alert(" حداقل یک محصول باید ثبت گردد!");
                return false;
              }
              setIsSaveing(true);
              const packSefaresh = [
                {
                  id: tempSefaresh.id,
                  customerCode: tempSefaresh.customerCode,
                  customerName: tempSefaresh.customerName,
                  date: tempSefaresh.date,
                  type: tempSefaresh.type,
                  dateNiaz: tempSefaresh.dateNiaz,
                  userSabt: tempSefaresh.userSabt,
                  codes: codes,
                },
              ];

              //console.log(packSefaresh);

              let jsonData = JSON.stringify(packSefaresh);

              //  localStorage.setItem("data", jsonData);
              //JSON.stringify(packSefaresh)

              //  let jsonData = JSON.stringify(packSefaresh);

              axios
                .post("http://192.168.1.99/tar/api.php", jsonData)
                .then(function (response) {
                  console.log(response.data);
                  if (response.data === "ok") {
                    clearAll();
                    // setIsSaveing(false);
                    setSaveState("ok");
                    setSuccessSend((prev) => [1, "ثبت موفق"]);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                  //  setIsSaveing(false);
                  setSaveState("no");
                  setSuccessSend((prev) => [2, "خطا در ثبت "]);
                });
            }}
          >
            ذخیره نهایی
          </button>
        </div>
      </div>
    </div>
  );
};
