import React, {useState, useEffect, useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// ui components
import HorizontalDivider from '@/shared/components/divider/HorizontalDivider';
import RequiredFields from '@/shared/components/signup/RequiredFields';
import TermConditions from '@/shared/components/signup/TermConditions';
import {personalInfoTerm, websiteInfoTerm} from '@/shared/config/TermCondition';
import OptionalFields from '@/shared/components/signup/OptionalFields';
import BackIcon from '@/shared/components/icon/BackIcon';

// apis
import {getUserExists, createNewUser} from '@/apis/auth';

// hooks
import {useMainNavigation} from '@/navigations/useMainNavigation';
import {useAuthNavigation} from '@/navigations/useAuthNavigation';
import {decomposeDate} from '@/utils/data';
import {useUser} from '@/contexts/UserContext';
import {useTranslation} from 'react-i18next';
// types
import {User} from '@/types/user';

// date formatter
import 'dayjs/locale/fr'; // or 'ko' for Korean

function HeaderBackButton() {
  const navigation = useMainNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleGoBack}>
      <BackIcon />
    </TouchableOpacity>
  );
}

export default function SignUpScreen({}) {
  // add "navigation" into the parameter here
  const navigation_sign = useAuthNavigation();

  const {signInWithGoogle} = useUser();

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('');
  const [birthDate, setBirthDate] = useState(new Date()); // Default to current date
  const [gradYear, setGradYear] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  // Date Picker Modal Visibility
  const [showDatePicker, setShowDatePicker] = useState(false);
  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);

  // Terms & Conditions
  const [personTermScroll, setPersonTermScroll] = useState(false); // 개인정보 수집 약관 스크롤 [boolean]
  const [personTermChecked, setPersonTermChecked] = useState(false);
  const [websiteTermChecked, setWebsiteTermChecked] = useState(false);
  const [websiteTermScroll, setWebsiteTermScroll] = useState(false); // 웹사이트 이용 약관 스크롤 [boolean]

  // Form validation state
  const [disabled, setDisabled] = useState(true);
  // Required Fields
  const requiredFields = useMemo(
    () => [
      {
        value: name,
        setValue: setName,
        label: '이름 (name)',
        type: 'text',
        placeholder: 'ex) John Doe',
        validationRules: [
          (value: string) =>
            !value.trim()
              ? '게시판에 사용될 이름입니다. 반드시 실명으로 작성해주세요.'
              : null,
        ],
      },
      {
        value: email,
        setValue: setEmail,
        label: 'umich email',
        type: 'email',
        placeholder: 'ex) example@umich.edu',
        validationRules: [
          (value: string) =>
            !value.endsWith('@umich.edu')
              ? '유효한 미시간 이메일을 입력해주세요.'
              : null,
        ],
      },
      {
        value: major,
        setValue: setMajor,
        label: '전공 (major)',
        type: 'text',
        placeholder: 'ex) Computer Science',
        validationRules: [
          (value: string) => (!value.trim() ? '전공을 입력해주세요.' : null),
        ],
      },
      {
        value: birthDate,
        setValue: setBirthDate,
        label: 'Birth Date',
        type: 'date',
        placeholder: 'ex) 2000-01-01',
      },
      {
        value: gradYear,
        setValue: setGradYear,
        label: 'Graduation Year (YYYY)',
        type: 'number',
        placeholder: 'ex) 2026',
        validationRules: [
          (value: string) =>
            value.length !== 4
              ? 'Please enter the correct graduation year.'
              : null,
        ],
      },
    ],
    [name, email, major, birthDate, gradYear],
  );

  // Optional Fields
  const optionalFields = useMemo(
    () => [
      {
        value: linkedIn,
        setValue: setLinkedIn,
        label: 'LinkedIn URL',
        type: 'text',
        placeholder: '예) https://linkedin.com/in/yourname',
      },
    ],
    [linkedIn],
  );

  useEffect(() => {
    if (!personTermChecked || !websiteTermChecked) {
      setDisabled(true);
      return;
    }

    // Update validation check to use the new validation rules
    const hasInvalidFields = requiredFields.some(field => {
      if (!field.value) {
        return true;
      }
      if (field.validationRules) {
        return field.validationRules.some(rule => rule(field.value) !== null);
      }
      return false;
    });

    setDisabled(hasInvalidFields);
  }, [requiredFields, personTermChecked, websiteTermChecked]);

  const handleSubmit = async () => {
    const {year, month, day} = decomposeDate(birthDate);

    const userData: Omit<User, 'created'> = {
      fullname: name,
      email: email,
      bornYear: year,
      bornMonth: month,
      bornDate: day,
      major: major || '',
      gradYear: gradYear ? Number(gradYear) : 0,
      linkedin: linkedIn || '',
    };

    Alert.alert(
      'Confirm',
      'Once created, login information cannot be modified. Proceed?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Confirm', onPress: async () => registerUser(userData)},
      ],
    );
  };

  const registerUser = async (userData: Omit<User, 'created'>) => {
    try {
      const res = await getUserExists(userData.email);

      // if user already exists, navigate to landing screen
      // let user to sign in again
      if (res.status == 200) {
        Alert.alert('Alert', 'Already registered email');
        navigation_sign.navigate('LandingScreen');
        return;
      }
    } catch {
      // [NOTE] userExists API returns 404 if user does not exist
      // so the catch block will be executed
      // if user does not exist, create new user

      try {
        const res = await createNewUser(userData);
        if (res.status === 201) {
          // success, instead of redirecting to landing screen
          // let user to sign in with google
          try {
            await signInWithGoogle();
            // pretty sure that the result is always success
          } catch (err) {
            Alert.alert('Error', 'Failed to sign in with Google');
          }
        } else {
          Alert.alert('Error', 'Failed to sign up');
        }
      } catch (err) {
        Alert.alert('Error', 'Something went wrong');
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerBackButtonContainer}>
            <HeaderBackButton />
          </View>

          <Text style={styles.headerLargeText}>Welcome to UMich KISA</Text>
          <Text style={styles.headerSmallText}>
            Please fill out the following information to sign up.
          </Text>
        </View>

        {/* Required Fields */}
        <View style={styles.fieldsContainer}>
          {/* @ts-ignore */}
          <RequiredFields fields={requiredFields} />

          <View style={styles.dividerSpacingOne}>
            <HorizontalDivider color={'dark'} />
          </View>

          {/* Optional Fields */}
          {/* @ts-ignore */}
          <OptionalFields fields={optionalFields} />

          <View style={styles.dividerSpacingTwo}>
            <HorizontalDivider color={'dark'} />
          </View>
          {/* Terms & Conditions */}
          <View style={styles.termsContainer}>
            <TermConditions
              isScrolledToBottom={personTermScroll}
              setIsScrolledToBottom={setPersonTermScroll}
              termChecked={personTermChecked}
              setTermChecked={setPersonTermChecked}
              label={personalInfoTerm.label}
              text={personalInfoTerm.text}
              checkboxLabel={personalInfoTerm.checkboxLabel}
            />
            {/* Website Conditions */}
            <TermConditions
              isScrolledToBottom={websiteTermScroll}
              setIsScrolledToBottom={setWebsiteTermScroll}
              termChecked={websiteTermChecked}
              setTermChecked={setWebsiteTermChecked}
              label={websiteInfoTerm.label}
              text={websiteInfoTerm.text}
              checkboxLabel={websiteInfoTerm.checkboxLabel}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            {backgroundColor: disabled ? 'gray' : '#4B90E2'},
          ]}
          onPress={handleSubmit}
          disabled={disabled}>
          <Text style={[styles.submitButtonText]}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '6%',
    paddingHorizontal: '7%',
  },
  // Header
  headerContainer: {
    rowGap: 10,
  },
  headerBackButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  headerLargeText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Sejong-hospital-Bold',
  },
  headerSmallText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Sejong-hospital-Light',
  },
  // Fields
  fieldsContainer: {
    marginTop: '10%',
    flex: 1,
    width: '100%',
  },
  dividerSpacingOne: {
    marginVertical: 24,
  },
  dividerSpacingTwo: {
    marginVertical: 12,
  },
  // Terms & Conditions
  termsContainer: {
    marginTop: '2%',
    rowGap: 24,
  },
  // Submit Button
  submitButton: {
    marginVertical: '10%',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  submitButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Sejong-hospital-Bold',
  },
});
