import LINK from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

const errorPage = () => {
  const router = useRouter();

  const GoToHome = () => {
    router.push("/");
  };

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  return (
    <>
      <Head>
        <title>TasksManger.com - 404</title>
        <meta name="404" content="initial-scale=1.0, width=device-width" />
        {/* <meta name="description" content="Generated by create next app" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.error}>
        <div className={styles.errorMessage}>
          <h1>404</h1>
          <h2>We are sorry, Page not found!</h2>
          <p>
            The page you're looking for might have been removed or had it's name
            changed.
          </p>
          <p>
            <a onClick={GoToHome}>Back to Home</a>
            {/* <LINK href="/">
              <a>Back to Home</a>
            </LINK> */}
          </p>
        </div>
      </div>
    </>
  );
};

export default errorPage;
