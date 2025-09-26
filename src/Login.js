import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "./utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { BACKGROUND_IMG, USER_AVATAR } from "./utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMEssage] = useState(null);

  const dispatch = useDispatch();
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPasswordValue = useRef(null);

  const handleClick = () => {
    const emailValue = email.current?.value;
    const passwordValue = password.current?.value;
    const fullNameValue = isSignInForm ? null : fullName.current?.value;
    const confirmPassword = isSignInForm
      ? null
      : confirmPasswordValue.current?.value;

    if (!isSignInForm && passwordValue !== confirmPassword) {
      setErrorMEssage("Passwords do not match");
      return;
    }

    const message = checkValidData(emailValue, passwordValue, fullNameValue);
    setErrorMEssage(message);

    if (message) return;

    if (!isSignInForm) {
      //signup logic
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current?.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMEssage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMEssage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMEssage(errorCode + "-" + errorMessage);
        });
    }
  };

  const handleToggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen relative">
        <img
          className="absolute h-full w-full object-cover"
          src={BACKGROUND_IMG}
          alt="bg.jpg"
        />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-sm absolute bg-black p-6 sm:p-8 my-36 text-sm text-white bg-opacity-70 rounded-lg"
        >
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              ref={fullName}
              type="text"
              placeholder="Full Name"
              className="p-4 my-2 w-full bg-gray-700"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-4 my-2 w-full bg-gray-700"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-2 w-full bg-gray-700"
          />
          {!isSignInForm && (
            <input
              ref={confirmPasswordValue}
              type="password"
              placeholder="Confirm Password"
              className="p-4 my-2 w-full bg-gray-700"
            />
          )}
          <p className="text-red-500 font-bold text-lg py-4">{errorMessage}</p>
          <button
            className="p-4 my-4 bg-red-600 w-full rounded-lg"
            onClick={handleClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="pt-4 cursor-pointer" onClick={handleToggleForm}>
            {isSignInForm
              ? "New to Netflix? Sign Up"
              : "Already Registered? Sign In"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
