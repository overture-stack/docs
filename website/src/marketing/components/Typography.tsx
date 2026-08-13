/**
 * Misc typography batch.
 **/

import React from "react";
import Heading from "@theme/Heading";

type TextProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  /**
   * For headings a `<section aria-labelledby>` points at; also what turns
   * the heading into a clickable anchor via `@theme/Heading` (a "#" on
   * hover, same as MDX headings). A heading with no `id` renders exactly as
   * before this existed.
   */
  id?: string;
};

export const H1 = ({ className, children, style, id }: TextProps) => (
  <Heading
    as="h1"
    id={id}
    style={style}
    className={`${className ? className : ""} t-h1`}
  >
    {children}
  </Heading>
);

export const H2 = ({ className, children, style, id }: TextProps) => (
  <Heading
    as="h2"
    id={id}
    style={style}
    className={`${className ? className : ""} t-h2`}
  >
    {children}
  </Heading>
);

export const H3 = ({ className, children, style, id }: TextProps) => (
  <Heading
    as="h3"
    id={id}
    style={style}
    className={`${className ? className : ""} t-h3`}
  >
    {children}
  </Heading>
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
