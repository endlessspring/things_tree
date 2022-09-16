import { Progress } from "antd";
import React from "react";

type Props = {
  progress?: number | null;
  size?: number | null;
};

const TTProgress: React.FC<Props> = ({ progress, size }) => {
  return (
    <Progress
      type="circle"
      percent={progress || 0}
      width={size || 15}
      size={"default"}
      strokeLinecap={"round"}
      strokeColor={"#1890ff"}
      trailColor={"lightgray"}
      showInfo={false}
      strokeWidth={15}
    />
  );
};

export default TTProgress