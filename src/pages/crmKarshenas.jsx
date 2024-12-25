import { useCheckAuth } from "../middleware";
import icon_whatsapp from '../assets/images/icons/whatsapp.svg';
import icon_telgeram from '../assets/images/icons/telegram.svg';
import icon_call from '../assets/images/icons/call.svg';
function CrmKarshenas() {
  useCheckAuth();
  return <div className="container py-3">
   
    <h2>
       کارشناس فروش
    </h2>
  <br />


 <img style={{width:"40px" , paddingTop:"10px"}} src={icon_whatsapp} alt="watsapp" /> واتساپ :  <span style={{fontWeight:"bold"}}>0905000000</span> <br />
 <img style={{width:"40px" , paddingTop:"10px"}} src={icon_telgeram} alt="telgeram" /> تلگرام :  <span style={{fontWeight:"bold"}}>0905000000</span> <br />
 <img style={{width:"40px" , paddingTop:"10px"}} src={icon_call} alt="call" /> تماس :  <span style={{fontWeight:"bold"}}>0905000000</span> <br />

  </div>;
}

export default CrmKarshenas;
