import React, { useState, useContext, useEffect } from "react";
import Navbar from "../navbar";
import { appContext } from "../../context";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase/config";
import CollegeAdminService from "../../services/CollegeAdminService";

const CreateCommittee = () => {
  const { token } = useContext(appContext);
  // console.log(token);
  const [imageUpload, setImageUpload] = useState();
  const [approvalBodiesList, setApprovalBodiesList] = useState();
  const [approvePayload, setApprovePayload] = useState([]);
  const [checked, setChecked] = useState([]);
  const [load, setLoad] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    thumbnail: "",
  });

  const handleClick = async () => {
    setLoad(true);
    await CollegeAdminService.createCommittee(payload, token).then((res) => {
      console.log(res);
    });
  };

  const uploadFile = () => {
    setLoad(true);
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name} +`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls(url);
        console.log(url);
        setPayload({
          ...payload,
          thumbnail: url,
        });
      });
    });
  };

  console.log(payload);

  return (
    <>
      <Navbar />
      <div>
        <div className="m-8 lg:m-10 ">
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5"></div>
          </div>

          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Committee Details
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Enter your committee details here.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div>
                  <form>
                    <div class="relative my-4">
                      <label
                        class="block mb-2 text-sm font-medium"
                        for="file_input"
                      >
                        Upload file
                      </label>
                      <input
                        class="block w-full text-sm  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
                        name="thumbnail"
                        type="file"
                        onChange={(e) => setImageUpload(e.target.files[0])}
                      />

                      <button
                        onClick={uploadFile}
                        type="button"
                        class="text-white absolute right-0 bottom-0.5 bg-gunmetal hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-tr-lg rounded-br-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                </div>
                <div class="mb-6">
                  <label
                    for="default-input"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Committee Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={(e) => {
                      setPayload({
                        ...payload,
                        name: e.target.value,
                      });
                    }}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <label
                  for="input-group-1"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <div class="relative mb-6">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => {
                      setPayload({
                        ...payload,
                        email: e.target.value,
                      });
                    }}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                  />
                </div>
                <label
                  for="website-admin"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div class="flex">
                  <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    @
                  </span>
                  <input
                    type="text"
                    name="password"
                    onChange={(e) => {
                      setPayload({
                        ...payload,
                        password: e.target.value,
                      });
                    }}
                    class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Password"
                  />
                </div>
                <div className="py-3 text-right ">
                  <button
                    type="button"
                    onClick={handleClick}
                    className=" my-2 inline-flex justify-center px-8 rounded-md border border-transparent py-2  text-sm font-medium text-white shadow-md bg-gunmetal"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCommittee;
