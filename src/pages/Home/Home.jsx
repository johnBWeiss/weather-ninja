import React, { useState } from "react";
import searchIcon from "../../assets/images/search-icon.png";
import City from "../../components/City/City";
const Home = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const inputText = event.target.value;

    // Regular expression to allow only English letters (a-z, A-Z)
    const englishLettersRegex = /^[a-zA-Z]*$/;

    if (englishLettersRegex.test(inputText)) {
      setInputValue(inputText);
    }
  };

  return (
    <div className="home-container">
      <div className="flex relative center">
        <img className="search-icon" src={searchIcon} alt="search icon" />

        <input
          className="search-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search for a city"
        />
      </div>
      <div className="center padding-top-100">
        <City />
      </div>
      <div className="flex flex-wrap center gallery-container">
        <City title='sun' />
        <City />
        <City />
        <City />
        <City />
      </div>
    </div>
  );
};

export default Home;
