import React from 'react';
import { useHistory } from "react-router-dom";


export default function Profile() {


  const history = useHistory();
  const handleRoute = () =>{ 
    history.push("/UpdateEmail");
  }
  
  return (
    <div className="w-1/3 m-auto p-2">
      <button
        className="w-full bg-blue-500 rounded p-3 m-3"
        onClick= {handleRoute}>
        Update Email
      </button>
      <button
        className="w-full bg-blue-500 rounded p-3 m-3"
        onClick={() => {
          // Update password
        }}
      >
        Update Password
      </button>
      <button
        className="w-full bg-blue-500 rounded p-3 m-3"
        onClick={() => {
          // Update mobile number
        }}
      >
        Update Mobile Number
      </button>
      <button
        className="w-full bg-red-500 rounded p-3 m-3"
        onClick={() => {
          // Delete Account
        }}
      >
        Delete Account
      </button>
    </div>
  );
}