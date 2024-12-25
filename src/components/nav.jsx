import { Link, useLocation } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store"
import { useCheckAuth } from "../middleware"
 import svg_profile from './../assets/images/svgs/profile.svg';
 import svg_logout from './../assets/images/svgs/logout.svg';

 
export const Nav = () => {

    const selector = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useCheckAuth()
    const loca = useLocation()
    if (loca.pathname === "/login") { return <></> }
    return (

        <>
            <div className="header">
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <span></span>
                            <div className="header-left h3 text-black " >
                            گروه صنعتی یکتا فیلم تبریز
                            </div>

                            <ul className="navbar-nav header-right">
                                
                                
                                <li className="nav-item dropdown header-profile">
                                    <a className="nav-link" href="#" role="button" data-toggle="dropdown">
                                        <img src={`http://192.168.1.99/tar/pics/${selector.image}`} width="20" alt="" />
                                        <div className="header-info">
                                            <span>  <strong>  {selector.name}  </strong></span>
                                            <small> {selector.username}</small>
                                        </div>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        {/* <Link to="/profilePage" className="dropdown-item ai-icon">
                                           <img src={svg_profile} alt="profile"  style={{width:"16px"}}/>
                                            <span className="ml-2">پروفایل </span>
                                        </Link> */}
                                      
                                        <a href="#" className="dropdown-item ai-icon" onClick={()=>{ dispatch(logout())
             //  window.location.replace("/login")
        }}>
                                        <img src={svg_logout} alt="logout" style={{width:"16px"}} />
                                            <span className="ml-2">خروج </span>
                                        </a>
                                    </div>
                                </li>
                            
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>


    

    )
}