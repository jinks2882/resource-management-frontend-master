import { useRef } from "react";
export default function UpdateEmail(){
    const oldemailInputRef = useRef();
    const newemailInputRef = useRef();
    const confemailInputRef = useRef();
    const handleEmail = async (e) => {
        e.preventDefault();
        /*fetch("http://localhost:5000/lecturehall/profile/searchemail", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: oldemailInputRef.current.value,
          }),
        }).then((response) => {
            response.json()
        })
          .then((data) => {
          console.log(data);
        });*/
        if(newemailInputRef.current.value===confemailInputRef.current.value){
        fetch("http://localhost:5000/lecturehall/profile/updateemail", {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldemail: oldemailInputRef.current.value,
            newemail: newemailInputRef.current.value,
          }),
        })
          .then((data) => {
            console.log(data);
            if (data.status===200) {
               alert("Successfully updated");
              }
            else{
                alert("Email id not found");
            }
              
        });
      }
      else{
        alert("Confirm email and new email are not same");
    }
    };
      
      return(
        <div className="w-full max-w-xs m-auto mt-64">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Old Email id
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="oldE"
              type="email"
              placeholder="email"
              ref={oldemailInputRef}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Email Id
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newE"
              type="email"
              placeholder="email"
              ref={newemailInputRef}
            />
            <p className="text-red-500 text-xs italic">
              Please enter new email.
            </p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm new Email Id
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmE"
              type="email"
              placeholder="email"
              ref={confemailInputRef}
            />
            <p className="text-red-500 text-xs italic">
              Please confirm new email id.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleEmail}
            >
              Change Email
            </button>
          </div>
        </form>
      </div>
      );
      
}
