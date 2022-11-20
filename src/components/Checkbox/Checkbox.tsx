import { ChangeEvent } from 'react';
import styles from './Checkbox.module.css';

interface ICheckboxProps {
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({ label, checked, onChange }: ICheckboxProps) {
  return (
    <label className={styles.label}>
      {label}
      <input className={styles.input} type='checkbox' checked={checked} onChange={onChange} />
    </label>
  );
}
