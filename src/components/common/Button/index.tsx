import React from 'react';
import cx from 'classnames';
import styles from './index.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { children, className, disabled } = props;
  return (
    <button
      className={cx(styles.button, disabled ? styles.disabled : '', className)}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
