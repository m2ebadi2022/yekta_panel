import { useCheckAuth } from "../middleware";

import { useEffect, useState } from "react";
import axios from "axios";

export const SefareshatEntezar = () => {
  useCheckAuth();

  const [getData, setGetData] = useState([]);
  const [typeData, setTypeData] = useState(0);

  const token = localStorage.getItem("token");
  const getDataOnline = () => {
    setGetData([]);
    axios
      .get("http://192.168.1.99/tar/getOnlineDb.php", {
        method: "GET",
        headers: {
          Authorization: `${token}`, // ارسال توکن در هدر
        },
      })
      .then((res) => {
        if (res.data[0][0] !== "not") {
          setGetData(res.data);
          setTypeData(1);
        } else {
          setTypeData(3);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getDataOnline();
  }, []);

  return (
    
      <div className="container py-3 bg-white">
        <h3 className="card-title text-center" style={{ padding: "10px" }}>
          سفارشات در انتظار
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
            {(typeData === 1 ) && (
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
            {typeData === 1 && (
              <>
                
                {getData.map((item) => {
                  const sefaresh = JSON.parse(item.sefaresh);

                  const { typeName, typeColor } = get_name_type(
                    sefaresh[0].type
                  );

                  return (
                    <tr key={item.id} role="row">
                      <td>{item.id}</td>
                      <td>{sefaresh[0].date}</td>
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
                        <ul className="list-group list-group-flush">
                          {sefaresh[0].codes?.map((item2) => (
                            <li
                              className="list-group-item d-flex px-0 justify-content-between"
                              key={item2.id}
                            >
                              {item2.codeMahsol} : {item2.nameMahsol}
                              <span className="badge bg-info text-light">
                                {item2.state}
                              </span>
                            </li>
                          ))}
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
