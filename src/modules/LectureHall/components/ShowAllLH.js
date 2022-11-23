import { useState, useEffect } from "react";

export default function ShowAllLH() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchServerData = async () => {
    fetch(`https://lecture-hall-backend.herokuapp.com/lecturehall/all`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setData(data));
    setIsLoading(false);
  };

  useEffect(() => fetchServerData(), []);

  return (
    <div>
      {isLoading || !data ? (
        <div>Fetching lecture halls data from server...</div>
      ) : (
        <div className="my-14">
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
                          Director's Permission Required
                        </th>

                        <th scope="col" className="relative px-3 py-3">
                          <span className="sr-only">Book</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.map((lt) => (
                        <tr key={lt}>
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
