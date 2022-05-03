import LINK from "next/link";
import styles from "../styles/Home.module.css";
const LoggedInNavBar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.floatDivOne}>
          <LINK href="/">
            <p className={styles.logo}>TasksManager</p>
          </LINK>
        </div>
        <div className={styles.floatDivTwo}>
          <ul className="navbar-links">
            <LINK href="/User/logout">
              <li>Sign Out</li>
            </LINK>
          </ul>
        </div>
      </div>
    </>
  );
};
export default LoggedInNavBar;
