import { useRef } from "react";
import { CSVReader } from "react-papaparse";
import { useHistory } from "react-router-dom";

export default function AdminDashboard() {
  const buttonRef = useRef();
  const parsedData = useRef();
  const history = useHistory();

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = (data) => {
    console.log("On file load", data);
    parsedData.current = data;
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("On file remove", data);
    parsedData.current = null;
  };

  const handleRemoveFile = (e) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  const handleSubmit = (e) => {
    console.log("Submitted");
    fetch("https://lecture-hall-backend.herokuapp.com/admin/timetable", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedData.current),
    }).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="w-1/3 m-auto p-2">
      Upload Time Table (CSV)
      <CSVReader
        ref={buttonRef}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        noClick
        noDrag
        onRemoveFile={handleOnRemoveFile}
      >
        {({ file }) => (
          <aside
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <button
              type="button"
              onClick={handleOpenDialog}
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                width: "40%",
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              Browse file
            </button>
            <div
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#ccc",
                height: 45,
                lineHeight: 2.5,
                marginTop: 5,
                marginBottom: 5,
                paddingLeft: 13,
                paddingTop: 3,
                width: "60%",
              }}
            >
              {file && file.name}
            </div>
            <button
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 20,
                paddingRight: 20,
              }}
              onClick={handleRemoveFile}
            >
              Remove
            </button>
            <button
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 20,
                paddingRight: 20,
              }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </aside>
        )}
      </CSVReader>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3"
        onClick={(e) => {
          e.preventDefault();
          history.push("/lecturehall/admin/delete-user");
        }}
      >
        Show and Delete User Accounts
      </button>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3"
        onClick={(e) => {
          e.preventDefault();
          history.push("/lecturehall/admin/update-lh");
        }}
      >
        Show and Delete Lecture Halls
      </button>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3"
        onClick={(e) => {
          e.preventDefault();
          history.push("/lecturehall/admin/pendingalloc");
        }}
      >
        Pending Allocation Requests
      </button>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3"
        onClick={() => {
          console.log("4");
        }}
      >
        See Bookings
      </button>
    </div>
  );
}
