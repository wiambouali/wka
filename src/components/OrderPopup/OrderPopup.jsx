import React, { useState } from "react";
import { IoCloseOutline, IoEye, IoEyeOff } from "react-icons/io5"; // Import eye icons
import { auth, googleProvider } from "../../firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const OrderPopup = ({ orderPopup, setOrderPopup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setOrderPopup(false);
    } catch (error) {
      console.error("Email login error", error);
    }
  };

  const handleEmailRegister = async () => {
    try {
      if (password !== confirmPassword) {
        console.error("Passwords do not match");
        return;
      }
      
      await createUserWithEmailAndPassword(auth, email, password);
      setOrderPopup(false);
    } catch (error) {
      console.error("Email registration error", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setOrderPopup(false);
    } catch (error) {
      console.error("Google login error", error);
    }
  };

  return (
    <>
      {orderPopup && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[400px]">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-black/70">{isRegistering ? 'Register' : 'Log In'}</h1>
              <IoCloseOutline
                className="text-2xl cursor-pointer"
                onClick={() => setOrderPopup(false)}
              />
            </div>
            <div className="mt-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-4 py-2 mb-6 text-lg"
              />
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-4 py-2 mb-2 text-lg"
                />
                <button
                  onClick={togglePasswordVisibility}
                  className="absolute top-2 right-3"
                >
                  {isPasswordVisible ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
              {isRegistering && (
                <div className="relative">
                  <input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-4 py-2 mb-2 text-lg"
                  />
                  <button
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute top-2 right-3"
                  >
                    {isConfirmPasswordVisible ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>
              )}
              <div className="flex justify-center mb-6">
                {isRegistering ? (
                  <button
                    onClick={handleEmailRegister}
                    className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-6 rounded-full text-lg"
                  >
                    Register
                  </button>
                ) : (
                  <button
                    onClick={handleEmailLogin}
                    className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-6 rounded-full text-lg"
                  >
                    Log In
                  </button>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center bg-white text-black border border-gray-300 rounded-full py-2 px-6 shadow-sm hover:bg-gray-100"
                >
                  <FcGoogle className="mr-2" />
                  Google
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-primary text-sm hover:underline focus:outline-none"
                >
                  {isRegistering ? 'Already have an account? Log in' : 'Don\'t have an account? Register'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPopup;
