import { useTimeContext } from "../context/TimeContext";
import styles from "../styles/page/ring.module.scss";

export default function RingTone() {
  const {
    ringArray,
    ringArray2,
    selectWorkRing,
    setSelectWorkRing,
    selectBreakRing,
    setSelectBreakRing,
  } = useTimeContext();
  return (
    <div className={styles.ringPage}>
      <div className={styles.musicPlayer}>
        <i className="fa-solid fa-music"></i>
      </div>
      <div className={styles.title}>
        <span className="material-icons">library_music</span>
        <p>RING TONE</p>
      </div>
      <div className={styles.ringListWrap}>
        <div className={styles.workArea}>
          <h3 className={styles.listTitle}>WORK</h3>
          {ringArray.map((list) => {
            return (
              <div key={"List" + list.name} className={styles.everyList}>
                <div className={styles.radioGroup}>
                  <input
                    type="radio"
                    className={styles.radioInput}
                    id={list.name}
                    name={list.name}
                    checked={selectWorkRing === list.name}
                    value={list.name}
                    onChange={(e) => {
                      setSelectWorkRing(e.target.value);
                    }}
                  />
                  <label htmlFor={list.name} className={styles.radioLabel}>
                    <span className={styles.btn}></span>
                    <p> {list.name}</p>
                  </label>
                </div>
                <div className={styles.play}>
                  <span className="material-symbols-outlined">play_circle</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.breakArea}>
          <h3 className={styles.listTitle}>BREAK</h3>
          {ringArray2?.map((list) => {
            return (
              <div key={"List" + list.name} className={styles.everyList}>
                <div className={styles.radioGroup}>
                  <input
                    type="radio"
                    className={styles.radioInput}
                    id={list.name}
                    name={list.name}
                    checked={selectBreakRing === list.name}
                    value={list.name}
                    onChange={(e) => {
                      setSelectBreakRing(e.target.value);
                    }}
                  />
                  <label htmlFor={list.name} className={styles.radioLabel}>
                    <span className={styles.btn}></span>
                    <p> {list.name}</p>
                  </label>
                </div>
                <div className={styles.play}>
                  <span className="material-symbols-outlined">play_circle</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
