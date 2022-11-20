import { ChangeEvent } from 'react';
import styles from './Like.module.css';

export interface ILkeProps {
  isLiked: boolean;
  onChangeLike: (isLiked: boolean) => void;
}

export function Like({ isLiked, onChangeLike }: ILkeProps) {
  const likeHandleClick = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeLike(event.currentTarget.checked);
  }

  return (
    <label className={styles.checkbox} aria-label={ isLiked ? "Нравится" : "Не нравится" }>
      <input type="checkbox" className={styles.checkboxInput} checked={isLiked} onChange={likeHandleClick} />
      <span className={styles.iconContainer} aria-hidden="true">
        <svg className={styles.icon} width="20" height="20" strokeWidth="1" viewBox="-1 -1 18 18" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
      </span>
    </label>
  );
}
