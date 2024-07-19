'use-client';

import styles from './page.module.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Table } from './components/Table';
import { Header } from './components/Header';

import mock from './data/mockData.json';

export default function Home() {
    return (
        <main className={styles.main}>
            <Header trips={mock.data} />
            <Table trips={mock.data} />
        </main>
    );
}
