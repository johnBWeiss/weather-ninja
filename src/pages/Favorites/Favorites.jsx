import React from "react";
import City from "../../components/City/City";

const Favorites = () => {
  const mockFavorites = ["", "", ""];
  return (
    <>
      <h1 className="favorites-title padding-top-300 center">Favorites</h1>
      <div className="flex flex-wrap center gallery-container">
        {mockFavorites?.map((forecast, index) => (
          <City key={index} isFarenheight={true} />
        ))}
      </div>
    </>
  );
};
export default Favorites;
