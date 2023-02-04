import React, { Fragment } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import { Tab } from "@headlessui/react";
import { useState, useEffect, useContext } from "react";
import { appContext } from "../../context";
import EventsServices from "../../services/EventsServices";
import CreateEventForm from "./CreateEventForm";
import Calendar from "./Calendar";
import { v4 as uuidv4 } from "uuid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase/config";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CreateEvent() {
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
    description: "",
    date: "",
    thumbnail: "",
    isSelection: false,
    isPayment: false,
    amount: 0,
    approval: [],
  });

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
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

  useEffect(() => {
    const call = async () => {
      await EventsServices.getApprovalBodies(
        localStorage.getItem("appToken")
      ).then((res) => {
        console.log(res);
        setApprovalBodiesList(res.data.data);
      });
    };
    call();
  }, []);
  console.log(payload);
  const handleClick = async () => {
    setLoad(true);
    var formData = require("form-data");
    const event = new formData();
    event.append("name", `${payload.name}`);
    event.append("description", payload.description);
    event.append("date", payload.date);
    event.append("thumbnail", payload.thumbnail);
    event.append("isSelection", payload.isSelection);
    event.append("isPayment", payload.isPayment);
    event.append("amount", payload.amount);
    event.append("approval", payload.approval);
    console.log(event);
    await EventsServices.createEvent(payload, token).then((res) => {
      console.log(res);
    });
  };

  console.log(checked);

  return (
    <div>
      <Navbar />

      <div>
        <Tab.Group>
          <Tab.List
            // as={Fragment}
            className="mt-8 flex  items-center justify-center w-1/2 rounded-xl bg-bdazzledblue lg:mx-96 p-1"
          >
            <Tab
              index={1}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-3.5 text-md font-medium leading-5 text-indigo-600",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow text-bdazzledblue"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Event Registration
            </Tab>
            <Tab
              index={2}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-3.5 text-md font-medium leading-5 text-indigo-600",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow text-bdazzledblue"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Request Permission
            </Tab>
            <Tab
              index={3}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-3.5 text-md font-medium leading-5 text-indigo-600",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow text-bdazzledblue"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Check Available Venue
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <>
                <div className="m-8 lg:m-10">
                  {/* <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Profile
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Website
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                            http://
                          </span>
                          <input
                            type="text"
                            name="company-website"
                            id="company-website"
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="www.example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Photo
                      </label>
                      <div className="mt-1 flex items-center">
                        <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <button
                          type="button"
                          className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div> */}

                  <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5"></div>
                  </div>

                  <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                      <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Personal Information
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            Use a permanent address where you can receive mail.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#" method="POST">
                          <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="bg-white px-4 py-5 sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                  <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Event Name
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    onChange={(e) => {
                                      setPayload({
                                        ...payload,
                                        name: e.target.value,
                                      });
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>

                                <div className="col-span-6">
                                  <label className="block text-sm font-medium text-gray-700">
                                    Thumbnail
                                  </label>
                                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                      <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                      >
                                        <path
                                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      <div className="flex text-sm text-gray-600">
                                        <label
                                          htmlFor="file-upload"
                                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                          {/* <span>Upload a file</span> */}
                                          <input
                                            name="thumbnail"
                                            type="file"
                                            onChange={(event) => {
                                              setImageUpload(
                                                event.target.files[0]
                                              );
                                              uploadFile();
                                            }}
                                          />
                                        </label>
                                        {/* <p className="pl-1">or drag and drop</p> */}
                                      </div>
                                      {/* <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-6">
                                  <label
                                    htmlFor="about"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    About
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      id="description"
                                      name="description"
                                      onChange={(e) => {
                                        setPayload({
                                          ...payload,
                                          description: e.target.value,
                                        });
                                      }}
                                      rows={4}
                                      className="mt-1 block  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      placeholder="Description"
                                      defaultValue={""}
                                    />
                                  </div>
                                  <p className="mt-2 text-xs text-gray-500">
                                    Brief description for the event.
                                  </p>
                                </div>
                                {/* <br /> */}
                                <div className="col-span-6">
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Date
                                  </label>
                                  <input
                                    type="date"
                                    name="date"
                                    autoComplete="address-level2"
                                    onChange={(e) => {
                                      setPayload({
                                        ...payload,
                                        date: e.target.value,
                                      });
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div className="col-span-6">
                                  <div className="flex items-start my-4">
                                    <div className="flex h-5 items-center my-2">
                                      <input
                                        name="isSelection"
                                        type="checkbox"
                                        onChange={(e) => {
                                          setPayload({
                                            ...payload,
                                            isSelection: e.target.checked,
                                          });
                                        }}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                                      />
                                    </div>
                                    <div className="ml-3 text-sm">
                                      <label
                                        htmlFor="offers"
                                        className="font-medium text-gray-700"
                                      >
                                        Selection Criteria?
                                      </label>
                                      <p className="text-gray-500">
                                        Tick the box if the event has some
                                        selection process.
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start my-2">
                                    <div className="flex h-5 items-center my-2">
                                      <input
                                        name="isPayment"
                                        type="checkbox"
                                        onChange={(e) => {
                                          setPayload({
                                            ...payload,
                                            isPayment: e.target.checked,
                                          });
                                        }}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                    </div>
                                    <div className="ml-3 text-sm">
                                      <label
                                        htmlFor="offers"
                                        className="font-medium text-gray-700"
                                      >
                                        Not a Free Event?
                                      </label>
                                      <p className="text-gray-500">
                                        Tick the box if the event has no
                                        registration fee.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {payload.isPayment ? (
                                  <>
                                    <div className="col-span-3">
                                      <label
                                        htmlFor="city"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Amount
                                      </label>
                                      <input
                                        type="text"
                                        name="amount"
                                        onChange={(e) => {
                                          setPayload({
                                            ...payload,
                                            amount: e.target.value.trim(),
                                          });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      />
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                              <button
                                type="button"
                                onClick={handleClick}
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                      <div className="border-t border-gray-200" />
                    </div>
                  </div>
                </div>
              </>
            </Tab.Panel>
            <Tab.Panel>
              <div className=" p-8 mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Notifications
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Decide which communications you'd like to receive and
                        how.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <form action="#" method="POST">
                      <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                          <fieldset>
                            <legend className="sr-only">By Email</legend>
                            <div
                              className="text-base font-medium text-gray-900"
                              aria-hidden="true"
                            >
                              By Email
                            </div>
                            <div className="mt-4 space-y-4">
                              {approvalBodiesList?.map((item) => (
                                <div
                                  key={item._id}
                                  className="flex gap-4 items-start"
                                >
                                  <div className="flex h-5 items-center">
                                    <input
                                      id="comments"
                                      name="comments"
                                      type="checkbox"
                                      onChange={(event) => {
                                        var updatedList = [...checked];
                                        if (event.target.checked) {
                                          updatedList = [
                                            ...checked,
                                            {
                                              name: item.name,
                                              id: item._id,
                                            },
                                          ];
                                        } else {
                                          updatedList.splice(
                                            checked.indexOf(event.target.value),
                                            1
                                          );
                                        }
                                        setChecked(updatedList);
                                        setPayload({
                                          ...payload,
                                          approval: updatedList,
                                        });
                                      }}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                  </div>
                                  <div
                                    href="#"
                                    class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row w-full  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                  >
                                    <img
                                      class="lg:h-28 lg:w-28 rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                      src="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=365&q=80"
                                      alt=""
                                    />
                                    <div class="flex flex-col justify-between p-4 leading-normal">
                                      <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {item.name}
                                      </h5>
                                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {item.email}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </fieldset>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>Check Available Status</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      <Footer />
    </div>
  );
}
