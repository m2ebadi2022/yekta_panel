// import React, { useEffect, useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";



// import Logo from "../assets/images/logo.png";
// import { useDispatch } from "react-redux";
// import { login, logout } from "../store";
// import { useNavigate } from "react-router-dom";


// export const Login = () => {
//   const [inputUsername, setInputUsername] = useState("");
//   const [inputPassword, setInputPassword] = useState("");

//   const [show, setShow] = useState(false);
//   const [loading, setLoading] = useState(false);



//   const dispatch = useDispatch();


//     let navigate=useNavigate();
    
// useEffect(()=>{
//      if (localStorage.getItem('access') === "ok") {
//         dispatch(login({ username: localStorage.getItem('username') }));
//         navigate('/home')
//         console.log("home");
        
//     } else {
//       console.log("login");
//        // window.location.replace("/login");
//        //navigate('/login')
//     }
// },[])





//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     await delay(500);
//     console.log(`Username :${inputUsername}, Password :${inputPassword}`);
//     if (inputUsername !== "admin" || inputPassword !== "admin") {
//       setShow(true);
//       dispatch(logout());
//     }
//     else {

//       dispatch(login({ username: inputUsername, pass: inputPassword }));


//       window.location.replace("/");
//       //navigate("/");
//     }
//     setLoading(false);
//   };

//   const handlePassword = () => { };

//   function delay(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }

//   return (
//     <div
//       className="sign-in__wrapper"
      
//     >
//       {/* Overlay */}
//       <div className="sign-in__backdrop"></div>
//       {/* Form */}
//       <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
//         {/* Header */}
//         <img
//           className="img-thumbnail mx-auto d-block mb-2"
//           style={{width:"80px"}}
//           src={Logo}
//           alt="logo"
//         />
//         <div className="h4 mb-2 text-center">Sign In</div>
//         {/* ALert */}
//         {show ? (
//           <Alert
//             className="mb-2"
//             variant="danger"
//             onClose={() => setShow(false)}
//             dismissible
//           >
//             Incorrect username or password.
//           </Alert>
//         ) : (
//           <div />
//         )}
//         <Form.Group className="mb-2" controlId="username">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             value={inputUsername}
//             placeholder="Username"
//             onChange={(e) => setInputUsername(e.target.value)}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-2" controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={inputPassword}
//             placeholder="Password"
//             onChange={(e) => setInputPassword(e.target.value)}
//             required
//           />
//         </Form.Group>
//         <br />
//         {!loading ? (
//           <Button className="w-100" variant="primary" type="submit">
//             Log In
//           </Button>
//         ) : (
//           <Button className="w-100" variant="primary" type="submit" disabled>
//             Logging In...
//           </Button>
//         )}

//       </Form>
//       {/* Footer */}
//       <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
//         Made by yekta F | &copy;2022
//       </div>
//     </div>
//   );
// };

