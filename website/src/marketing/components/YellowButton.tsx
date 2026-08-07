import React from "react";
import Link from "./Link";
import { Icon } from "./Icon";
import { P2 } from "./Typography";

/**
 * Icon, heading and blurb in a column, optionally linked.
 *
 * It carried an `isProductPage` flag until rebuild phase 3, which switched it to
 * a horizontal layout for the products page's feature tiles. Those tiles are
 * gone with the rewrite, so the flag and its five style variants went too, and
 * /about-us/ is the only route that renders this now.
 */
export type YellowButtonProps = {
  link?: string;
  title: React.ReactNode;
  /** Icon name, resolved through the Icon component's map. */
  img_src: string;
  alt: string;
  text?: React.ReactNode;
};

export default function YellowButton({
  link,
  title,
  img_src,
  alt,
  text,
}: YellowButtonProps) {
  return (
    <div
      className={`yellow-button ${
        !link ? "yellow-button__disable-hover-event" : ""
      }`}
    >
      <Link className="yellow-button__link" to={link}>
        <Icon className="yellow-button__img" img={img_src} alt={alt} />
        <h1
          className={`yellow-button__title${
            !link ? " yellow-button__remove-underline-css" : ""
          }`}
        >
          {title}
        </h1>
        <P2 className="yellow-button__text">{text}</P2>
      </Link>
    </div>
  );
}
