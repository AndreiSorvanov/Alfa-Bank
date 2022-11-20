import { MouseEvent, useState } from 'react';
import { DeleteModal } from '../../../DeleteModal';
import styles from './DeleteButton.module.css';

export interface IDeleteButtonProps {
  onDelete: () => void;
}

export function DeleteButton({ onDelete }: IDeleteButtonProps) {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  const openHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setIsDeleteModalOpened(true);
  }

  const confirmDeletingHandleClick = () => {
    onDelete();
    setIsDeleteModalOpened(false);
  }

  const closeHandleClick = () => {
    setIsDeleteModalOpened(false);
  }

  return (
    <>
      <button className={styles.btn} onClick={openHandleClick}>
        <span className={styles.iconContainer} aria-hidden='true'>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#808080"/>
          </svg>
        </span>
        Удалить
      </button>
      <DeleteModal open={isDeleteModalOpened} onConfirm={confirmDeletingHandleClick} onClose={closeHandleClick} />
    </>
  );
}
