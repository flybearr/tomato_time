import styles from "./styles/layout.module.scss";
import { Outlet, Link, useLocation } from "react-router-dom";
export default function Layout() {
  const { pathname } = useLocation();
  const menuLink = [
    { icon: "alarm", link: "/" },
    { icon: "menu", link: "/list" },
    { icon: "insights", link: "/analytics" },
    { icon: "library_music", link: "/ring" },
  ];
  return (
    <div className={styles.allPage}>
      <Outlet />
      <div className={styles.layoutBg}>
        <div className={styles.topArea}>
          {menuLink.map((v) => {
            return (
              <Link to={v.link} key={v.icon}>
                <span
                  className="material-icons"
                  style={pathname === v.link ? { color: "#ffb199" } : {}}
                >
                  {v.icon}
                </span>
              </Link>
            );
          })}
        </div>
        <div className={styles.bottomArea}>
          <p>PODOMORO</p>
        </div>
      </div>
    </div>
  );
}
