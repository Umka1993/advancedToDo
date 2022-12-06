import React, { FC, InputHTMLAttributes, useEffect, useState } from 'react';

interface ITextarea extends InputHTMLAttributes<any> {
  stateValue: string;
  seStateValue: (arg: string) => void;
  label: string;
}

export const Textarea: FC<ITextarea> = ({ seStateValue, label, stateValue, id, name }) => {
  const [localState, setLocalState] = useState(stateValue);
  useEffect(() => {
    setLocalState(stateValue);
  }, [stateValue]);

  return (
    <div className={'textAreaWrapper'}>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={id}
        name={name}
        value={localState}
        onChange={(e) => setLocalState(e.target.value)}
        onBlur={() => seStateValue(localState)}
      />
    </div>
  );
};
