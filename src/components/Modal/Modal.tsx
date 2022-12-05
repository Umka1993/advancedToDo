import Close from '../../assets/icons/icons8-close.svg';
import './modal.scss';
import { FC, ReactNode, useRef } from 'react';
import classNames from 'classnames';
import { useOnClickOutside } from '../../hooks/useOutsideClick';

interface IModal {
  show: boolean;
  children: ReactNode;
  setIsOpen: (arg: boolean) => void;
}

export const Modal: FC<IModal> = ({ show, children, setIsOpen }) => {
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => setIsOpen(false));
  return (
    <>
      <div
        className={classNames('modalContainer', {
          show
        })}>
        <div ref={modalRef} className="modal" onClick={(e) => e.stopPropagation()}>
          <header className="modal_header">
            <button className="close">
              <img src={Close} alt="close" />
            </button>
          </header>
          <main className="modal_content">{children}</main>
        </div>
      </div>
    </>
  );
};
