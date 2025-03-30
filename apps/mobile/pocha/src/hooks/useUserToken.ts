// hook to get user's token from keychain

import {getToken} from '@/shared/lib/react-native-keychain/keychain';
import {useEffect, useState} from 'react';
import {UserCredentials} from 'react-native-keychain';
import {HookStatus} from './types';

const useUserToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<HookStatus>('loading');
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        if (token) {
          setToken(token?.password);
          setStatus('success');
        } else {
          setStatus('error');
          setError('No token found');
        }
      } catch (error) {
        setStatus('error');
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Something went wrong...');
        }
      }
    };

    fetchToken();
  }, []);

  return {token, status, error};
};

export default useUserToken;
