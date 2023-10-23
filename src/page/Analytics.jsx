import styles from "../styles/page/analytics.module.scss";
import { useCallback, useEffect, useState } from "react";
import { getNowWeek } from "../utils";
import { useTimeContext } from "../context/TimeContext";
import Chart from "react-apexcharts";
// import { useRef } from "react";
export default function Analytics() {
  const { allweekArray, doneList } = useTimeContext();
  const nowWeek = getNowWeek() - 1;
  const getNowDay = new Date().getDay();

  // const displayTitle =
  const [selectDate, setSelectDate] = useState(nowWeek);
  const nowWeekDone = doneList.filter((list) => {
    const startArray = allweekArray[selectDate].start;
    const endArray = allweekArray[selectDate].end;
    return startArray < list.createDate && list.createDate < endArray;
  });
  // .sort((a, b) => new Date(a.createDate) - new Date(b.createDate))
  // .map((v) => {
  //   const startArray = allweekArray[selectDate].start;
  //   const endArray = allweekArray[selectDate].end;
  //   (new Date(endArray) - new Date(startArray)) / (24 * 60 * 60 * 1000);
  //   return { date: [] };
  // });

  const countTingTimes = () => {
    const newObjTing = {};
    for (let i = 0; i < nowWeekDone.length; i++) {
      const date = nowWeekDone[i].createDate;
      if (!newObjTing[date]) {
        newObjTing[date] = 1;
      } else {
        newObjTing[date] += 1;
      }
    }
    return newObjTing;
  };

  const renderDate = () => {
    const startArray = allweekArray[selectDate].start;
    const chartObj = { date: [], doneTimes: [] };
    const doneTingObj = countTingTimes();
    for (let i = 0; i < 7; i++) {
      const startDate = new Date(startArray);
      startDate.setDate(startDate.getDate() + i);
      const dateFormat = startDate.toLocaleDateString();
      const dateTitle = dateFormat.split("/");
      chartObj.date.push(`${dateTitle[1]}${dateTitle[2]}`);
      if (doneTingObj[dateFormat]) {
        chartObj.doneTimes.push(doneTingObj[dateFormat]);
      } else {
        chartObj.doneTimes.push(0);
      }
    }
    return chartObj;
  };
  // const [renderDate(), setrenderDate()] = useState(renderDate());
  const sum = () => {
    const doneTimes = renderDate().doneTimes;
    return doneTimes.reduce((acc, cur) => cur + acc);
  };
  const state = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: renderDate().date,
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        name: "Done Thing",
        data: renderDate().doneTimes,
        color: "#FFB199",
      },
    ],
  };

  console.log(renderDate());
  // console.log(countTingTimes());
  // if () {
  // const newDateForm = list.createDate.split("/");

  // return { date: `${newDateForm[1]}${newDateForm[2]}` , times:  };
  // }
  const changeWeek = (type) => () => {
    if (type === "left") setSelectDate((prev) => prev - 1);
    if (type === "right") setSelectDate((prev) => prev + 1);
  };
  useEffect(() => {}, [selectDate]);
  return (
    <div className={styles.analyticsPage}>
      <div className={styles.analyticBG}>
        <span className="material-icons">insights</span>
      </div>
      <div className={styles.title}>
        <span className="material-icons">insights</span>
        <p>ANALYTICS</p>
      </div>
      <div className={styles.analyticsListWrap}>
        <div className={styles.workArea}>
          <h3 className={styles.listTitle}>TOMATO OF THIS WEEK</h3>
          <div className={styles.detailList}>
            <div className={styles.todayTimes}>
              <p className={styles.doneNumber}>
                {renderDate().doneTimes[getNowDay]}
              </p>
              <p className={styles.doneTitle}>TODAY</p>
            </div>
            <span className={styles.line}></span>
            <div className={styles.weekTimes}>
              <p className={styles.doneNumber}>{sum()}</p>
              <p className={styles.doneTitle}>
                {allweekArray[nowWeek].start + "-" + allweekArray[nowWeek].end}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.breakArea}>
          <div className={styles.listTitle}>
            <span
              className="material-symbols-outlined"
              onClick={changeWeek("left")}
            >
              arrow_back_ios
            </span>
            <h3>
              {allweekArray[selectDate].start +
                "-" +
                allweekArray[selectDate].end}
            </h3>
            <span
              className="material-symbols-outlined"
              onClick={changeWeek("right")}
            >
              arrow_forward_ios
            </span>
          </div>
          <div className={styles.chartList}>
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height="350px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
