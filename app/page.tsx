'use client';
import { Flex, Input } from 'antd';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Nav from '@/component/business/Nav';

export default function Home() {
  const [favList, setFavList] = useState(Array(8).fill({}));
  const router = useRouter();

  return (
    <main className={styles.home}>
      <Nav />
      <div className={styles.contain}>
        <div className={styles.title}>DE</div>
        <div className={styles.search}>
          <Input></Input>
        </div>
        <div className={styles.favList}>
          {favList.map((item, index) => (
            <section className={styles.favListItem} key={index}></section>
          ))}
        </div>
      </div>
    </main>
  );
}
