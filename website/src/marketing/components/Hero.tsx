/**
 * Commonly used site banner that displays
 * text describing the page, and an image.
 **/

import React from "react";
import { H1, P3 } from "./Typography";

export type HeroProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <div className="Hero blue-bg">
      <div className="container">
        <section className="Hero__section">
          <H1>{title}</H1>
          <P3 className="Hero__subtitle">{subtitle}</P3>
        </section>
      </div>
    </div>
  );
}
