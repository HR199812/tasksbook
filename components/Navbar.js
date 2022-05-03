import LINK from "next/link";
import styles from "../styles/Home.module.css";

const Navbar = () => {
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
            <LINK href="/login">
              <li>Sign In</li>
            </LINK>
            <LINK href="/">
              <li>Home</li>
            </LINK>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Navbar;
