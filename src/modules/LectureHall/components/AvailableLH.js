import { useState, useRef, useEffect } from "react";
import "./Lecturehall.css";

export default function AvailableLH({ user }) {
  const [available, setAvailable] = useState([]);
  const [booked, setBooked] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dateInputRef = useRef();
  const fromTimeInputRef = useRef();
  const toTimeInputRef = useRef();
  const capacityInputRef = useRef();

  function bookingHandler(lh) {
    //book the available lt
    console.log(lh.lh_id);
    const s = lh.lh_id === 5 || lh.lh_id === 9 ? 2 : 1;

    // Removed lh from available and inserted in booked
    setAvailable(available.filter((l) => l.lh_id !== lh.lh_id));
    lh.booking_status = s;
    booked.push(lh);
    setBooked(booked);

    fetch(
      `https://lecture-hall-backend.herokuapp.com/lecturehall/available/${lh.lh_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user[0].user_id,
          start:
            dateInputRef.current.value +
            " " +
            fromTimeInputRef.current.value +
            ":00",
          end:
            dateInputRef.current.value +
            " " +
            toTimeInputRef.current.value +
            ":00",
          purpose: "testing",
          status: s,
        }),
      }
    ).then((response) => {
      if (response.status === 200) console.log("Booking Confirmed");
    });
  }

  function setModalHandler() {
    setModalIsOpen(false);
  }

  // useEffect(() => submitHandler(),[available,booked])

  function submitHandler(e) {
    //fetch available lt
    e.preventDefault();
    fetch("https://lecture-hall-backend.herokuapp.com/lecturehall/available", {
      //lt available in the time slot
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        capacity: capacityInputRef.current.value,
        start:
          dateInputRef.current.value +
          " " +
          fromTimeInputRef.current.value +
          ":00",
        end:
          dateInputRef.current.value +
          " " +
          toTimeInputRef.current.value +
          ":00",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAvailable(data);
        setIsLoading(false);
      });

    // fetch booked lh
    fetch("https://lecture-hall-backend.herokuapp.com/lecturehall/booked", {
      //lt booked in the time slot
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        capacity: capacityInputRef.current.value,
        start:
          dateInputRef.current.value +
          " " +
          fromTimeInputRef.current.value +
          ":00",
        end:
          dateInputRef.current.value +
          " " +
          toTimeInputRef.current.value +
          ":00",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBooked(data);
      });
  }

  return (
    <div>
      {console.log(user)}

      <form className="w-full max-w-8xl	mx-16 my-16" onSubmit={submitHandler}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="date"
              ref={dateInputRef}
            />
          </div>
          <div className="w-full md:w-1/5 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Time From
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="time"
              ref={fromTimeInputRef}
            />
          </div>
          <div className="w-full md:w-1/5 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Time To
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="time"
              ref={toTimeInputRef}
            />
          </div>
          <div className="w-full md:w-1/5 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Required Capacity
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              ref={capacityInputRef}
            />
          </div>
          <div className="w-full my-5 md:w-auto px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded">
            <button>Search</button>
          </div>
        </div>
      </form>

      <div className="flex flex-col mx-16 mb-24">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Lecture Hall
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Maximum Capacity
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Director's Permission Required
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Time Slot
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-3 py-3">
                      <span className="sr-only">Book</span>
                    </th>
                  </tr>
                </thead>
                {isLoading ? (
                  <div>Available Lecture halls will be displayed here.</div>
                ) : (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {available.map((lt) => (
                      <tr key={lt.lh_id}>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                LT-{lt.lh_id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {lt.max_capacity}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lt.special_permission_req ? "Yes" : "No"}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {fromTimeInputRef.current.value +
                            "-" +
                            toTimeInputRef.current.value}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span className="px-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Available
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-indigo-600 mx-6 hover:text-indigo-900"
                            onClick={() => bookingHandler(lt)}
                          >
                            Book
                          </a>
                        </td>
                      </tr>
                    ))}
                    {booked.map((lt) => (
                      <tr key={lt.lh_id}>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                LT-{lt.lh_id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {lt.max_capacity}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lt.special_permission_req ? "Yes" : "No"}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {fromTimeInputRef.current.value +
                            "-" +
                            toTimeInputRef.current.value}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span
                            className={
                              lt.booking_status === 1
                                ? "px-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                                : "px-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                            }
                          >
                            {lt.booking_status === 1 ? "Booked" : "Pending"}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <p className="text-indigo-300 mx-6 ">Book</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
