import { createContext, useEffect, useState } from "react";
import { useContext, useRef } from "react";
import { getNowTime, getNowWeek, getYearWeeks } from "../utils";
const TimeContext = createContext({});
export default TimeContext;

const allweekArray = getYearWeeks();

console.log(getYearWeeks());
// eslint-disable-next-line react/prop-types
export const TimeContextProvider = function ({ children }) {
  const workRef = useRef(null);
  const breakRef = useRef(null);
  const initTime = [
    {
      id: 1,
      title: "AAAA",
      workMin: 0,
      workSec: 3,
      breakMin: 0,
      breakSec: 3,
      createDate: "2023/10/17",
    },
    {
      id: 2,
      title: "BBBB",
      workMin: 25,
      workSec: 0,
      breakMin: 5,
      breakSec: 0,
      createDate: "2023/10/12",
    },
    {
      id: 3,
      title: "CCCC",
      workMin: 25,
      workSec: 0,
      breakMin: 5,
      breakSec: 0,
      createDate: "2023/10/17",
    },
    {
      id: 4,
      title: "DDDD",
      workMin: 25,
      workSec: 0,
      breakMin: 5,
      breakSec: 0,
      createDate: "2023/10/14",
    },
    {
      id: 5,
      title: "EEEE",
      workMin: 25,
      workSec: 0,
      breakMin: 5,
      breakSec: 0,
      createDate: "2023/10/17",
    },
  ];
  const [timer, setTimer] = useState(initTime);
  const [doneList, setDoneList] = useState([
    {
      id: 6,
      title: "AAACCCC",
      workMin: 0,
      workSec: 0,
      breakMin: 0,
      breakSec: 0,
      createDate: "2023/10/18",
    },
    {
      id: 11,
      title: "AAACCCC",
      workMin: 0,
      workSec: 0,
      breakMin: 0,
      breakSec: 0,
      createDate: "2023/10/17",
    },
    {
      id: 12,
      title: "AAACCCC",
      workMin: 0,
      workSec: 0,
      breakMin: 0,
      breakSec: 0,
      createDate: "2023/10/16",
    },
    {
      id: 15,
      title: "AAACCCC",
      workMin: 0,
      workSec: 0,
      breakMin: 0,
      breakSec: 0,
      createDate: "2023/10/16",
    },
    {
      id: 19,
      title: "AAACCCC",
      workMin: 0,
      workSec: 0,
      breakMin: 0,
      breakSec: 0,
      createDate: "2023/10/16",
    },
    {
      id: 22,
      title: "AAACCCC",
      workMin: 0,
      workSec: 0,
      breakMin: 0,
      breakSec: 0,
      createDate: "2023/10/20",
    },
  ]);
  const [selectCounter, setSelectCounter] = useState(1);
  const [startCount, setStartCount] = useState({
    workTimer: false,
    breakTimer: false,
  });
  const ringArray = [
    { name: "Ring1", src: "/audio/ShortGuitarClip.mp3" },
    { name: "Ring2", src: "/audio/SourTennessee.mp3" },
  ];
  const ringArray2 = [
    { name: "Ring3", src: "/audio/ShortGuitarClip.mp3" },
    { name: "Ring4", src: "/audio/SourTennessee.mp3" },
  ];
  const [selectWorkRing, setSelectWorkRing] = useState("Ring1");
  const [selectBreakRing, setSelectBreakRing] = useState("Ring4");
  const workRingSrc = ringArray.find((v) => v.name === selectWorkRing).src;
  const breakRingSrc = ringArray2.find((v) => v.name === selectBreakRing).src;
  const finder = timer.find((v) => v.id === selectCounter);
  const isWorkTime = finder?.workMin || finder?.workSec;
  const displayTime_Min = isWorkTime ? finder?.workMin : finder?.breakMin || 0;
  const displayTime_Sec = isWorkTime ? finder?.workSec : finder?.breakSec || 0;

  // console.log(getTime() > "2023/10/11");
  console.log(getNowWeek());
  //新增時鐘及事項
  const AddFn = (addThing) => {
    setTimer((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: addThing,
        workMin: 25,
        workSec: 0,
        breakMin: 5,
        breakSec: 0,
        createDate: getNowTime(),
      },
    ]);
  };
  //刪除時鐘及事項
  const DelectFn = () => {
    setTimer((prev) =>
      prev.filter((timerList) => timerList.id !== selectCounter)
    );
  };
  //開始or暫停FN
  const BtnFn =
    (actionType, list = null) =>
    () => {
      const newStartCount = { ...startCount };
      switch (actionType) {
        case "switch":
          if (isWorkTime) {
            if (newStartCount.workTimer) {
              newStartCount.workTimer = false;
            } else {
              newStartCount.workTimer = true;
            }
          } else {
            if (newStartCount.breakTimer) {
              newStartCount.breakTimer = false;
            } else {
              newStartCount.breakTimer = true;
            }
          }
          break;
        default:
          if (isWorkTime) {
            newStartCount.workTimer = actionType;
          } else {
            newStartCount.breakTimer = actionType;
          }
          setSelectCounter(list.id);
          break;
      }
      setStartCount(newStartCount);
    };
  //重整時間FN
  function Refresh() {
    const newStartCount = { workTimer: false, breakTimer: false };
    // reset時需要的OBJ
    const updateObj = {
      id: finder.id,
      title: finder.title,
      workMin: 25,
      workSec: 0,
      breakMin: 5,
      breakSec: 0,
      createDate: finder.createDate,
    };
    if (finder.workMin === 0 && finder.workSec === 0) {
      //如果現在是休息時間按下 refresh
      updateObj.workMin = 0;
    }
    setStartCount(newStartCount);
    setTimer((prev) =>
      prev.map((timerObj) =>
        timerObj.id === selectCounter ? updateObj : timerObj
      )
    );
  }
  // 根據 startCount(工作or休息狀態)、selectCounter(目前指定的事項是誰) ，驅動時鐘的邏輯
  useEffect(() => {
    let timerInterval;
    const findTimer = timer.find((timerObj) => timerObj.id === selectCounter);

    if (startCount.workTimer || startCount.breakTimer) {
      timerInterval = setInterval(() => {
        if (startCount.workTimer) {
          if (findTimer.workSec === 0) {
            if (findTimer.workMin === 0) {
              workRef.current.play();
              console.log("設定workTimer = flase");
              const newStartCount = { ...startCount };
              newStartCount.workTimer = false;
              newStartCount.breakTimerTimer = true;
              setStartCount(newStartCount);
              return clearInterval(timerInterval);
            } else {
              findTimer.workMin -= 1;
              findTimer.workSec = 59;
            }
          } else {
            findTimer.workSec -= 1;
          }
        }
        if (startCount.breakTimer) {
          if (findTimer.breakSec === 0) {
            if (findTimer.breakMin === 0) {
              breakRef.current.play();
              console.log("設定breakTimer = flase");
              const newStartCount = { ...startCount };
              newStartCount.breakTimer = false;
              setStartCount(newStartCount);
              return clearInterval(timerInterval);
            } else {
              findTimer.breakMin -= 1;
              findTimer.breakSec = 59;
            }
          } else {
            findTimer.breakSec -= 1;
          }
        }

        const filterSelfTimer = timer.filter(
          (timerObj) => timerObj.id !== selectCounter
        );
        const sortTimer = [...filterSelfTimer, findTimer].sort(
          (a, b) => a.id - b.id
        );
        if (
          findTimer.workMin === 0 &&
          findTimer.workSec === 0 &&
          findTimer.breakMin === 0 &&
          findTimer.breakSec === 0
        ) {
          const newDoneList = [...doneList, findTimer];
          setDoneList(newDoneList);
          setTimer(filterSelfTimer);
          setTimeout(() => {
            setSelectCounter(filterSelfTimer[0].id);
          }, 4000);
        } else {
          setTimer(sortTimer);
        }
      }, 1000);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [selectCounter, startCount]);
  useEffect(() => {
    if (finder === undefined) {
      console.log("更改 指標");
      setSelectCounter(timer[0].id);
    }
  }, [timer]);
  return (
    <TimeContext.Provider
      value={{
        timer,
        setTimer,
        selectCounter,
        setSelectCounter,
        startCount,
        setStartCount,
        doneList,
        ringArray,
        ringArray2,
        selectWorkRing,
        setSelectWorkRing,
        selectBreakRing,
        setSelectBreakRing,
        DelectFn,
        BtnFn,
        AddFn,
        Refresh,
        isWorkTime,
        displayTime_Min,
        displayTime_Sec,
        finder,
        allweekArray,
      }}
    >
      <audio src={workRingSrc} ref={workRef}></audio>
      <audio src={breakRingSrc} ref={breakRef}></audio>
      {children}
    </TimeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTimeContext = () => {
  return useContext(TimeContext);
};
