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
    <div className="absolute w-screen px-4 py-1 bg-gradient-to-b from-black z-40 flex flex-col md:flex-row justify-between items-center text-sm">
      <img className="w-20 md:w-32 mx-auto md:mx-0" src={LOGO} alt="Logo.png" />
      {user && (
        <div className="flex items-center gap-x-20 md:gap-2 px-2 my-2 md:my-0">
          {gptSearch && (
            <select
              className="p-1 mr-4 md:mr-0 bg-gray-600 text-white text-xs rounded"
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
            className="h-8 px-3 bg-red-600 text-white text-xs rounded"
          >
            {gptSearch ? lang[langkey].Home : "GPT Search"}
          </button>
          <img
            className="hidden md:block rounded w-10"
            alt="user-icon"
            src={user?.photoURL}
          />
          <button onClick={handleSignOut} className="h-8 md:h-2.5 px-4 md:px-0 rounded font-semibold text-xs text-white bg-gray-600 md:bg-transparent">
            {lang[langkey].SignOut}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
