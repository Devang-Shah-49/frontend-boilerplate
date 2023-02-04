import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import Navbar from "../navbar";
import Footer from "../footer";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase/config";
import EventsServices from "../../services/EventsServices";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EventDetails = ({ item }) => {
  const navigate = useNavigate();
  const search = useLocation();
  const obj = search.state?.event_details;
  const [imageUpload, setImageUpload] = useState();
  const [checked, setChecked] = useState([]);
  const [load, setLoad] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  console.log("hello", search);
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
  const [sendCerti, setSendCerti] = useState([]);
  const [payload, setPayload] = useState({
    name: obj?.name,
    description: obj?.description,
    date: obj?.date,
    thumbnail: obj?.thumbnail,
    isSelection: obj?.isSelection,
    isPayment: obj?.payment?.isPayment,
    amount: obj?.payment?.amount,
    // approval: [
    //   {
    //     id: obj?.approval[0]?.id,
    //     name: obj?.approval[0]?.name,
    //   },
    // ],
    rsvp: [],
  });
  const sendCertificates = async () => {};
  const handleSubmit = async () => {
    setLoad(true);
    await EventsServices.updateEvent(
      payload,
      localStorage.getItem("appToken"),
      obj?._id
    ).then((res) => {
      console.log(res);
    });
    navigate("/committee");
  };
  return (
    <>
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
              Edit Event Details
            </Tab>
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
              Students Registered
            </Tab>
          </Tab.List>

          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <>
                <div className="m-16 lg:m-16">
                  <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5"></div>
                  </div>

                  <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                      <div className="md:col-span-1 ">
                        <div className="mt-5 px-4 sm:px-0">
                        <img
                            className="h-56 w-[23em] mb-5 rounded-xl"
                            src={payload?.thumbnail}
                          ></img>
                          <h3 className="flex justify-center text-2xl font-medium leading-6 text-gray-900">
                       
                            <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-bdazzledblue to-darkskyblue md:inline-flex md:items-center md:justify-center">
                              {payload?.name}
                            </span>
                          </h3>
                          <p className="mt-4 text-md text-gray-600">{payload?.description}
                          </p>
                      
                        </div>
                      </div>
                      <div className="mt-5  md:col-span-2 md:mt-0">
                        <form action="#" method="POST">
                          <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="bg-white px-4 py-5 lg:px-16 sm:p-6">
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
                                    defaultValue={payload.name || ""}
                                    onChange={(e) => {
                                      setPayload({
                                        ...payload,
                                        name: e.target.value,
                                      });
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>

                                <div className="grid gap-3 grid-col-6 col-span-6">
                                  <label className="block text-sm font-medium text-gray-700">
                                    Thumbnail
                                  </label>
                                  <>
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
                                            class="text-white absolute right-0 bottom-0.5 bg-gunmetal hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-tr-lg rounded-br-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                          >
                                            Upload
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                    {/* <img src={payload?.thumbnail} alt=''/> */}
                                  </>
                                </div>
                                <div className="col-span-6">
                                  <label
                                    htmlFor="about"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    About
                                  </label>
                                  <div className="mt-1">
                                    <textarea
                                      id="description"
                                      name="description"
                                      defaultValue={payload.description || ""}
                                      onChange={(e) => {
                                        setPayload({
                                          ...payload,
                                          description: e.target.value,
                                        });
                                      }}
                                      rows={4}
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      placeholder="Description"
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
                                    Value={payload?.date}
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
                                        id="isSelection"
                                        name="isSelection"
                                        type="checkbox"
                                        checked={payload?.isSelection}
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
                                        id="offers"
                                        name="offers"
                                        type="checkbox"
                                        checked={payload?.isPayment}
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
                                        Not a free event?
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
                                        defaultValue={payload?.amount || 0}
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
                                onClick={handleSubmit}
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Edit Event
                              </button>
                            </div>
                            <div class="flex w-1/2 mb-10">
                              {obj?.approval.map((item) => (
                                <div class="flex flex-wrap  mx-4 -m-2">
                                  <div class="p-2 w-full">
                                    <div class="h-full flex items-center border-gray-200 border-2 border-bdazzledblue p-4 rounded-lg">
                                      <img
                                        alt="team"
                                        class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                        src="https://dummyimage.com/80x80"
                                      />
                                      <div class="flex-grow">
                                        <h2 class="text-gray-900 title-font font-medium">
                                          Approval sent to
                                        </h2>
                                        <p class="text-gray-500">
                                          {item?.name}
                                        </p>
                                        <p class="text-gray-500">
                                          {item?.query[0]}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                      <div className="border-t border-gray-200" />
                    </div>
                  </div> */}
                </div>
              </>
            </Tab.Panel>
            <Tab.Panel>
              <>
                <div className="m-8 lg:m-10">
                  <div className="relative overflow-x-auto shadow-md shadow-gunmetal sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="lg:text-lg px-6 py-3">
                            Student Name
                          </th>
                          <th scope="col" className="lg:text-lg px-6 py-3">
                            Id
                          </th>
                          {/* <th scope="col" className="px-6 py-3">
                    Event
                </th> */}
                          {/* <th scope="col" className="px-6 py-3">
                    Price
                </th> */}
                          <th scope="col" className="lg:text-lg px-6 py-3">
                            Is Student Selected?
                            <button className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-green-500 px-4 py-1 text-base font-medium text-white shadow-sm hover:bg-green-600">
                              Send
                            </button>
                          </th>
                          {/* <th scope="col" className="lg:text-lg px-6 py-3">
                    Send Certificate
                    <button
                      onClick={sendCertificates}
                      className="ml-8 inline-flex items-center justify-end whitespace-nowrap rounded-md border border-transparent bg-green-500 px-4 py-1 text-base font-medium text-white shadow-sm hover:bg-green-600"
                    >
                     Send
                    </button>
                </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {obj?.rsvp?.map((i) => {
                          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {i?.name}
                            </th>
                            <td className="px-6 py-4">{i?.id}</td>
                            <td className="px-6 py-4">
                              <button>
                                <input
                                  id="tableSelection"
                                  type="checkbox"
                                  checked={i?.isSelected}
                                  defaultChecked={i?.isSelected}
                                  onChange={(e) => {
                                    var updatedList = [...checked];
                                    if (e.target.checked) {
                                      updatedList = [
                                        ...checked,
                                        {
                                          id: i?.id,
                                        },
                                      ];
                                    } else {
                                      updatedList.splice(
                                        checked.indexOf(e.target.value),
                                        1
                                      );
                                    }
                                    setChecked(updatedList);
                                    setPayload({
                                      ...payload,
                                      rsvp: updatedList,
                                    });
                                  }}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              </button>
                            </td>
                            {/* <td className="px-6 py-4">
                    <button >
                    <input
                      id="tableCerti"
                      type="checkbox"
                      // checked={i?.se}
                      // defaultChecked={i?.isSelected}
                      onChange={(e) => {
                        var updatedList1 = [...checked1];
                        if (e.target.checked) {
                          updatedList1 = [
                            ...checked1, {
                              id: i?.id,
                            }
                          ]
                        } else {
                          updatedList1.splice(
                            checked1.indexOf(e.target.value),
                            1
                          );
                      }
                      setChecked1(updatedList1);
                      setSendCerti(updatedList1);
                      }
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    </button>
                </td> */}
                          </tr>;
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="lg:text-lg my-16">
                    Send Certificates for event participation?
                    <button
                      onClick={sendCertificates}
                      className="ml-8 inline-flex items-center justify-end whitespace-nowrap rounded-md border border-transparent bg-green-500 px-4 py-1 text-base font-medium text-white shadow-sm hover:bg-green-600"
                    >
                      Send
                    </button>
                  </div>
                  {/* <button className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"> </button> */}
                </div>
              </>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <Footer />
    </>
  );
};
export default EventDetails;
