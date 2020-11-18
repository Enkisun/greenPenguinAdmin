import React from "react";
import styled from "styled-components";

const Error = styled.div`
  & input {
    width: 350px;
    height: 60px;
    padding: 28px 15px 10px;
    border: 1px solid #4742bb;
    border-radius: 5px;
    font-family: 'Exo', sans-serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
  }
  &.error {
    & input { border: 1px solid red; }
    & span {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: .7rem;
      line-height: 1;
      pointer-events: none;
      color: red;
    }
  }
`;

export const Input = (field) => {

  const hasError = field.meta.touched && field.meta.error;

  return (
    <Error className={hasError ? "error" : "text"}>
      <input {...field.input} type={field.type || "text"} />
      { hasError && <span>{field.meta.error}</span> }
    </Error>
  );
};