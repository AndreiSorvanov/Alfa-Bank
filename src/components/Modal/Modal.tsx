import { useEffect, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface IModal {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

interface IModalClickEvent extends MouseEvent<HTMLDivElement> {
  isClickWithinModal: boolean;
}

export function Modal({ open, children, onClose }: IModal) {
 useEffect(() => {
    const root = document.querySelector('#root');
    return () => root?.classList.remove(styles.inactive);
  }, []);

  const node = document.querySelector('#modal');
  if (!node) return null;

  const onClickWithinModal = (event: IModalClickEvent) => {
    event.isClickWithinModal = true;
  }

  const onClickOutsideModal = (event: IModalClickEvent) => {
    if (event.isClickWithinModal) return;
    onClose();
  }

  return open
    ? ReactDOM.createPortal((
        <div className={styles.modal} onClick={onClickOutsideModal}>
          <div className={styles.dialog} onClick={onClickWithinModal}>
            <div className={styles.content}>
              {children}
            </div>
          </div>
        </div>
      ), node)
    : null;
}
