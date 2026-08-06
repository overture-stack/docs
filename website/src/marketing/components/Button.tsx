import React from "react";
import { Icon } from "./Icon";
import Link from "./Link";

const btnTypes: Record<string, string> = {
  primary: "button is-primary", // uses bulma
  secondary: "button is-white secondary", // bulma + custom css
  default: "default",
};

const btnSizes: Record<string, string> = {
  // Bulma classes
  default: "",
  large: "is-large",
  medium: "is-medium",
  navGithub: "is-medium",
  navSlack: "is-medium",
  small: "is-small",
};

// Icon sizes vary based on passed in button size prop.
const iconSizes: Record<string, number> = {
  default: 16,
  large: 32,
  medium: 24,
  navGithub: 20,
  navSlack: 22,
  small: 16,
};

export type ButtonProps = {
  /**
   * A link to an anchor on another page. The Gatsby site needed
   * gatsby-plugin-anchor-links for this; a plain Link carries the hash.
   */
  anchorLink?: string;
  /** Required in practice for icon-only buttons, which have no text to read. */
  ariaLabel?: string;
  children?: React.ReactNode;
  className?: string;
  icon?: string;
  iconAlt?: string;
  iconStyle?: React.CSSProperties;
  link?: string;
  onClick?: () => void;
  size?: keyof typeof btnSizes;
  type?: keyof typeof btnTypes;
};

/**
 * Component: Button
 * Wraps several of Bulma's classes for easier styling, but can be swapped out
 * with custom styles (see above objects.)
 *
 * Example usage:
 * <Button size="large" type="primary"/>
 * ^ will maps the props to the objects above to determing the style of the button.
 */
export default function Button({
  anchorLink,
  ariaLabel,
  children,
  className = "",
  icon,
  iconAlt = "",
  iconStyle,
  link = "",
  onClick,
  size = "default",
  type = "default",
}: ButtonProps) {
  const classes = `button custom-button ${btnTypes[type]} ${btnSizes[size]} ${className}`;

  const IconComp = () =>
    icon ? (
      <Icon
        alt={iconAlt}
        className="mr2"
        style={iconStyle}
        size={iconSizes[size]}
        img={icon}
      />
    ) : null;

  if (onClick) {
    return (
      <button
        aria-label={ariaLabel}
        className={classes}
        onClick={() => onClick()}
        type="button"
      >
        <IconComp />
        {children}
      </button>
    );
  }

  return (
    <Link aria-label={ariaLabel} className={classes} to={anchorLink ?? link}>
      <IconComp />
      {children}
    </Link>
  );
}
