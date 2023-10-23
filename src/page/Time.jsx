import { useEffect, useState } from "react";
import { useTimeContext } from "../context/TimeContext";
import styles from "../styles/page/time.module.scss";
import CircleProgressBar from "../components/circle";
export default function Time() {
  const {
    selectCounter,
    timer,
    isWorkTime,
    displayTime_Min,
    displayTime_Sec,
    finder,
    startCount,
    BtnFn,
    Refresh,
    DelectFn,
  } = useTimeContext();
  const [deg, setDeg] = useState(0);
  const displayDom = isWorkTime ? (
    <>
      <p>{finder?.title}</p>
      <div className={styles.thingBallWrap}>
        {timer.map((v) => {
          return (
            <div
              className={styles.thingBall}
              key={"thing" + v.id}
              style={
                selectCounter === v.id
                  ? { background: "transparent" }
                  : { background: "white" }
              }
            ></div>
          );
        })}
      </div>
    </>
  ) : (
    <p>Break Time</p>
  );
  useEffect(() => {
    const leftTime = displayTime_Min * 60 + displayTime_Sec;
    let newDeg = 0;

    if (isWorkTime) {
      newDeg = ((leftTime / 1500) * 100).toFixed(0);
    } else {
      newDeg = ((leftTime / 300) * 100).toFixed(0);
    }
    setDeg(newDeg);
  }, [timer, displayTime_Min, displayTime_Sec, isWorkTime]);
  return (
    <div
      className={`${styles.timePage} ${
        isWorkTime ? styles.work : styles.break
      }`}
    >
      <div className={styles.left}>{displayDom}</div>
      <div className={styles.right}>
        <CircleProgressBar
          percentage={deg}
          min={displayTime_Min}
          sec={displayTime_Sec}
        />

        <div className={styles.toolBar}>
          <div className={styles.close} onClick={DelectFn}>
            <span className="material-symbols-outlined">close</span>
          </div>
          <div className={styles.pause} onClick={BtnFn("switch")}>
            <span className="material-symbols-outlined">
              {startCount.workTimer || startCount.breakTimer
                ? "pause"
                : "play_arrow"}
            </span>
          </div>
          <div className={styles.refresh} onClick={Refresh}>
            <span className="material-symbols-outlined">refresh</span>
          </div>
        </div>
      </div>
    </div>
  );
}
