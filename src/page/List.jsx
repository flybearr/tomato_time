import styles from "../styles/page/list.module.scss";
import { useState } from "react";
import { useTimeContext } from "../context/TimeContext";
export default function List() {
  const {
    timer,
    selectCounter,
    startCount,
    doneList,
    BtnFn,
    AddFn,
    isWorkTime,
    displayTime_Min,
  } = useTimeContext();
  const [inputText, setIntput] = useState("");
  const inputFn = (e) => {
    setIntput(e.target.value);
  };
  const pressEnter = (e) => {
    if (e.key === "Enter")
      if (inputText) {
        AddFn(inputText);
        setIntput("");
      }
  };
  return (
    <div className={styles.listPage}>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <div className={styles.ListBanner}>
            <span className="material-icons">menu</span>
            <p>TO DO LIST</p>
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              placeholder="+Add a New Misson"
              className={styles.addMisson}
              value={inputText}
              onChange={inputFn}
              onKeyDown={pressEnter}
            ></input>
            <div className={styles.timeIconGroup}>
              {Array(timer?.length)
                .fill(1)
                .map((v, i) => {
                  return (
                    <span
                      className="material-symbols-outlined"
                      key={"timeIconGroup" + i}
                    >
                      schedule
                    </span>
                  );
                })}
            </div>
          </div>
          <div className={styles.todolistWrap}>
            <div className={styles.todoArea}>
              <h3 className={styles.listTitle}>TO-DO</h3>
              {timer?.map((list) => {
                return (
                  <div key={"List" + list.id} className={styles.everyList}>
                    <div className={styles.circle}>
                      {list.workMin === 0 && list.workSec === 0 ? (
                        <span className="material-symbols-outlined">done</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className={styles.control}>
                      {list.id === selectCounter &&
                      (startCount.workTimer || startCount.breakTimer) ? (
                        <span
                          className="material-symbols-outlined"
                          style={{ color: "#C1DFC4" }}
                          onClick={BtnFn(false, list)}
                        >
                          pause_circle
                        </span>
                      ) : (
                        <span
                          className="material-symbols-outlined"
                          onClick={BtnFn(true, list)}
                        >
                          play_circle
                        </span>
                      )}
                    </div>
                    <div className={styles.descriptionWrap}>
                      <p>{list.title}</p>
                      <div className={styles.tail}>
                        <span className="material-symbols-outlined">
                          schedule
                        </span>
                        <span>{list.workMin}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.doneArea}>
              <h3 className={styles.listTitle}>Done</h3>
              {doneList?.map((list) => {
                return (
                  <div key={"List" + list?.id} className={styles.everyList}>
                    <div className={styles.circle}>
                      {list?.workMin === 0 && list?.workSec === 0 ? (
                        <span className="material-symbols-outlined">done</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <span
                      className="material-symbols-outlined"
                      style={{ display: "none" }}
                    >
                      pause_circle
                    </span>
                    <span className={styles.doneText}>{list?.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div
            className={`${styles.timeBox} ${
              isWorkTime ? styles.work : styles.break
            }`}
          >
            <p>{displayTime_Min}</p>
            <span
              className="material-symbols-outlined"
              onClick={BtnFn("switch")}
            >
              {startCount.workTimer || startCount.breakTimer
                ? "pause_circle"
                : "play_circle"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
