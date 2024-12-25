import { Link } from "react-router-dom";
import style from "./Loading.module.css";
export const Loading = ({status , msg}) => {
  return (
    
      <div className={style.fullScreen}>
        
       
            
              <h3> {msg}</h3>
              {status===0 && <div className={style.loader}></div> }
              {status===1 && <>
              <div style={{padding:"25px" , fontSize:"42px" , color:"green"}}> <i className="bi bi-clipboard2-check-fill"></i></div>
              <Link to="/SefareshatEntezar" className="btn btn-success">بازگشت  </Link>
              </> }
               
         {status===2 && <>
              <div style={{padding:"25px" , fontSize:"42px" , color:"#f80909"}}> <i className="bi bi-clipboard-x-fill"></i></div>
              <Link to="/newsefaresh" className="btn btn-danger" >بازگشت  </Link>
              </>}
       
        
       
      </div>
    
  );
};
