import { Dialog, Transition } from "@headlessui/react";
import { useState, useEffect, useContext, Fragment } from "react";
import { appContext } from "../../context";
import CollegeAdminService from "../../services/CollegeAdminService";

export default function RaiseQuery() {
  const { token } = useContext(appContext);
  let [load, setLoad] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [payload, setPayload] = useState({
    eventId: "63de880b03869495d828a2f6",
    content: "",
  });
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  console.log(payload);

  const handleClick = async () => {
    setLoad(true);
    await CollegeAdminService.raiseQuery(payload, token).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-50 focus:outline-none "
        >
          Query
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-semibold text-gray-900"
                  >
                    Raise Query
                  </Dialog.Title>
                  <div className="mt-4">
                    <div class="mb-2">
                      <input
                        type="text"
                        name="content"
                        placeholder="Enter Text"
                        id="default-input"
                        onChange={(e) => {
                          setPayload({
                            ...payload,
                            content: e.target.value,
                          });
                        }}
                        class="bg-gray-100 border shadow-sm border-gray-300 text-gray-900  text-sm rounded-lg block w-full p-2.5"
                      />
                      <span className="text-xs  text-gray-600">
                        Ask any query regarding the proposed event.
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end flex-row mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-burntsienna px-4 py-2 text-sm font-medium text-white hover:bg-indigo-200 focus:outline-none focus-visible:ring-2  "
                      onClick={handleClick}
                    >
                      Submit Query
                    </button>
                    <button
                      type="button"
                      className=" mx-2 inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2  "
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
