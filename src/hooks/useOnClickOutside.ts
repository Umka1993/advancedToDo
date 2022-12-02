// import { RefObject, useCallback, useEffect } from 'react';
//
// export interface HTMLDialogElement extends HTMLDivElement {
//   open: boolean;
//   showModal: () => void;
//   close: () => void;
//   show: () => void;
// }
//
// export const useCloseOutsideDialog = (
//   ref: RefObject<HTMLDialogElement>,
//   isEnable: boolean,
//   open: boolean | undefined,
//   onRequestClose: () => void
// ) => {
//   const closeDialogOnOutsideClick = useCallback(
//     (evt: MouseEvent) => {
//       const dialogNode = ref.current;
//
//       if (dialogNode) {
//         const isClickOnDialog =
//           evt.target === dialogNode || dialogNode.contains(evt.target as Node);
//
//         !isClickOnDialog && dialogNode.open && onRequestClose();
//       }
//     },
//     [ref.current]
//   );
//
//   useEffect(() => {
//     if (ref.current && isEnable && open) {
//       const timeOut = setTimeout(
//         () => document.addEventListener('click', closeDialogOnOutsideClick),
//         200
//       );
//
//       return () => {
//         clearTimeout(timeOut);
//         document.removeEventListener('click', closeDialogOnOutsideClick);
//       };
//     }
//   }, [isEnable, ref.current, open]);
// };
// ****************

import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};
