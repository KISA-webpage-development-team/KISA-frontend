import * as Keychain from 'react-native-keychain';

/**
 * save token to mobile keychain
 */
export const saveToken = async (token: string) => {
  await Keychain.setGenericPassword('pocha_token', token);
};

/**
 * get token from mobile keychain
 */
export const getToken = async () => {
  const token = await Keychain.getGenericPassword();
  return token;
};

/**
 * reset token from mobile keychain
 */
export const resetToken = async () => {
  await Keychain.resetGenericPassword();
};
