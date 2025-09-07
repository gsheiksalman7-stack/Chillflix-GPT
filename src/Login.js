import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "./utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMEssage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
            photoURL:
              "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
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
              navigate("/Browse");
            })
            .catch((error) => {
              setErrorMEssage(error.message);
            });
          console.log(user);
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
          console.log(user);
          navigate("/Browse");
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
      <div>
        <img
          className="absolute"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8d617e19-3c3c-4c28-8998-c9b14dbc7200/web/IN-en-20250901-TRIFECTA-perspective_48d84d4e-9558-46b8-a0f3-8b2dc8478431_large.jpg"
          alt="bg.jpg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute bg-black p-12 my-36 mx-auto left-0 right-0 text-white bg-opacity-70 rounded-lg"
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
  );
};

export default Login;
