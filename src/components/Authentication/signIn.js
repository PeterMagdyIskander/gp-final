import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../../utils/api";
import { setAuthedUser } from "../../actions/authedUser";
import { Route,Navigate,Routes} from "react-router-dom";
const SignIn = (props) => {
  const { dispatch } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidPassword,setInvalidPassword]=useState(false);
  const [authed,setAuthed]=useState(false);
  const handleOnLoginClick = () => {
    let user = signIn(username, password);
    user.then((res) => {
      console.log("here",res)
      setAuthed(true);
      dispatch(setAuthedUser(res));
    }).catch((res)=>{
      setInvalidPassword(true);
    })
  };
  return (
    <>
      {
        authed ?  <Routes>
        <Route
        path="*"
        element={<Navigate to="/" />}
    />
      </Routes>:
        <div className="sign-in-page">
      <div style={{paddingTop:"50px"}}>
        <input 
          type="input"
          className="sign-in-input"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
        />
        <br />
        <br />
        <input
          type="password"
          className="sign-in-input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <br />
        <br />
        <p hidden={!invalidPassword||authed} style={{color:"red"}}>invalid username or password</p>
        <button className="login-btn"  onClick={() => {
              handleOnLoginClick();
            }}>
            Login
        </button>

        <br />
        <br />
        
          <Link to="/signup">Don't Have an account?</Link>
        
      </div>
    </div>
      }
    </>
  );
};
export default connect()(SignIn);
