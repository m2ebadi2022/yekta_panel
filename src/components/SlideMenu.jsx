import svg_dashboard from "./../assets/images/svgs/dashboard.svg";
import svg_sefareshat from "./../assets/images/svgs/sefareshat.svg";
import svg_catalog from "./../assets/images/svgs/catalog.svg";
import svg_crm from "./../assets/images/svgs/crm.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import icon_call from "../assets/images/icons/call.svg";

export const SlideMenu = () => {
  const [crmArrow, setCrmArrow] = useState(false);
  const [sefareshatArrow, setSefareshatArrow] = useState(false);
  return (
    <>
      <div className="deznav">
        <div className="deznav-scroll mm-active ps">
          <ul className="metismenu mm-show" id="menu">
            <li >
              <Link className=" ai-icon" to="/">
                <img src={svg_dashboard} alt="" />
                <span className="nav-text"> خانه</span>
              </Link>
            </li>
            <li className="nav-label"> </li>

            <li >
              <a
                className="has-arrow ai-icon"
               
                aria-expanded={`${sefareshatArrow ? "true" : "false"}`}
                onClick={() => {
                  setSefareshatArrow((pre) => !pre);
                }}
              >
                <img src={svg_sefareshat} alt="" />
                <span className="nav-text">سفارشات</span>
              </a>
              <ul
                aria-expanded="false"
                className={`mm-collapse ${sefareshatArrow && "mm-show"}`}
              >
                <li>
                  <Link to="/newsefaresh"> سفارش جدید</Link>
                </li>
                <li>
                  <Link to="/sefareshatEntezar"> سفارشات در انتظار </Link>
                </li>
                <li>
                  <Link to="/sefareshatSabtShode"> سفارشات ثبت شده </Link>
                </li>
              </ul>
            </li>
            <li className="nav-label"> </li>

            <li >
              <Link className=" ai-icon" to="/catalogs">
                <img src={svg_catalog} alt="" />
                <span className="nav-text"> کاتالوگ</span>
              </Link>
            </li>

            <li className="nav-label"> </li>

            <li >
              <a
                className="has-arrow ai-icon"
                
                aria-expanded={`${crmArrow ? "true" : "false"}`}
                onClick={() => {
                  setCrmArrow((pre) => !pre);
                }}
              >
                <img src={svg_crm} alt="" />
                <span className="nav-text">CRM</span>
              </a>
              <ul
                aria-expanded={`${crmArrow ? "true" : "false"}`}
                className={`mm-collapse ${crmArrow && "mm-show"}`}
              >
                <li>
                  <Link to="/crmFormOdati"> فرم درخواست عودتی </Link>
                </li>
                <li>
                  <Link to="/crmFormControlKeifi">فرم نظرسنجی کیفی محصول</Link>
                </li>
                <li>
                  <Link to="/crmKarshenas"> ارتباط با کارشناس فروش </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "30px", paddingLeft: "10px" }}
            src={icon_call}
            alt="call"
          />
          <span style={{ fontWeight: "bold" , fontSize:"27px" }}> 6202</span>
        </div>
      </div>
    </>
  );
};

{
  /* <div className="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
<div
  className="ps__thumb-x"
  tabindex="0"
  style={{ left: "0px", width: "0px" }}
></div>
</div>
<div className="ps__rail-y" style={{ top: "0px", left: "271px" }}>
<div
  className="ps__thumb-y"
  tabindex="0"
  style={{ top: "0px", height: "0px" }}
></div>
</div> */
}
