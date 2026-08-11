import React from "react";
import Link from "./Link";
import { H3 } from "./Typography";

/**
 * The white tile the home page's card bands are built from: a title, a body,
 * and a "go" line, with the whole tile one link.
 *
 * It is the documentation site's entry tile (components/SiteMap), rebuilt on
 * this side of the build. That component is a CSS module scoped to a page with
 * no marketing styles on it, so it cannot be imported here; what the two share
 * by construction instead is their shape and, where the caller passes one, the
 * accent colour (`--journey-*-color` in css/custom.css).
 *
 * Renders an `<li>`, so the caller supplies the `<ul>` and owns the grid: this
 * component is the card, not the row. `accent` colours the go line and is a CSS
 * colour or `var()` reference; without one the tile uses the site's link blue.
 *
 * The single anchor is why the caller passes `children` as plain paragraphs
 * rather than anything interactive: links inside a link is neither valid markup
 * nor navigable, and the whole point of the tile is that the whole tile is
 * clickable.
 *
 * `image` puts a screenshot across the top of the tile, inside the anchor and
 * bled to its edges. Inside rather than behind and overhanging, which is the
 * other way a card band shows one: the tiles here sit two by two, so an
 * overhang on the second row has to clear the first row's floor, and every
 * screenshot the site holds is already drawn with its own browser chrome and
 * shadow, which is the raised look a second frame behind it would only repeat.
 */
export type CardTileProps = {
  title: string;
  href: string;
  /** The go line's text. The arrow is appended here, not by the caller. */
  linkLabel: string;
  accent?: string;
  className?: string;
  /** Absolute path into static/. Cropped to 16:9, anchored to its own top. */
  image?: string;
  /**
   * Empty by default, and deliberately: the tile is one link, so its accessible
   * name is already the title and the go line, and alt text on the shot would
   * only say a third time what the reader is about to open.
   */
  imageAlt?: string;
  /** A pill in the corner of the shot, for anything that is not live. */
  imageBadge?: string;
  children: React.ReactNode;
};

export default function CardTile({
  title,
  href,
  linkLabel,
  accent,
  className,
  image,
  imageAlt = "",
  imageBadge,
  children,
}: CardTileProps) {
  return (
    <li
      className={`CardTile${className ? ` ${className}` : ""}`}
      style={
        accent
          ? ({ "--card-tile-accent": accent } as React.CSSProperties)
          : undefined
      }
    >
      <Link to={href} className="CardTile__link">
        {image && (
          <div className="CardTile__media">
            <img
              className="CardTile__shot"
              src={image}
              alt={imageAlt}
              loading="lazy"
            />
            {imageBadge && (
              <span className="CardTile__badge">{imageBadge}</span>
            )}
          </div>
        )}
        {/* The padded part. Separate from the anchor so the shot above it can
            reach the tile's own edges while the text still holds its inset. */}
        <div className="CardTile__body">
          <H3 className="CardTile__title">{title}</H3>
          {children}
          {/* `margin-top: auto` in the stylesheet, so this sits on the floor of
              every tile whatever the body above it costs. */}
          <span className="CardTile__go">{linkLabel} →</span>
        </div>
      </Link>
    </li>
  );
}
