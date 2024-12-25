import { useEffect, useState } from "react";
import { useCheckAuth } from "../middleware";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { chengMyStory } from "../store";
import { ShowStories } from "../components/showStories";
import MsgHome from "../components/MsgHome";
import Slider from "../components/sliderHome/SliderHome";

export const Home = () => {
  useCheckAuth();
  const dd = new Date();
  const formatDate = { year: "numeric", month: "long", day: "numeric" };
  const dateShamsi = dd.toLocaleDateString("fa-IR", formatDate);
  const dateShamsi2 = dd.toLocaleDateString("en-US", formatDate);

  const [showFullImageCode, setShowFullImageCode] = useState("");

  const [getData_Porforosh, setGetData_Porforosh] = useState([]);
  const [getData_takhfifat, setGetData_takhfifat] = useState([]);
  const [getData_stories, setGetData_stories] = useState([]);
  const [getData_msgHome, setGetData_msgHome] = useState({});
  const [countStory, setCountStory] = useState(0);
  const [isNewMsgHome, setIsNewMsgHome] = useState(false);

  const selector = useSelector((state) => state.myVar);
  const selector_user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const getDataOnline_Porforosh = () => {
    setGetData_Porforosh([]);
    axios
      .get("http://192.168.1.99/tar/home/getPorForosh.php", {
        method: "GET",
        headers: {
          Authorization: `${token}`, // ارسال توکن در هدر
        },
      })
      .then((res) => {
        if (res.data[0][0] !== "not") {
          setGetData_Porforosh(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDataOnline_takhfifat = () => {
    setGetData_takhfifat([]);
    axios
      .get("http://192.168.1.99/tar/home/getTakhfifat.php", {
        method: "GET",
        headers: {
          Authorization: `${token}`, // ارسال توکن در هدر
        },
      })
      .then((res) => {
        if (res.data[0][0] !== "not") {
          setGetData_takhfifat(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDataOnline_stories = () => {
    setGetData_stories([]);
    axios
      .get("http://192.168.1.99/tar/home/getStories.php", {
        method: "GET",
        headers: {
          Authorization: `${token}`, // ارسال توکن در هدر
        },
      })
      .then((res) => {
        if (res.data[0][0] !== "not") {
          setGetData_stories(res.data);
          setCountStory(res.data.length);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDataOnline_msgHome = () => {
    axios
      .get("http://192.168.1.99/tar/home/getMsgHome.php", {
        method: "GET",
        headers: {
          Authorization: `${token}`, // ارسال توکن در هدر
        },
      })
      .then((res) => {
        // if (res.data[0] !== "not") {
        setGetData_msgHome(res.data[0]);
        //}
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleMsgHom = async () => {
    await getDataOnline_msgHome();

    let localIDmsg = localStorage.getItem("msgHome");
    console.log("local=" + localIDmsg);

    if (localIDmsg === null || localIDmsg !== getData_msgHome?.id) {
      setIsNewMsgHome(true);
      setTimeout(() => {
        setIsNewMsgHome(true);
        localStorage.setItem("msgHome", getData_msgHome?.id);
      }, 3000);
    }
  };

  useEffect(() => {
    getDataOnline_Porforosh();
    getDataOnline_takhfifat();
    getDataOnline_stories();

    handleMsgHom();
  }, []);

  return (
    <>
      {isNewMsgHome && <MsgHome msg={getData_msgHome.msg} />}

      {selector.showStoryId !== 0 && (
        <ShowStories id={selector.showStoryId} count={countStory} />
      )}

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
              if (e.target.className === "showImg") return;

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

      <div className="container  mt-0">
        <h4 style={{ paddingBottom: "0px", color: "rgb(58, 122, 254)" }}>
          استوری ها
        </h4>

        <div className="d-flex " >
          <div
            className="col-8 page-titles  "
            style={{
              backgroundColor: "#ffffffff",
              gap: "8px",
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
              marginLeft:"20px"
            }}
          >
            {getData_stories.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "5px",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    dispatch(chengMyStory({ id: item.id }));
                  }}
                >
                  <img
                    style={{
                      width: "80px",
                      height: "80px",
                      padding: "2px",
                      border: "2px solid red",
                    }}
                    src={`http://192.168.1.99/tar/files/stories/pics/${item.image}`}
                    alt="aa"
                    className="img-fluid rounded-circle"
                  />
                  <span style={{ marginTop: "7px", fontSize: "12px" }}>
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className="col page-titles mx-0"
            style={{
              backgroundColor:"#3a7afe ",
             
            }}
          >
            <h5 style={{ color:"white"}}>سلام {selector_user.name} عزیز خوش آمدید </h5>
            <div className="welcome-text ">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  height: "60px",
                  color: "#ffffff",
                  fontSize: "15px",
                }}
              >
                <div> امروز : {dateShamsi}</div>

                <span> {dateShamsi2}</span>
              </div>
            </div>

            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex"></div>
          </div>
        </div>

        <Slider />
        <br />

        <div className="row">
          <div className="col-xl-3 col-xxl-4 col-lg-12 col-md-12">
            <div className="card bg-primary text-white">
              <div className="chartjs-size-monitor">
                <div className="chartjs-size-monitor-expand">
                  <div className=""></div>
                </div>
                <div className="chartjs-size-monitor-shrink">
                  <div className=""></div>
                </div>
              </div>
              <div className="card-header pb-0 border-0">
                <h4 className="card-title text-white">محصولات پرفروش</h4>
              </div>
              <div className="card-body">
                <div className="widget-media">
                  <ul className="timeline">
                    {getData_Porforosh.map((item) => {
                      return (
                        <li key={item.id}>
                          <div className="timeline-panel">
                            <div className="media mr-2">
                              <img
                                alt="image"
                                width="50"
                                src={`http://192.168.1.99/tar/mahsolat/tamnails/${item.image}`}
                                onClick={() => {
                                  setShowFullImageCode(item.image);
                                }}
                              />
                            </div>
                            <div className="media-body">
                              <h5 className="mb-1 text-white"> {item.code} </h5>
                              <small className="d-block"> {item.code} </small>
                            </div>
                            <small className="d-block"> {item.type} </small>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <canvas
                id="lineChart_3Kk"
                width="600"
                height="300"
                style={{ display: "block", width: "300px", height: "150px" }}
                className="chartjs-render-monitor"
              ></canvas>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-header border-0 pb-0">
                <h4 className="card-title"> تخفیف های هفتگی </h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-responsive-sm mb-0">
                    <thead>
                      <tr>
                        <th>
                          <strong>کد محصول</strong>
                        </th>
                        <th>
                          <strong>نام محصول</strong>
                        </th>
                        <th>
                          <strong>نوع </strong>
                        </th>
                        <th>
                          <strong> تخفیف % </strong>
                        </th>
                        <th>
                          <strong> اعتبار </strong>
                        </th>
                        <th>
                          <strong> وضعیت </strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getData_takhfifat.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td> {item.code} </td>
                            <td> {item.name} </td>
                            <td> {item.type} </td>
                            <td> {item.takhfif} </td>
                            <td> {item.date_etebar} </td>
                            <td>
                              {item.state === "1" ? (
                                <>
                                  فعال
                                  <i className="fa fa-circle text-success mr-1"></i>
                                </>
                              ) : (
                                <>
                                  غیر فعال
                                  <i className="fa fa-circle text-danger mr-1"></i>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className="row page-titles  "
          style={{
            backgroundColor: "#ffffff48",
            gap: "8px",
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "start",

          }}
        >
          متن پیام مدیریت
        </div> */}

        <br></br>
      </div>
    </>
  );
};
