import React, { useEffect, useState } from "react";

import { useFirebase } from "../Context/Firebase";

function BookCard(props) {
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    firebase.getImageUrl(props.imageUrl).then((url) => setUrl(url));
  }, []);
  return (
    <>
      <div className=" card-group max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={url} alt="Image of atomic habit book" />
        <div
          className="
       px-6 py-4"
        >
          <div
            className="
         
          font-bold text-xl mb-2"
          >
            {props.name}
          </div>
          <p className="text-gray-700 text-base">
            This Book Has a title {props.name} and this book is sold by{" "}
            {props.displayName} and this book cost Rs.{props.price}
          </p>
        </div>
        <div
          className="
       
        px-6 pt-4 pb-2"
        >
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
      </div>
    </>
  );
}

export default BookCard;
