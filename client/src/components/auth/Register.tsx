import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/register.css";
const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registrationMessage = useSelector(
    (state: RootState) => state.auth.registrationMessage
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (registrationMessage) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        if (registrationMessage === "User registered successfully") {
          navigate("/login");
        }
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [registrationMessage]);
  const handleRegister = () => {
    dispatch(registerUser({ username, password }));
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-peachy rounded-md overflow-hidden shadow-md text-black">
        <h1 className="text-3xl font-bold text-center p-4 bg-navy-blue text-white">
          REGISTER
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
            onClick={handleRegister}
            className="w-full bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
          >
            Register
          </button>
          <div className="text-center mt-4">
            Already registered?
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
          <div className="p-4">
            {showMessage && (
              <div
                className={`fixed bottom-4 right-4 p-4 rounded ${
                  registrationMessage === "User registered successfully"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                <p>{registrationMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
