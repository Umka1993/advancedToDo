import ReactDom from 'react-dom';
import Close from '../assets/icons/icons8-close.svg';
import './modal.scss';
import { FC, ReactNode, useEffect, useState } from 'react';

interface IModal {
  show: boolean;
  close: () => void;
  children: ReactNode;
}

export const Modal: FC<IModal> = ({ show, close, children }) => {
  const [container] = useState(() => {
    return document.createElement('div');
  });

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);
  return ReactDom.createPortal(
    <>
      <div className={`modalContainer ${show ? 'show' : ''} `} onClick={() => close()}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <header className="modal_header">
            <button className="close" onClick={() => close()}>
              <img src={Close} alt="close" />
            </button>
          </header>
          <main className="modal_content">{children}</main>
        </div>
      </div>
    </>,
    container
  );
};
