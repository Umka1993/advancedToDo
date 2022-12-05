import React, { FC, InputHTMLAttributes, useEffect, useState } from 'react';

interface IInput extends InputHTMLAttributes<any> {
  stateValue: string;
  seStateValue: (arg: string) => void;
  label: string;
}

export const Input: FC<IInput> = ({
  seStateValue,
  label,
  stateValue,
  id,
  required,
  name,

  type
}) => {
  const [localState, setLocalState] = useState(stateValue);

  useEffect(() => {
    setLocalState(stateValue);
  }, [stateValue]);

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={localState}
        onChange={(e) => setLocalState(e.target.value)}
        required={required}
        onBlur={() => seStateValue(localState)}
      />
    </>
  );
};
