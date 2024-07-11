'use client';
import { useCallback, useEffect, useState } from 'react';
import styles from './page.module.scss';
import { v4 } from 'uuid';
import clsx from 'clsx';

interface IBlock {
  key: string;
  position: number;
  member: number[];
}

function Block({ position, member }: { position: number; member: number[] }) {
  const list = ['清', '君', '宝', '榕', '超', '德', '梅', '胜', '诺', 'D'];
  const [location, setLocation] = useState<{ x: number; y: number }>();

  useEffect(() => {
    const x = Math.floor(position % 4) * 94;
    const y = Math.floor(position / 4) * 94;
    console.log(x, y);
    setLocation({ x, y });
  }, [position]);
  return (
    <div
      className={styles.block}
      style={{ top: location?.x + 'px', left: location?.y + 'px' }}
    >
      {list.map((item, index) => (
        <span
          key={index}
          className={clsx({ [styles.active]: member.includes(index) })}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
const positionList: number[] = [];

export default function Game2048() {
  const [blockList, setBlockList] = useState<IBlock[]>([]);
  const [canCreate, setCanCreate] = useState<boolean>(true);
  const changePosition = (e: KeyboardEvent) => {
    // 👈37 👆38 👉39 👇40 ArrowDown

    switch (e.code) {
      case 'ArrowLeft':
        break;
      case 'ArrowUp':
        break;
      case 'ArrowRight':
        break;
      case 'ArrowDown':
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', changePosition);
    return () => {
      document.removeEventListener('keydown', changePosition);
    };
  }, []);

  const createBlock = () => {
    if (positionList?.length < 16 && canCreate) {
      const key = v4();
      const getPosition = (): number => {
        let position: number;
        const setPosition = () => Math.floor(Math.random() * 16);
        do {
          position = setPosition();
        } while (positionList.includes(position));
        positionList.push(position);
        return position;
      };

      const member = [Math.floor(Math.random() * 10)];
      const newBlock: IBlock = {
        key,
        position: getPosition(),
        member,
      };
      setCanCreate(false);
      setBlockList([...blockList, newBlock]);
    }
  };

  useEffect(createBlock, [blockList, canCreate]);
  return (
    <div className={styles.game2048}>
      <div className={styles.gamebox}>
        {new Array(16).fill('').map((item, index) => (
          <div className={styles.grid} key={index}></div>
        ))}
        {blockList.map(({ key, ...rest }) => (
          <Block key={key} {...rest} />
        ))}
      </div>
    </div>
  );
}
