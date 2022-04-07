import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      //now since we will see the data here of the returned user, we must check to see if this user is an admin
      //if this user is an admin, we must fetch for the staff
      
      console.log(res.data)
      if (res.data.isAdmin){
     

        await axios.get("/users/getAllButStaff")
          .then(result=>{
            
           dispatch({type: "GET_ALL_BUT_STAFF_SUCCESS", payload: result.data})

            console.log(result.data)
          })
          .catch(err=>{
            dispatch({type: "GET_STAFF_FAILURE", payload: err.data} )
            return err
          })
      } 
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
