/**
 * Misc typography batch.
 **/

import React from "react";

type TextProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export const H1 = ({ className, children, style }: TextProps) => (
  <h1 style={style} className={`${className ? className : ""} t-h1`}>
    {children}
  </h1>
);

export const H2 = ({ className, children, style }: TextProps) => (
  <h2 style={style} className={`${className ? className : ""} t-h2`}>
    {children}
  </h2>
);

export const H3 = ({ className, children, style }: TextProps) => (
  <h3 style={style} className={`${className ? className : ""} t-h3`}>
    {children}
  </h3>
);

export const P1 = ({ className, children, style }: TextProps) => (
  <p style={style} className={`${className ? className : ""} t-p1`}>
    {children}
  </p>
);

export const P2 = ({ className, children, style }: TextProps) => (
  <p style={style} className={`${className ? className : ""} t-p2`}>
    {children}
  </p>
);

export const P3 = ({ className, children, style }: TextProps) => (
  <p style={style} className={`${className ? className : ""} t-p3`}>
    {children}
  </p>
);

// List
export const L1 = ({ className, children, style }: TextProps) => (
  <ul style={style} className={`${className ? className : ""} t-l1`}>
    {children}
  </ul>
);
