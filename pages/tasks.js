import Head from "next/head";
import React, { useState, useEffect } from "react";
import TasksRibbon from "../components/TasksRibbon";
import ShowTask from "../components/ShowTask";
import axios from "axios";
import requireAuthentication from "./middleware/requireAuthentication";
import LoggedInNavBar from "../components/LoggedInNavBar";

const tasks = (props) => {
  const id = props.id;

  //   State Variable to be passed to child components
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [filter, setFilter] = useState("");
  let [searchedTasks, setSearchedTasks] = useState("");
  let [shouldRecallApi, setShouldRecallApi] = useState(false);

  //   State Variables for current Component
  let [tasks, setTasks] = useState([]);
  let [filteredTasks, setFilteredTasks] = useState([]);

  let [taskInfo, setTaskInfo] = useState([]);

  function handleChange(newValue) {
    setShowTaskModal(newValue);
  }

  function carDataAndShow(show, taskData) {
    setShowTaskModal(show);
    setTaskInfo(taskData);
  }

  async function getAllTasksForCurrentUser() {
    try {
      let taskData = await axios.get(
        `http://localhost:3000/Task/getAllTasksForUser/${id}`
      );
      setTasks(taskData.data);
      setFilteredTasks(taskData.data);
      setShouldRecallApi(false);
    } catch (err) {
      console.log(err);
    }
  }

  function filterTaskCards() {

    axios.get('http://localhost:3000/Task/getFilteredTasksForUser',{
      params:{
        filter: filter,
        authorId: id
      }
    }).then((response)=>{
      console.log(response);
      setFilteredTasks(response.data);
    }).catch((err)=>console.log(err));
    // setFilteredTasks(tasks);
    // if (filter != "Select Filter") {
    //   let filteredData = tasks.filter((task) => {
    //     if (task.category == filter) return task;
    //   });
    //   setFilteredTasks(filteredData);
    // }
  }
  function filterSearchTaskCards() {
    setFilteredTasks(tasks);
    if (searchedTasks != "") {
      let filteredData = tasks.filter((task) => {
        if (
          task.category.includes(searchedTasks) ||
          task.body.includes(searchedTasks) ||
          task.title.includes(searchedTasks)
        )
          return task;
      });
      setFilteredTasks(filteredData);
    }
  }

  //   UseEffect for All Tasks of the logged in user
  useEffect(() => {
    getAllTasksForCurrentUser();
  }, []);

  //   UseEffect for filter Values
  useEffect(() => {
    filterTaskCards();
  }, [filter]);
  //   UseEffect for searched Values
  useEffect(() => {
    filterSearchTaskCards();
  }, [searchedTasks]);
  //   UseEffect for searched Values
  useEffect(() => {
    getAllTasksForCurrentUser();
  }, [shouldRecallApi]);
  return (
    <>
      <Head>
        <title>Tasks</title>
        <meta name="Tasks" content="initial-scale=1.0, width=device-width" />
        {/* <meta name="description" content="Generated by create next app" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoggedInNavBar />
      <div className="container my-12 mx-auto px-4 md:px-12">
        <TasksRibbon
          userId={id}
          passFilterState={setFilter}
          passSearchState={setSearchedTasks}
          passApiCall={setShouldRecallApi}
        />
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {/* <!-- Column --> */}
          {filteredTasks.map((task, index) => {
            return (
              <div
                className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-3/12"
                key={index}
              >
                {/* <!-- Article --> */}
                <article
                  onClick={() => carDataAndShow(true, task)}
                  className="overflow-hidden cursor-pointer rounded-lg shadow-lg"
                >
                  <a>
                    <img
                      alt="Placeholder"
                      className="block h-auto w-full"
                      src="https://picsum.photos/600/400/?random"
                    />
                  </a>

                  <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 className="text-lg">
                      <a
                        className="no-underline hover:underline text-black"
                        href="#"
                      >
                        {task.title}
                      </a>
                    </h1>
                    {/* <p className="text-grey-darker text-sm">{task.createdAt.getMonth()}/{task.createdAt.getDate()}/{task.createdAt.getFullYear()}</p> */}
                    <p className="text-grey-darker text-sm">
                      {task.createdAt.split("T")[0]}
                    </p>
                  </header>
                  <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                    <p className="text-grey-darker text-sm overflow-hidden">
                      {task.body}
                    </p>
                  </footer>
                </article>
                {/* <!-- END Article --> */}
              </div>
            );
          })}

          {/* <!-- END Column --> */}
        </div>
      </div>
      {showTaskModal ? (
        <ShowTask
          value={setShowTaskModal}
          taskData={taskInfo}
          apiCall={setShouldRecallApi}
          onChange={handleChange}
        />
      ) : null}
    </>
  );
};

export const getServerSideProps = requireAuthentication((context) => {
  const { req } = context;
  // console.log("req.session in getserverside props ******", req.session.user);
  return {
    props: {
      id: req.session.user._id,
    },
  };
});
export default tasks;
