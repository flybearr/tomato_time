import { useRef, useState, useEffect } from "react";
import styles from "../styles/components/circle.module.scss";

// eslint-disable-next-line react/prop-types
const CircleProgressBar = ({ percentage, min, sec }) => {
  const svgRef = useRef(null);
  const [centerPoint, setCenterPoint] = useState(0);
  const r = 175;
  const gap = 10;
  const circumference = 2 * Math.PI * r; //圓周計算
  // 計算偏移量

  const offset = (1 - percentage / 100) * circumference;
  useEffect(() => {
    if (svgRef) {
      const newCenterPoint = svgRef.current.clientWidth / 2;
      setCenterPoint(newCenterPoint);
    }
  }, []);
  return (
    <div className={styles.circleProgressBar}>
      <svg viewBox="0 0 400 400" ref={svgRef}>
        <circle
          className={styles.circleBackground}
          cx={centerPoint}
          cy={centerPoint}
          r={r + gap}
        />
        <circle
          className={styles.circleProgress}
          cx={centerPoint}
          cy={centerPoint}
          r={r}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: -offset,
          }}
        />

        <circle
          className={styles.circleBackgroundSmall}
          cx={centerPoint}
          cy={centerPoint}
          r={r - gap}
        />
      </svg>
      <p className={styles.min}>{min}</p>
      <p className={styles.sec}>{sec}</p>
    </div>
  );
};

export default CircleProgressBar;
