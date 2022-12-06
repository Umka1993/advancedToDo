import React, { FC, InputHTMLAttributes, useEffect, useState } from 'react';
import { useDebounce } from '../../../../hooks/useDebounse';

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

  type,
}) => {
  const [localState, setLocalState] = useState('');

  const debouncedValue = useDebounce<string>(localState, 500);

  useEffect(() => {
    setLocalState(stateValue);
  }, [stateValue]);

  useEffect(() => {
    seStateValue(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className={'inputWrapper'}>
      <label className={'label'} htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={localState}
        onChange={(e) => setLocalState(e.target.value)}
        required={required}
      />
    </div>
  );
};
