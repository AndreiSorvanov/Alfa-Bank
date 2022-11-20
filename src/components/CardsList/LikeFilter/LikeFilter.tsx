import { ChangeEvent } from 'react';
import { Checkbox } from '../../Checkbox';
import styles from './LikeFilter.module.css';

interface IFilter {
  like: boolean;
  onSetFilter: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function LikeFilter({ like, onSetFilter }: IFilter) {
  return (
    <div className={styles.filterContainer}>
      <Checkbox label="Нравится" checked={like} onChange={onSetFilter} />
    </div>
  );
}
