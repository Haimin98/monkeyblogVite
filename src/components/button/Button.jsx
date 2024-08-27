import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../loading/LoadingSpinner";

/**
 *
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 */
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  kind = "primary",
  isLoading = false,
  ...props
}) => {
  const { to, height = "h-[66px]" } = props;
  const baseClasses = `cursor-pointer px-[25px] leading-none rounded-lg font-semibond text-[18px] flex items-center justify-center w-full `;
  const primary = `text-white bg-gradient-to-r from-primary to-secondary`;
  const secondary = `bg-white border border-solid border-primary text-primary`;
  const buttonClasses = `${baseClasses} ${height}  ${
    kind === "primary" ? primary : secondary
  } disabled:opacity-50 disabled:pointer-events-none`;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink
        to={to}
        style={{
          display: "inline-block",
        }}
      >
        <button type={type} className={buttonClasses} {...props}>
          {child}
        </button>
      </NavLink>
    );
  }
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={isLoading}
      onClick={onClick}
      {...props}
    >
      {child}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;
