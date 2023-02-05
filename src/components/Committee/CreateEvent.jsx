import React, { Fragment } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import { Tab } from "@headlessui/react";
import { useState, useEffect, useContext } from "react";
import EventsServices from "../../services/EventsServices";
import CreateEventForm from "./CreateEventForm";
import TimeSlots from "./TimeSlots";
import { v4 as uuidv4 } from "uuid";
import { appContext } from "../../context";
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
  const [selectedIndex, setSelectedIndex] = useState(0);
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
    resourcesRequired: "",
    eventWebsite: "",
    estimatedBudget: 0,
    noOfVolunteers: 0,
    sponsorsAcquired: "",
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
    await EventsServices.createEvent(payload, token).then((res) => {
      console.log(res);
    });
  };

  console.log(checked);

  return (
    <div>
      <Navbar />

      <div>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List
            // as={Fragment}
            className="mt-8 flex  items-center justify-center w-1/2 rounded-xl bg-indigo-600 lg:mx-96 p-1"
          >
            <Tab
              index={0}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-3.5 text-md font-medium leading-5 text-indigo-600",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow text-indigo-600"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Event Registration
            </Tab>
            <Tab
              index={1}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-3.5 text-md font-medium leading-5 text-indigo-600",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow text-indigo-600"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Request Permission
            </Tab>
            <Tab
              index={2}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-3.5 text-md font-medium leading-5 text-indigo-600",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow text-indigo-600"
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
                          <div className="overflow-hidden shadow-md sm:rounded-md">
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
                                  <div>
                                    <form>
                                      <div className="relative">
                                        <input
                                          class="block w-full text-sm  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
                                          name="thumbnail"
                                          type="file"
                                          onChange={(e) =>
                                            setImageUpload(e.target.files[0])
                                          }
                                        />

                                        <button
                                          onClick={uploadFile}
                                          type="button"
                                          class="text-white absolute right-0 bottom-0.5 bg-burntsienna hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-tr-lg rounded-br-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                          Upload
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                                <div className="col-span-3">
                                  <label
                                    htmlFor="about"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    About
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
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
                                <div className="col-span-3">
                                  <label
                                    htmlFor="about"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Resources
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      name="resources"
                                      onChange={(e) => {
                                        setPayload({
                                          ...payload,
                                          resourcesRequired: e.target.value,
                                        });
                                      }}
                                      className="mt-1 block  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      placeholder="Resources Required"
                                      defaultValue={""}
                                    />
                                  </div>
                                </div>
                                {/* <br /> */}
                                <div className="col-span-3">
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Date
                                  </label>
                                  <input
                                    type="date"
                                    name="start_date"
                                    onChange={(e) => {
                                      setPayload({
                                        ...payload,
                                        startDate: e.target.value,
                                      });
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div className="col-span-3">
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Date
                                  </label>
                                  <input
                                    type="date"
                                    name="end_date"
                                    onChange={(e) => {
                                      setPayload({
                                        ...payload,
                                        endDate: e.target.value,
                                      });
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div className="col-span-3">
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Volunteers
                                  </label>
                                  <input
                                    type="number"
                                    name="noOfVolunteers"
                                    placeholder="Number of Volunteers"
                                    onChange={(e) => {
                                      setPayload({
                                        ...payload,
                                        date: e.target.value,
                                      });
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div className="col-span-3">
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Budget
                                  </label>
                                  <input
                                    type="number"
                                    name="noOfVolunteers"
                                    placeholder="Estimated Budget"
                                    onChange={(e) => {
                                      setPayload({
                                        ...payload,
                                        estimatedBudget: e.target.value,
                                      });
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div className="col-span-3">
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Website
                                  </label>
                                  <input
                                    type="text"
                                    name="event_website"
                                    placeholder="Event Website Link"
                                    onChange={(e) => {
                                      setPayload({
                                        ...payload,
                                        eventWebsite: e.target.value,
                                      });
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div className="col-span-3">
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Sponsors
                                  </label>
                                  <input
                                    type="text"
                                    name="sponsors"
                                    placeholder="Sponsors Acquired"
                                    onChange={(e) => {
                                      setPayload({
                                        ...payload,
                                        sponsorsAcquired: e.target.value,
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
                                        className="h-4 w-4 rounded border-gray-300 text-burntsienna"
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
                                        className="h-4 w-4 rounded border-gray-300 text-burntsienna"
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
                                onClick={() => setSelectedIndex(1)}
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
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
                        Faculty/Administration Approval
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 w-[25em]">
                        Decide which college bodies would be approving your
                        proposed event.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <form action="#" method="POST">
                      <div className="overflow-hidden shadow-md sm:rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                          <fieldset>
                            <legend className="sr-only">Approval Bodies</legend>
                            <div
                              className="text-lg font-semibold text-gray-900"
                              aria-hidden="true"
                            >
                              Approval Bodies
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
                                      className="h-6 w-6 rounded border-gray-400 text-burntsienna mt-24"
                                    />
                                  </div>

                                  <div
                                    href="#"
                                    class="flex flex-col items-center bg-indigo-50 border border-gray-200 rounded-lg shadow-sm md:flex-row w-full  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                  >
                                    <img
                                      class="lg:h-28 lg:w-28 bg-white rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                      src={item?.thumbnail}
                                      alt=""
                                    />
                                    <div class="flex flex-col justify-between p-4 leading-normal">
                                      <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {item?.name}
                                      </h5>
                                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {item?.email}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </fieldset>
                        </div>
                        <div className="px-4 py-3 text-right sm:px-6">
                          <button
                            type="button"
                            onClick={handleClick}
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <TimeSlots />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      <Footer />
    </div>
  );
}
