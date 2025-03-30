// [NOTE] this hook is the best practice for API calls in custom hooks

import {useEffect, useState} from 'react';
import {getPochaInfo} from '@/apis/queries';

// types
import {PochaInfo} from '@/types/pocha';
import {HookStatus} from './types';

/**
 * @desc hook to fetch pocha information (getPochaInfo)
 */
const usePocha = () => {
  const [status, setStatus] = useState<HookStatus>('loading');
  const [pochaInfo, setPochaInfo] = useState<PochaInfo>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPochaInfo = async () => {
      try {
        const res = await getPochaInfo(new Date());
        setPochaInfo(res);
        setStatus('success');
      } catch (error) {
        // [NOTE] error will be thrown from the `getPochaInfo` function
        // which directly makes API call with axios
        setStatus('error');
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Something went wrong...');
        }
      }
    };

    fetchPochaInfo();
  }, []);

  return {
    pochaInfo,
    status,
    error,
  };
};

export default usePocha;
