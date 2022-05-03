import Link from "next/link";
import styles from "../styles/Home.module.css";

const Footer = () => {
  return (
    <>
      <div
        className={`${styles.footer} sm:mt-16 md:mt-8 mt-4 mx-auto rounded-xl shadow-md md:max-w-full`}
        style={{ backgroundColor: "rgb(189, 195, 199)", color: "black" }}
      >
        <div className="w-full">
          <div className="text-center w-full flex flex-row ...">
            <div className="basis-1/2">
              <Link href="/">
                <a className="text-blue-500 hover:text-blue-700 underline ...">
                  Home
                </a>
              </Link>
            </div>
            <div className="basis-1/2">
              <Link href="/signin">
                <a className="text-blue-500 hover:text-blue-700 underline ...">
                  Sign In
                </a>
              </Link>
            </div>
          </div>
          <p className="mt-4 text-center">
            A custom theme for blogs using fullstack MERN tech Stack.
          </p>
          <br />
          <hr />
          <br />
          <div>
            <p className="text-center">
              &#169; Copyright 2022 | TasksManager.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
