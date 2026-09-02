import React from "react";
import Link from "./Link";
import { H3 } from "./Typography";

/**
 * The white tile the home page's card bands are built from: a title, a body,
 * and a "go" line, with the whole tile one link.
 *
 * Mirrors the documentation site's entry tile (components/SiteMap) — a
 * CSS-module component scoped to a page with no marketing styles, so it
 * can't be imported here. The two share shape and, where passed, accent
 * colour (`--journey-*-color` in css/custom.css).
 *
 * Renders an `<li>`; the caller supplies the `<ul>` and owns the grid.
 * `accent` colours the go line (a CSS colour or `var()`); without one it
 * uses the site's link blue.
 *
 * The single anchor is why `children` must be plain paragraphs, not
 * interactive content: a link inside a link is invalid and unnavigable, and
 * the whole tile is meant to be clickable.
 *
 * `image` sits inside the anchor, not behind it as an overhang: tiles sit
 * two-by-two here, so an overhang on the second row would clash with the
 * row above, and every screenshot already has its own chrome/shadow, which
 * a second frame would only repeat. Inset on a pale blue field rather than
 * bled to the edge for the same reason; see `.CardTile__media` in
 * styles/components/_card-tile.scss.
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
