/**
 * Component for displaying a terminal + text
 **/

import React from "react";

export const TrafficLights = ({ style }: { style?: React.CSSProperties }) => (
  <div className="Traffic-Lights" style={style}>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
  </div>
);

export const Terminal = ({ prompts }: { prompts: string[] }) => (
  <div className="Terminal">
    <TrafficLights />
    <div className="Terminal-inner">
      {prompts.map((p) => (
        <div key={p} className="Terminal-text">
          {p}
        </div>
      ))}
    </div>
  </div>
);

export const UrlBar = ({
  prompts,
}: {
  prompts: React.ReactElement<{ className?: string }>[];
}) => (
  <div className="Browser">
    <TrafficLights />
    <div className="url-bar mx2">
      {prompts.map((p, index) =>
        React.cloneElement(p, { key: index, className: "url-text" }),
      )}
    </div>
  </div>
);

export default Terminal;
