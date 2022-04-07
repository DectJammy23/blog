import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [addStaff, setAddStaff] = useState(null);

  const { user, dispatch, nonStaffMembers } = useContext(Context);
  const PF = "http://localhost:5000/images/"
  
  const {isAdmin} = user;
  //grabbing the isadmin field from user

  if(isAdmin){//fetch for non staff members to update state
    axios.get("/users/getAllButStaff")
        .then(res=>dispatch({type: "GET_ALL_BUT_STAFF_SUCCESS", payload: res.data}))
        .catch(err=>dispatch({type: "GET_STAFF_FAILURE", payload: err.data} ))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    
    try {
      let res = null
      if(addStaff){
        res = await axios.put("/users/addAsStaff/" + addStaff, {isStaff: true});
      } else {
        res = await axios.put("/users/" + user._id, updatedUser);
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      }
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {isAdmin && (
            <>
              <label>Add to Staff</label>
              <select onChange={(e) => {setAddStaff(e.target.value); console.log(e.target.value)}}>
                <option value="" selected disabled>Select member</option>
               {/* {now lets go to nav, if you have one lol} thats topbar in components */}
                {nonStaffMembers && nonStaffMembers.map((member)=>{
                  return <option value={member._id} >{member.username}</option>
                })}
              </select>

            </>

            
          )
          }
          

          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "blue", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
