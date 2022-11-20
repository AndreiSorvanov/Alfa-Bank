import styles from './DeleteModal.module.css';
import { MouseEvent } from 'react';
import { Modal } from '../Modal';

interface IDeleteModal {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteModal({ open, onConfirm, onClose }: IDeleteModal) {
  const confirmHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onConfirm();
    onClose();
  }

  const cancelHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className={styles.taskModalHeading}>Удалить карточку?</h2>
      <div className={styles.btnGroup}>
        <button type='button' className={styles.confirmBtn} onClick={confirmHandleClick}>Да</button>
        <button type='button' className={styles.cancelBtn} onClick={cancelHandleClick}>Нет</button>
      </div>
    </Modal>
  );
}
