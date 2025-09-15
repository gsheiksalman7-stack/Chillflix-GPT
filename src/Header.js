import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "./utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "./utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "./utils/constants";
import { toggleGPTSearchView } from "./utils/gptSlice";
import { changeLanguage } from "./utils/configSlice";
import lang from "./utils/languageConstants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const gptSearch = useSelector((store) => store.gpt.showGPTSearch);
  const langkey = useSelector((store) => store.lang.lang);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribing when it unmounts
    return () => unsubscribe();
  }, []);

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };

  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-40 flex flex-col md:flex-row justify-between">
      <img className="w-24 md:w-44 mx-auto md:mx-0" src={LOGO} alt="Logo.png" />
      {user && (
        <div className="flex justify-between p-2 mr-4">
          {gptSearch && (
            <select
              className="p-2 m-2 bg-gray-600 text-white"
              onChange={handleLangChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGPTSearchClick}
            className="py-1 md:py-2 px-2 md:px-4 mx-2 md:mx-4 my-2 bg-red-600 text-white rounded-lg"
          >
            {gptSearch ? lang[langkey].Home : "GPT Search"}
          </button>
          <img
            className="hidden md:block rounded-lg w-16 mr-3"
            alt="user-icon"
            src={user?.photoURL}
          />
          <button onClick={handleSignOut} className="font-bold text-white">
            {lang[langkey].SignOut}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
