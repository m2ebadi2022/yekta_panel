import { Link } from "react-router-dom";
import { useCheckAuth } from "../middleware";

import { useEffect, useState } from "react";
import axios from "axios";

export const SefareshatSabtShode = () => {
  useCheckAuth();

  const [getData, setGetData] = useState([]);
  const [getDataCodes, setGetDataCodes] = useState([]);
  const [typeData, setTypeData] = useState(0);

  const token = localStorage.getItem("token");

  const getDataYekta = () => {
    setGetData([]);
    axios
      .get("http://192.168.1.99/tar/getDbYekta.php", {
        method: "GET",
        headers: {
          Authorization: `${token}`, // ارسال توکن در هدر
        },
      })
      .then((res) => {
        setGetData(res.data);
        setTypeData(2);
        // console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getDataYektaCodes = (idSefaresh) => {
    setGetDataCodes([]);
    axios
      .get(`http://192.168.1.99/tar/getDbYektaCodes.php?id=${idSefaresh}`, {
        method: "GET",
        headers: {
          Authorization: `${token}`, // ارسال توکن در هدر
        },
      })
      .then((res) => {
        setGetDataCodes(res.data);

        //console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getDataYekta();
  }, []);

  return (
    <>
      <div className="container py-3 bg-white">
        <h3 className="card-title text-center" style={{ padding: "10px" }}>
          سفارشات ثبت شده
        </h3>

        {typeData === 3 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "150px",
              color: "#575757",
              fontSize: "20px",
            }}
          >
            
            خالی
          </div>
        )}
         <div class="table-responsive">
        <table
          id="example"
          style={{ marginTop: "10px" }}
          className="table table-bordered  table-striped verticle-middle table-responsive-sm"
          role="grid"
          aria-describedby="example_info"
        >
          <thead>
            {(typeData === 2) && (
              <tr role="row">
                <th
                  scope="col"
                  tabIndex="0"
                  aria-controls="example"
                  rowSpan="1"
                  colSpan="1"
                  aria-sort="ascending"
                >
                  شناسه
                </th>
                <th
                  scope="col"
                  tabIndex="0"
                  aria-controls="example"
                  rowSpan="1"
                  colSpan="1"
                  aria-sort="ascending"
                >
                  
                  تاریخ سفارش
                </th>
                <th
                  scope="col"
                  tabIndex="0"
                  aria-controls="example"
                  rowSpan="1"
                  colSpan="1"
                  aria-sort="ascending"
                >
                  
                  نوع سفارش
                </th>
                <th
                  scope="col"
                  tabIndex="0"
                  aria-controls="example"
                  rowSpan="1"
                  colSpan="1"
                  aria-sort="ascending"
                >
                  کدهای درخواستی
                </th>
              </tr>
            )}
          </thead>
          <tbody>
            {typeData === 2 && (
              <>
                
                {getData.map((item) => {
                  //  const sefaresh = JSON.parse(item.sefaresh);
                  const { typeName, typeColor } = get_name_type(
                    item.type_sefaresh
                  );
                  return (
                    <tr key={item.id} role="row">
                      <td>{item.id}</td>

                      <td>{item.date_new}</td>
                      <td>
                        
                        <div
                          style={{
                            backgroundColor: typeColor,
                            borderRadius: "20px",
                            display: "inline",
                            padding: "2px 15px",
                          }}
                        >
                          {typeName}
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn tp-btn-light btn-primary "
                          onClick={() => {
                            getDataYektaCodes(item.id);
                          }}
                        >
                          وضعیت الان
                        </button>

                        <ul
                          className="list-group list-group-flush "
                          style={{
                            border: "1px solid #c9c58b",
                            borderRadius: "5px",
                            padding: "0px 10px",
                          }}
                        >
                          {getDataCodes.map((i) => {
                            if (item.id === i.sefaresh_id) {
                              const { status, color } = get_status_type(
                                i.status_forosh
                              );

                              return (
                                <li
                                  className="list-group-item d-flex px-0 justify-content-between"
                                  key={i.id}
                                >
                                  کد:{i.product_code} : {i.product_name} - عرض:
                                  {i.width} - متراژ:{i.metraj} - تعداد:{i.count}
                                  <span
                                    className="badge text-black"
                                    style={{ backgroundColor: color }}
                                  >
                                    {status}
                                  </span>
                                </li>
                              );
                            }
                            return false;
                          })}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

const get_name_type = (typeIndex) => {
  let typeName = "";
  let typeColor = "";

  switch (typeIndex) {
    case "1":
      typeName = "هات استمپ کلد";
      typeColor = "#07eaf2";
      break;
    case "2":
      typeName = "هات استمپ هیت";
      typeColor = "#f20713";
      break;
    case "3":
      typeName = "هات استمپ ماربل";
      typeColor = "#f207cb";
      break;
    case "4":
      typeName = "روکش پی وی سی";
      typeColor = "#f28507";
      break;
    case "5":
      typeName = "وکیوم";
      typeColor = "#07f20f";
      break;
    default:
      typeName = "نامشخص";
      typeColor = "white";
      break;
  }
  return { typeName, typeColor };
};

const get_status_type = (statusIndex) => {
  let status = "";
  let color = "";

  switch (statusIndex) {
    case "1":
      status = "سفارشگیری";

      color = "#eeff00";
      break;
    case "2":
      status = "تائید سفارش";

      color = "#64ff27";
      break;
    case "3":
      status = " انتظار تولید ";

      color = "#FF8C00";
      break;
    case "4":
      status = " شروع تولید ";

      color = "#00a2ff";
      break;
    case "5":
      status = " اتمام تولید ";

      color = "#4d9900";
      break;
    case "6":
      status = "برش ";

      color = "#5c66ff";
      break;
    case "7":
      status = " بسته بندی ";

      color = "#ff49f0";
      break;
    case "8":
      status = " امباس";

      color = "#00bbc9";
      break;
    case "9":
      status = " تحویل به انبار  ";

      color = "#228adf";
      break;
    case "10":
      status = " تسویه حساب نهایی مالی ";

      color = "#ff4040";
      break;
    case "11":
      status = " آماده بارگیری  ";

      color = "#5324e0";
      break;
    case "12":
      status = " بارگیری و خروج ";

      color = "#239600";
      break;
    default:
      status = "نامشخص";
      color = "#bcfbff";
      break;
  }
  return { status, color };
};
