import { useId } from "react";
import styles from "./donutChart.module.css";

const RADIUS = 100 / (2 * Math.PI);

export function Segment({
  percent,
  dashOffset,
  title,
  desc,
  strokeWidth,
  strokeColor,
}: {
  percent: number;
  dashOffset: number;
  title: string;
  desc?: string;
  strokeColor: string;
  strokeWidth: number;
}) {
  const segmentId = useId();
  const segmentTitleId = `${segmentId}-title`;
  const segmentDescId = `${segmentId}-desc`;

  const dashArray = `${percent} ${100 - percent}`;
  return (
    <circle
      className="donut-segment"
      cx="50%"
      cy="50%"
      r={RADIUS}
      fill="transparent"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeDasharray={dashArray}
      strokeDashoffset={dashOffset}
      aria-labelledby={`${segmentTitleId} ${desc && segmentDescId}`}
    >
      <title id={segmentTitleId}>{title}</title>
      {desc && <desc id={segmentDescId}>{desc}</desc>}
    </circle>
  );
}

export type DonutData = {
  percent: number;
  color: string;
  title: string;
  desc?: string;
};

export default function DonutChart<T extends object = object>({
  className = "",
  heading,
  subHeading,
  data,
  renderCaption,
}: {
  heading: string;
  subHeading: string;
  className?: string;
  data: DonutData[];
  renderCaption: () => React.ReactNode;
}) {
  const dataWithOffset: (DonutData & { dashOffset: number })[] = [];

  for (let i = 0; i < data.length; i++) {
    const dashOffset =
      i === 0 ? 25 : dataWithOffset[i - 1].dashOffset + data[i].percent;
    dataWithOffset.push({ ...data[i], dashOffset });
  }

  return (
    <figure className={`${styles.donutChart} ${className}`}>
      <div className={styles.chart}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 42 42"
          aria-labelledby="donut-title donut-description"
        >
          <title id="donut-title">Budget Chart</title>
          <desc id="donut-description">Distribution of Different Budgets</desc>
          <circle
            className="ring"
            cx="50%"
            cy="50%"
            r={RADIUS}
            strokeWidth="7"
            stroke="var(--color-gray-lighter, lightgray)"
            fill="transparent"
            role="presentation"
          ></circle>
          {dataWithOffset.map((data) => (
            <Segment
              key={data.title}
              {...data}
              strokeColor={data.color}
              strokeWidth={7}
            />
          ))}
          <circle
            className="overlay"
            cx="50%"
            cy="50%"
            r={RADIUS - 0.9}
            fill="var(--color-gray-white, white)"
            opacity={0.25}
            role="presentation"
          ></circle>
          <g className={styles.chartText}>
            <text
              x="50%"
              y="50%"
              className="text-[5px] font-bold fill-gray-darker"
            >
              {heading}
            </text>
            <text
              x="50%"
              y="50%"
              className="text-[2px] fill-gray translate-y-[9%]"
            >
              {subHeading}
            </text>
          </g>
        </svg>
      </div>
      <figcaption>{renderCaption()}</figcaption>
    </figure>
  );
}
