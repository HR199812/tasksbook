import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import download from "downloadjs";

toast.configure();
const CreateTask = (props) => {
  const [task, setTask] = useState({
    id: `${props.taskData._id}`,
    title: `${props.taskData.title}`,
    category: `${props.taskData.category}`,
    body: `${props.taskData.body}`,
  });

  const [file, setFile] = useState();

  function handleChange(val) {
    props.onChange(val);
  }

  async function getFileForTheTask() {
    try {
      await axios
        .get(`http://localhost:3000/Task/getFileForTask/${props.taskData._id}`)
        .then((res) => {
          setFile(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }
  async function UpdateTask(val) {
    try {
      await axios
        .put(`http://localhost:3000/Task/updateTaskForUser`, task)
        .then((res) => {
          if (res.status == 200) {
            toast.success(res.data.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            props.apiCall(val);
            handleChange(false);
          } else {
            toast.error(res.data.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const inputEvent = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setTask((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  const downloadFile = () => {
    download(file, `attatchment.zip`);
  };

  useEffect(() => {
    getFileForTheTask();
  }, []);

  useEffect(() => {
    const handleKeyEvent = (event) => {
      if (event.keyCode === 27) {
        handleChange(false);
      }
      if (event.keyCode === 13) {
        UpdateTask(true);
      }
    };
    window.addEventListener("keydown", handleKeyEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
    };
  }, []);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl w-full text-center font-semibold">
                {props.taskData.title}
              </h3>
              <button
                className="p-1 bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => handleChange(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Title"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="Title"
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={task.title}
                  onChange={inputEvent}
                />
              </div>
              <div className="flex items-center flex-row ...">
                <div className="mb-4 mr-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Files"
                  >
                    Attachments(if any)
                  </label>
                  {file ? (
                    <button
                      onClick={downloadFile}
                      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                      <svg
                        class="fill-current w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                      </svg>
                      <span>Download</span>
                    </button>
                  ) : null}
                </div>
                <div className="mb-4 float-right">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Category"
                  >
                    Select Category
                  </label>
                  <select
                    name="category"
                    value={task.category}
                    onChange={inputEvent}
                    className="block appearance-none text-white w-full bg-blue-500 hover:bg-blue-700 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option>Select Filter</option>
                    <option>Client Visit</option>
                    <option>Sprint Review</option>
                    <option>Team Meeting</option>
                    <option>Developers Daily Meet</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Body"
                >
                  Body
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="Body"
                  name="body"
                  value={task.body}
                  onChange={inputEvent}
                ></textarea>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleChange(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => UpdateTask(true)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
export default CreateTask;
