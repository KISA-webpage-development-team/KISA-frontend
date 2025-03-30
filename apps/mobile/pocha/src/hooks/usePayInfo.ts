import {PayInfo} from '@/types/pocha';
import {useEffect, useState} from 'react';
import {getPayInfo} from '@/apis/queries';
import {
  calculateStripeFee,
  calculateStripeTotalPrice,
} from '../utils/calculateStripeFee';

const usePayInfo = (email: string, pochaID: number | undefined) => {
  const [payInfo, setPayInfo] = useState<PayInfo>();
  const [tip, setTip] = useState<number>(0);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const [error, setError] = useState<string | null>(null);

  console.log('usePAYINFO: ', pochaID);

  useEffect(() => {
    const fetchPayInfo = async () => {
      try {
        const res = await getPayInfo(email, pochaID as number);
        console.log(res);
        setPayInfo(res);
        setStatus('success');
      } catch (error) {
        console.error('Error fetching pay info: ', error);
        setStatus('error');
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred.');
        }
      }
    };

    if (pochaID) {
      fetchPayInfo();
    }
  }, [email, pochaID]);

  return {
    amount: payInfo?.amount,
    fee: calculateStripeFee(payInfo?.amount ?? 0),
    tip,
    setTip,
    totalPrice: calculateStripeTotalPrice(payInfo?.amount ?? 0),
    ageCheckRequired: payInfo?.ageCheckRequired === 'true' ? true : false,
    status,
    error,
  };
};

export default usePayInfo;
