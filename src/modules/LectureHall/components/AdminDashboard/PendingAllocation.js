import React, { useEffect, useState } from "react";

function PendingAllocation() {
  const [alloc, setAlloc] = useState([]);

  const fetchServerData = async () => {
    fetch(`https://lecture-hall-backend.herokuapp.com/admin/pending`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlloc(data);
      });
  };

  const handleApprove = (booking_id) => {
    fetch(
      `https://lecture-hall-backend.herokuapp.com/admin/approve/${booking_id}`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchServerData();
      });
  };

  useEffect(() => fetchServerData(), []);

  return (
    <div>
      <h1 className="py-5 mx-16">All Lecture Halls</h1>
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
                      User ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {alloc.map((lh, i) => (
                    <tr key={i}>
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
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {lh.lh_id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {lh.user_id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              <button
                                className="text-green-600 mx-6 hover:text-green-900"
                                onClick={() => handleApprove(lh.booking_id)}
                              >
                                Approve
                              </button>
                            </div>
                          </div>
                        </div>
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
  );
}

export default PendingAllocation;
