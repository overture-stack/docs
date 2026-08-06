import React from "react";
import Link from "./Link";
import { Icon } from "./Icon";
import { P2 } from "./Typography";

export type YellowButtonProps = {
  link?: string;
  title: React.ReactNode;
  /** Icon name, resolved through the Icon component's map. */
  img_src: string;
  alt: string;
  text?: React.ReactNode;
  isProductPage?: boolean;
};

export default function YellowButton({
  link,
  title,
  img_src,
  alt,
  text,
  isProductPage,
}: YellowButtonProps) {
  const productPageClass = (base: string) =>
    isProductPage ? ` ${base}` : "";

  return (
    <div
      className={`yellow-button ${
        !link ? "yellow-button__disable-hover-event" : ""
      }`}
    >
      <Link
        className={`yellow-button__link${productPageClass(
          "yellow-button__product-page-link",
        )}`}
        to={link}
      >
        <Icon
          className={`yellow-button__img${productPageClass(
            "yellow-button__product-page-img",
          )}`}
          img={img_src}
          alt={alt}
        />
        <h1
          className={`yellow-button__title${productPageClass(
            "yellow-button__product-page-title",
          )}${!link ? " yellow-button__remove-underline-css" : ""}`}
        >
          {title}
        </h1>
        <P2
          className={`yellow-button__text${productPageClass(
            "yellow-button__product-page-text",
          )}`}
        >
          {text}
        </P2>
      </Link>
    </div>
  );
}
