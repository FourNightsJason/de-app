'use client';
import { useCallback, useEffect, useState } from 'react';
import styles from './page.module.scss';
import { v4 } from 'uuid';
import clsx from 'clsx';
import { IObjectAny } from '@/utils/interface';
import _ from 'lodash';

interface IBlock {
  key: string;
  position: number;
  member: number[];
  isCombind?: boolean;
}

function Block({ position, member }: { position: number; member: number[] }) {
  const list = ['清', '君', '宝', '榕', '超', '德', '梅', '胜', '诺', 'D'];
  const [location, setLocation] = useState<{ x: number; y: number }>();

  useEffect(() => {
    const x = Math.floor(position % 4) * 94;
    const y = Math.floor(position / 4) * 94;
    setLocation({ x, y });
  }, [position]);
  return (
    <div
      className={styles.block}
      style={{ top: location?.y + 'px', left: location?.x + 'px' }}
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
let positionList: number[] = [];

export default function Game2048() {
  const [blockList, setBlockList] = useState<IBlock[]>([]);
  const [canCreate, setCanCreate] = useState<boolean>(true);

  const combind = (
    block: IBlock,
    position: number,
    list: IBlock[]
  ): { canCombind: boolean; member: number[]; frontIndex: number } => {
    const newBlock: IBlock = _.cloneDeep(block);
    const frontIndex = list.findIndex((item) => item.position === position);
    const frontBlock = list[frontIndex];
    const newMemberLen = newBlock.member.length;
    const frontMemberLen = frontBlock.member.length;
    const member = [...new Set([...newBlock.member, ...frontBlock.member])];
    return {
      canCombind:
        member.length === newMemberLen + frontMemberLen &&
        !frontBlock.isCombind,
      member,
      frontIndex,
    };
    // if (
    // ) {
    //   newBlock.position = position;
    //   newBlock.member = member;
    //   console.log(newBlock.member);
    //   newBlock.isCombind = true;
    //   newList[frontIndex] = newBlock;
    // }
    // console.log(newBlock, newList);
    // return [newBlock, newList];
  };

  const moveOne = useCallback((code: string, blockList: IBlock[]) => {
    let weightList: IObjectAny = {
      ArrowLeft: -1,
      ArrowUp: -4,
      ArrowRight: 1,
      ArrowDown: 4,
    };
    const weight: number = weightList[code];
    positionList = [];
    let newList: IBlock[] = _.cloneDeep(blockList);
    const tempList: IBlock[] = _.cloneDeep(newList).sort(
      (a: IBlock, b: IBlock) => (b.position - a.position) * weight
    );
    const limitList = Array.from(new Array(4), (item, index) => {
      if (code === 'ArrowUp') return index;
      if (code === 'ArrowLeft') return index * 4;
      if (code === 'ArrowRight') return index * 4 + 3;
      if (code === 'ArrowDown') return index + 4 * 3;
    });
    tempList.forEach((temp: IBlock) => {
      let newItem = newList.find((item) => item.key === temp.key) as IBlock;
      if (!limitList.includes(newItem.position)) {
        const newPosition = newItem.position + weight;
        if (!positionList.includes(newPosition)) {
          newItem.position = newPosition;
        } else {
          const { canCombind, member, frontIndex } = combind(
            newItem,
            newPosition,
            newList
          );
          if (canCombind) {
            newItem.position = newPosition;
            newItem.member = member;
            newItem.isCombind = true;
            newList.splice(frontIndex, 1);
          }
        }
      }
      positionList.push(newItem.position);
    });
    return newList;
  }, []);

  const changePosition = useCallback(
    (e: KeyboardEvent) => {
      // 👈37 👆38 👉39 👇40 ArrowDown
      const arrowKey = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
      if (arrowKey.includes(e.code)) {
        let result: IBlock[] = _.cloneDeep(blockList);
        let temp: IBlock;
        do {
          temp = _.cloneDeep(result);
          result = moveOne(e.code, result);
        } while (!_.isEqual(temp, result));
        result.forEach((item) => {
          item.isCombind = false;
        });
        setBlockList(result);
        if (result.length < 16 && !_.isEqual(result, blockList)) {
          setCanCreate(true);
        }
      }
    },
    [blockList, moveOne]
  );

  useEffect(() => {
    document.addEventListener('keydown', changePosition);
    return () => {
      document.removeEventListener('keydown', changePosition);
    };
  }, [changePosition]);

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
        isCombind: false,
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
          <div className={styles.grid} key={index}>
            {index}
          </div>
        ))}
        {blockList.map(({ key, ...rest }) => (
          <Block key={key} {...rest} />
        ))}
      </div>
    </div>
  );
}
