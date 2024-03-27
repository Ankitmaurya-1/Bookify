import React, { useState } from "react";

import { useFirebase } from "../Context/Firebase";
function ListingPage() {
  const firebase = useFirebase();

  const [name, setName] = useState();
  const [isBnNumber, setisBnNumber] = useState();
  const [price, setprice] = useState();
  const [coverPic, setcoverPic] = useState(null);

  // change cover to coverpic if any  error is there
  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleCreateNewListing(name, isBnNumber, price, coverPic);
    alert("List Sucessfully added");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Enter Book Name
        </label>
        <input
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Enter Book Name"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="number"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Enter IsBnNumber
        </label>
        <input
          onChange={(e) => setisBnNumber(e.target.value)}
          value={isBnNumber}
          type="text"
          id="number"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Enter IsBnNumber"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="price"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Enter Price
        </label>
        <input
          onChange={(e) => setprice(e.target.value)}
          value={price}
          type="text"
          id="price"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Enter Price"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="pic"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Choose Cover Pic
        </label>
        <input
          onChange={(e) => setcoverPic(e.target.files[0])}
          type="file"
          id="pic"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create
      </button>
      <br />
    </form>
  );
}

export default ListingPage;
