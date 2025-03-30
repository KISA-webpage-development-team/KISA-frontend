import {useState, useEffect} from 'react';
import {HookStatus} from './types';
import {getUser} from '@/shared/apis/users/queries';

// secret list of allowed underage users
const UNDERAGE_WHITE_LIST = ['jiohin@umich.edu'];

const calculateAge = (birthday: string): number => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

/**
 * @desc Hook to fetch and calculate user's age using SWR
 */
const useUserAge = (email: string, token: string | null) => {
  const [status, setStatus] = useState<HookStatus>('loading');
  const [underAge, setUnderAge] = useState<boolean>(false);
  const [fullname, setFullname] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAge = async () => {
      try {
        const res = await getUser(email, token as string);

        if (!res) {
          throw new Error('User not found');
        }

        if (!email || !token) {
          throw new Error('Email or token not found');
        }

        const {bornDate, bornMonth, bornYear} = res;
        const formattedBirthday = `${bornYear}-${bornMonth
          .toString()
          .padStart(2, '0')}-${bornDate.toString().padStart(2, '0')}`;
        const age = calculateAge(formattedBirthday);
        const underAge = UNDERAGE_WHITE_LIST.includes(email) ? false : age < 21;

        setUnderAge(underAge);
        setFullname(res.fullname);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred.');
        }
      }
    };

    if (token) {
      fetchUserAge();
    }
  }, [email, token]);

  return {
    underAge,
    fullname,
    status,
    error,
  };
};

export default useUserAge;
