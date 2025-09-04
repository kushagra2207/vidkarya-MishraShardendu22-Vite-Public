import { notesFilterOptions } from '../../data/notesFilterOptions';
import NotesFilterCard from './NotesFilterCard';
import styles from './styles/notesFilterPanel.module.css';

export default function FilterPanel() {
  return (
    <div className={styles.filterPanel}>
      {notesFilterOptions.map((ele, idx) => {
        return <NotesFilterCard key={idx} {...ele} />;
      })}
    </div>
  );
}
