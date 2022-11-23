import { useHistory } from "react-router-dom";
import { useRef } from "react";

export default function Login({ setIsLoggedIn, setIsAdmin, setUser }) {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const nameInputRef = useRef();
  const designationInputRef = useRef();
  const mobile_noInputRef = useRef();

  const history = useHistory();

  const handleSignUp = async (e) => {
    e.preventDefault();
    fetch("https://lecture-hall-backend.herokuapp.com/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInputRef.current.value,
        password: passInputRef.current.value,
        name: nameInputRef.current.value,
        designation: designationInputRef.current.value,
        mobile_no: mobile_noInputRef.current.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data[0].designation === "admin") {
          setIsLoggedIn(true);
          setIsAdmin(true);
        } else {
          setIsLoggedIn(true);
          setIsAdmin(false);
        }
        setUser(data);
      });
  };

  return (
    <div className="w-full max-w-sm m-auto mt-32">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSignUp}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="email"
            ref={emailInputRef}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            ref={passInputRef}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Bob"
            ref={emailInputRef}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Designation
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="designation"
            type="text"
            placeholder="Professor"
            ref={emailInputRef}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mobile No.
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mobile_no"
            type="text"
            placeholder="987654321"
            ref={emailInputRef}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-3 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
