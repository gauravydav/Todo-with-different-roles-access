import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/login.css";
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const loginErrorMessage = useSelector(
    (state: RootState) => state.auth.loginError
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ username, password }));
      if (!isAuthenticated) {
        setLoginError(true);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      }
    } catch (error) {
      setLoginError(true);
    }
  };
  if (isAuthenticated) {
    navigate("/todo");
  }
  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-peachy rounded-md overflow-hidden shadow-md text-black">
        <h1 className="text-3xl font-bold text-center p-4 bg-navy-blue text-white">
          LOGIN
        </h1>
        <div className="p-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 mb-4 bg-white"
          />
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 mb-4 bg-white"
            />
            <button
              className="absolute top-2 right-2 text-lg cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-gray-800 text-white p-2 rounded font-semibold hover:bg-blue-600"
          >
            Login
          </button>
          <div className="text-center mt-4">
            Not registered?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Register
            </span>
          </div>
          <div className="p-4">
            <div className={`error-slide ${showMessage ? "slide-in" : ""}`}>
              {loginErrorMessage ||
                "You are not authorized. Please check your credentials and try again."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
