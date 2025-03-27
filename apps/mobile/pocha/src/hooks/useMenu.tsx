// [NOTE]
// This is to prevent the menu from being fetched multiple times when the user scrolls up and down
// 기존의 pocha 훅들과는 다르게 생겼으나, 당황하지 말고 SWR 공식문서를 참고하자
// https://swr.vercel.app/ko

import {MenuByCategory} from '@/types/pocha';
import {useState, useEffect} from 'react';
import {HookStatus} from './types';
import {getPochaMenu} from '@/apis/queries';

/**
 * @desc hook to fetch menu of pocha
 */
const useMenu = (pochaID: number) => {
  const [menuList, setMenuList] = useState<MenuByCategory[]>([]);
  const [status, setStatus] = useState<HookStatus>('loading');
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await getPochaMenu(pochaID);
        setMenuList(res);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    fetchMenu();
  }, []);

  return {
    menuList,
    status,
    error,
  };
};

export default useMenu;
