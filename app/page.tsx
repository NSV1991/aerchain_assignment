import styles from './page.module.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Dashboard } from './components/Dashboard';

export default function Home() {
    return (
        <main className={styles.main}>
            <Dashboard />
        </main>
    );
}
