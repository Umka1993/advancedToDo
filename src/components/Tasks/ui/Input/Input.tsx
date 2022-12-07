import React, { FC, useEffect, useState } from 'react';
import { useDebounce } from '../../../../hooks/useDebounse';

interface IInput {
  stateValue: string;
  setStateValue: (arg: string) => void;
  label: string;
  id: string;
  required?: boolean;
  name: string;
  type: string;
}

export const Input: FC<IInput> = ({
  setStateValue,
  label,
  stateValue,
  id,
  name,
  required,
  type,
}) => {
  const [localState, setLocalState] = useState('');

  const debouncedValue = useDebounce<string>(localState, 500);

  useEffect(() => {
    setLocalState(stateValue);
  }, [stateValue]);

  useEffect(() => {
    setStateValue(debouncedValue);
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
