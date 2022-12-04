import Close from '../../assets/icons/icons8-close.svg';
import './modal.scss';
import { FC, ReactNode } from 'react';
import classNames from 'classnames';

interface IModal {
  show: boolean;
  close: () => void;
  children: ReactNode;
}

export const Modal: FC<IModal> = ({ show, close, children }) => {
  return (
    <>
      <div
        className={classNames('modalContainer', {
          show,
        })}
        onClick={() => close()}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <header className="modal_header">
            <button className="close" onClick={() => close()}>
              <img src={Close} alt="close" />
            </button>
          </header>
          <main className="modal_content">{children}</main>
        </div>
      </div>
    </>
  );
};
