import {useEffect, useState} from 'react';
import {getPochaInfoMock} from '../apis/queries';

// types
import {PochaInfo} from '../types/pocha';
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
        const res = await getPochaInfoMock(new Date());
        setPochaInfo(res);
        setStatus('success');
      } catch (error) {
        // ✅ Error message directly from the error object
        setStatus('error');
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred.');
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
