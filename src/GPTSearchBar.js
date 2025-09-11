import React from "react";
import lang from "./utils/languageConstants";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {

    const langkey=useSelector(store=>store.lang.lang)

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12 bg-opacity-50">
        <input
          className="px-4 m-4 col-span-9"
          type="text"
          placeholder={lang[langkey].gptSearchPlaceHolder}
        />
        <button className="py-2 px-4 bg-red-700 rounded-lg text-white col-span-3 m-4">
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
