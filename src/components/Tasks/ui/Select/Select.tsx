import React, { useEffect, useRef, useState } from 'react';
import './select.scss';
import { useOnClickOutside } from '../../../../hooks/useOutsideClick';

interface ISelect<T> {
  options: T[];
  defaultValue: T;
  labelName: string;
  setOption: (arg: T) => void;
}

export const Select = <T extends string>({
  labelName,
  defaultValue,
  options,
  setOption
}: ISelect<T>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T>();
  const optionsRef = useRef(null);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  useOnClickOutside(optionsRef, () => setIsOpen(false));

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (option: T) => () => {
    setSelectedOption(option);
    setIsOpen(false);
    setOption(option);
  };

  return (
    <div className={'select'}>
      <span>{labelName}</span>
      <div className={'dropDownContainer'}>
        <div className={'dropDownHeader'} onClick={toggling}>
          {selectedOption}
        </div>
        {isOpen && (
          <div ref={optionsRef} className={'dropDownListContainer'}>
            <ul className={'dropDownList'}>
              {options.map((option) => (
                <li className={'listItem'} onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
