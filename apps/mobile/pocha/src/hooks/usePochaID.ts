'use client';

import {useState, useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import {getPochaInfo} from '@/apis/queries';
import {HookStatus} from './types';

/**
 * @desc Hook for fetching Pocha ID defensively.
 * 1. Tries to get pochaID from URL searchParams.
 * 2. If unavailable, fetches from the API as fallback.
 */
const usePochaID = () => {
  const [pochaID, setPochaID] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<HookStatus>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPochaID = async () => {
      try {
        const pochaInfo = await getPochaInfo(new Date());
        setPochaID(pochaInfo.pochaID);
        setStatus('success');
      } catch (error) {
        console.error('Failed to fetch Pocha ID:', error);
        setError('Failed to retrieve Pocha ID');
        setStatus('error');
      }
    };

    fetchPochaID();
  }, []);

  return {pochaID, status, error};
};

export default usePochaID;
