// [NOTE]
// This is to prevent the menu from being fetched multiple times when the user scrolls up and down
// 기존의 pocha 훅들과는 다르게 생겼으나, 당황하지 말고 SWR 공식문서를 참고하자
// https://swr.vercel.app/ko

import {useState, useEffect} from 'react';
import {getPochaMenu} from '@/apis/queries';

// types
import {HookStatus} from './types';
import {MenuByCategory} from '@/types/pocha';

/**
 * @desc hook to fetch menu of pocha
 */
const useMenu = (pochaID: number, token: string | null) => {
  const [menuList, setMenuList] = useState<MenuByCategory[]>([]);
  const [status, setStatus] = useState<HookStatus>('loading');
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await getPochaMenu(pochaID, token as string);
        setMenuList(res);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Something went wrong...');
        }
      }
    };

    if (pochaID && token) {
      fetchMenu();
    }
  }, [pochaID, token]);

  return {
    menuList,
    status,
    error,
  };
};

export default useMenu;
