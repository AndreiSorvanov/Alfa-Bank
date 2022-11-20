import styles from './Header.module.css';

interface IHeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: IHeaderProps) {
  return (
    <header className={styles.header}>
      {children}
    </header>
  );
}
