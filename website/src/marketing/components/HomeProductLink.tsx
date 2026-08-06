import React from "react";
import Link from "./Link";
import { Icon } from "./Icon";
import { P1 } from "./Typography";

export type HomeProductLinkProps = {
  icon: string;
  title: string;
  link: string;
  text: React.ReactNode;
};

export default function HomeProductLink({
  icon,
  title,
  link,
  text,
}: HomeProductLinkProps) {
  return (
    <Link className="ProductLink" to={link}>
      <div className="ProductLink__top-container">
        <Icon alt="" className="ProductLink__icon" img={icon} />
        <h1 className="ProductLink__title">{title}</h1>
      </div>
      <P1 className="ProductLink__text">{text}</P1>
    </Link>
  );
}
