import styles from './index.module.css';

interface EmptyListProps {
  label: string;
}
const EmptyFooter = ({ label }: EmptyListProps) => (
  <div className={styles.empty__container}>
    <div className={styles.empty__label}>{label}</div>
  </div>
);

export default EmptyFooter;
