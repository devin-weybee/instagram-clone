import axios from "axios";
import React, { useRef, useState } from "react";
import { API_BASE_URL, INSTA_TEXT_LOGO } from "../../Utils/Constants";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/Reducers/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const username = useRef();
  const password = useRef();
  const email = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleIsSignIn = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await axios
        .post(`${API_BASE_URL}/users/login`, {
          username: username.current.value,
          password: password.current.value,
        })
        .then((res) => {
          dispatch(
            setUser({
              user: res.data.data.user,
              accessToken: res.data.data.accessToken,
              refreshToken: res.data.data.refreshToken,
            })
          );
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .post(`${API_BASE_URL}/users/register`, {
          username: username.current.value,
          password: password.current.value,
          email: email.current.value,
        })
        .then((res) => {
          setIsLogin(true);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="bg-black h-screen w-full flex justify-center items-center gap-10">
      <div className="w-4/12 flex justify-center">
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBUQEBASEA8QEBAQEBAQDw8QEA4QFxEXFxUWFRMYHighGBoxHRUVITEhJSo3Li4uFx81RDMsNygtLisBCgoKDg0OGBAQGy8lHyUrKy0tLS0tKy0tKystLSstLS0tKy8tLS0tNS0rLS0tLy0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAP8AxgMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAwQCBQYBBwj/xABDEAACAgECBAMFBQQIBAcBAAABAgADEQQSBSExQQYTUSJhcYGRBxQyobEjUsHRF0JTVGKSovAzcoLhFjRDssLS8RX/xAAbAQEBAAMBAQEAAAAAAAAAAAAAAQIDBAUGB//EADQRAQACAgEDAwIEBAQHAAAAAAABAgMRBBIhMRNBUQUiYXGBsRQykaEV4fDxBiMzQlLB0f/aAAwDAQACEQMRAD8A+LzIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgegS6TbIVmXplOqGT0MBuwcDqcHA+JiazEbSLxM6RTFmQPcQGJQIxA8kCB7AkGnYjIViPcpgRQPYAD0lFn7i+N2Dj1wcfWZdEtfqV3pXdCDgzGY0zidsZFICAgICAgIGx4WiHO/OBj8K7iMsBnHfrOrBWJju488zFoiGyq05zyXI54O3G4Z5HHv8ASdVauO8zMnEOVFoPIqqAgjBB86vqJMupx2/T94METGau/wAf2lzk8x7D0QNt4f4YdTctY79SeijuT8gZ08bD6t9ML21Dvf8AwVp/37On+DmfXpPX/gMfy0epLSeNvDVdVIvoBwhAdc7vZJxuB+M5ubw61p109meO+51Lhp5DeQMh0J9P1zyiRa80lf6g7dBu+vWQV35jPLOcH1PLriWBHA3PhTSLZcWYZWqs2Y65bcAOXccyfpOni0i1+/s4+dkmmP7fMzp02q4hWn4zgZxzy2Tnphcn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"
          alt=""
        />
      </div>
      <div className="w-4/12 flex flex-col items-center">
        <img className="w-4/12 mb-10" src={INSTA_TEXT_LOGO} alt="" />
        <form
          action=""
          className="flex flex-col gap-2 w-6/12"
          onSubmit={handleLogin}
        >
          <input
            ref={username}
            type="text"
            placeholder="Username"
            className="bg-gray-400 p-1.5 rounded-sm"
          />
          {!isLogin && (
            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="bg-gray-400 p-1.5 rounded-sm"
            />
          )}
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="bg-gray-400 p-1.5 rounded-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold mt-3 p-1 rounded-md cursor-pointer"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <div className="flex items-center gap-2 mt-4">
            <hr className="text-white w-5/12" />
            <p className="text-white w-2/12 text-center">OR</p>
            <hr className="text-white w-5/12" />
          </div>
          <button
            type="button"
            className="h-10 mt-3 rounded-md text-white flex items-center justify-center border border-white gap-3 cursor-pointer font-bold"
          >
            <img
              className="h-8 w-9 rounded-sm"
              src="https://static.vecteezy.com/system/resources/previews/021/496/096/non_2x/google-symbol-logo-design-illustration-with-black-background-free-vector.jpg"
              alt=""
            />
            {isLogin ? "Login" : "Sign Up"} with Google
          </button>
          <button
            className={`text-white mt-4 font-bold cursor-pointer ${
              isLogin ? "" : "hidden"
            }`}
          >
            Forgot Password ?
          </button>
          <p className="text-white text-center mt-[15%]">
            {isLogin ? "Don't have an account?" : "Already have an account?"}$nbsp;
            <button
              className="text-blue-600 cursor-pointer"
              onClick={handleIsSignIn}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
