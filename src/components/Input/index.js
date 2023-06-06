import { useField } from "@unform/core";
import { useEffect, useRef } from "react";

const Input = ({ name, ...rest }) => {
  const inputRef = useRef(null);

  const { registerField, fieldName, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input ref={inputRef} defaultValue={defaultValue} type="text" {...rest} />
      {error && <span>{error}</span>}
    </>
  );
};

export default Input;
