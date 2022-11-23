import "./Lecturehall.css";

export default function Modal(props) {
  function cancelHandler() {
    props.onCancel();
  }
  function confirmHandler() {
    props.onConfirm();
  }
  return (
    <div className="modal">
      <p className=" text-xl font-bold ">Are you sure?</p>
      <p class="mx-6 p-5 text-sm text-gray-500">This process cannot be undone.</p>     
      <button className="mr-3 mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100" onClick={confirmHandler}>
        confirm
      </button>
      <button className="ml-3 mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600" onClick={cancelHandler}>
        cancel
      </button>
    </div>
  );
}