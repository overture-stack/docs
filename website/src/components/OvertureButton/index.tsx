import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  to?: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'normal' | 'large';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  to,
  variant = 'primary',
  size = 'normal',
  onClick,
}) => {
  const classes = [
    styles.button,
    variant === 'primary' ? styles.primary : styles.secondary,
    size === 'small' ? styles.small : size === 'large' ? styles.large : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (onClick) {
    return (
      <button className={classes} onClick={onClick} type="button">
        {children}
      </button>
    );
  }

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    );
  }

  return null;
};

export default Button;