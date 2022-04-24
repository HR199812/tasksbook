import Head from "next/head";
const about = () => {
  return (
    <>
      <Head>
        <title>TasksManger.com - About</title>
        <meta name="About" content="initial-scale=1.0, width=device-width" />
        {/* <meta name="description" content="Generated by create next app" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-24 h-full">
        <div
          className="mx-6 my-3 flex flex-col bg-white rounded-lg border shadow-md md:flex-row md:max-w-11/12 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            className="object-cover w-full rounded-t-lg md:h-6/12 md:w-96 md:rounded-none md:rounded-l-lg"
            src="https://picsum.photos/600/400/?random"
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Tasks Manager
            </h5>
            <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Developed by: Hritwik Agarwal
            </h6>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              A mini project using NextJs, MongoDB Atlas, Express, NodeJs and Taiwind.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default about;
