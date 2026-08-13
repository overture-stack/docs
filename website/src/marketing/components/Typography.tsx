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
   * For headings a `<section aria-labelledby>` points at. Also, via
   * `@theme/Heading` below, what turns the heading itself into a clickable,
   * linkable anchor (a "#" that appears on hover, the same as every MDX
   * heading on the documentation site) — see SiteMap.tsx and pages/index.tsx
   * for the same pattern already in use elsewhere on this site. A heading
   * with no `id` renders exactly as it did before this existed.
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
