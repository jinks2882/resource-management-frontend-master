import React, { useEffect, useState } from "react";

function UpdateLH() {
  const [lh, setLH] = useState([]);

  const fetchServerData = async () => {
    fetch(`https://lecture-hall-backend.herokuapp.com/lecturehall/all`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLH(data);
      });
  };

  const deleteLH = async (user_id) => {
    const id = user_id.toString();
    fetch(`https://lecture-hall-backend.herokuapp.com/lecturehall/` + id, {
      method: "DELETE",
    }).then((response) => console.log(response));
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
                      Director Permission Required
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
                  {lh.map((lh, i) => (
                    <tr key={i}>
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
                              {lh.max_capacity}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {lh.special_permission_req}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              <button
                                className="text-red-600 mx-6 hover:text-red-900"
                                onClick={() => deleteLH(lh.lh_id)}
                              >
                                Remove
                              </button>
                              <button
                                className="text-indigo-600 mx-6 hover:text-indigo-900"
                                //  onClick={() => setModalIsOpen(true)}
                              >
                                Update
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

export default UpdateLH;
