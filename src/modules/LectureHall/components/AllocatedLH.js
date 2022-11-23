import Lecturehall from "./Lecturehall";
import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import "./Lecturehall.css";

export default function AllocatedLH({ user }) {
  const [allocatedLH, setAllocatedLH] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function deleteHandler(id) {
    setAllocatedLH(allocatedLH.filter((lh) => lh.booking_id !== id));
    fetch(`https://lecture-hall-backend.herokuapp.com/allocation/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    setModalIsOpen(false);
  }

  function setModalHandler() {
    setModalIsOpen(false);
  }

  // Fetch allocated lecture halls of current user from server
  useEffect(() => fetchAllocatedLH(), []);

  const fetchAllocatedLH = () => {
    fetch(
      `https://lecture-hall-backend.herokuapp.com/lecturehall/allocated/${user[0].user_id}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllocatedLH(data);
      });
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading || !allocatedLH ? (
        <div>Fetching allocated lecture halls from server...</div>
      ) : (
        <div>
          <h1 className="py-5 mx-16">Lecture Halls Allocated to you:-</h1>
          <div className="flex flex-col mx-16">
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
                          Booking ID
                        </th>
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
                          Start Date and Time
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          End Date and Time
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
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allocatedLH.map((lh) => (
                        <tr key={lh}>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {lh.booking_id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              LT - {lh.lh_id}
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                            {lh.alloc_start}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                            {lh.alloc_end}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            {lh.booking_status == 1 ? (
                              <span className="px-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Booked
                              </span>
                            ) : (
                              <span className="px-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              className="text-indigo-600 mx-6 hover:text-indigo-900"
                              onClick={() => setModalIsOpen(true)}
                            >
                              Remove
                            </button>
                            {modalIsOpen && (
                              <Modal
                                onCancel={setModalHandler}
                                onConfirm={() => deleteHandler(lh.booking_id)}
                              />
                            )}
                            {modalIsOpen && (
                              <Backdrop onClick={setModalHandler} />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
