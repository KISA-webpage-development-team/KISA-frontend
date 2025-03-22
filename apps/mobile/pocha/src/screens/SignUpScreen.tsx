import React, {useState, useEffect, useMemo} from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Alert,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// https://github.com/farhoudshapouran/react-native-ui-datepicker
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // or 'ko' for Korean

import CustomInput from '@/shared/components/form/CustomInput';
import ErrorDisplay from '@/shared/components/feedback/ErrorDisplay';
import CustomLabel from '@/shared/components/form/CustomLabel';
import HorizontalDivider from '@/shared/components/divider/HorizontalDivider';
import RequiredFields from '@/shared/components/signup/RequiredFields';
import TermConditions from '@/shared/components/signup/TermConditions';
import {
  personalInfoTerm,
  websiteInfoTerm,
} from '@/shared/components/config/TermCondition';
import OptionalFields from '@/shared/components/signup/OptionalFields';

export default function SignUpScreen({}) {
  // add "navigation" into the parameter here
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
  const requiredFields = [
    {
      value: name,
      setValue: setName,
      label: '이름 (본명)',
      type: 'text',
      placeholder: '예) 홍길동',
      validationRules: [
        (value: string) =>
          true
            ? '게시판에 사용될 이름입니다. 반드시 실명으로 작성해주세요.'
            : null,
      ],
    },
    {
      value: email,
      setValue: setEmail,
      label: 'umich 이메일',
      type: 'email',
      placeholder: '예) example@umich.edu',
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
      placeholder: '예) Computer Science',
      validationRules: [
        (value: string) => (!value.trim() ? '전공을 입력해주세요.' : null),
      ],
    },
    {
      value: birthDate,
      setValue: setBirthDate,
      label: '생년월일',
      type: 'date',
      placeholder: '예) 2000-01-01',
      // validationRules: [
      //   (value: string) =>
      //     !value.trim() ? '생년월일을 입력해주세요.' : null,
      // ],
    },
    {
      value: gradYear,
      setValue: setGradYear,
      label: '졸업년도 (YYYY)',
      type: 'number',
      placeholder: '예) 2026',
      validationRules: [
        (value: string) =>
          value.length !== 4 ? '정확한 졸업년도를 입력해주세요.' : null,
      ],
    },
  ];

  // Optional Fields
  const optionalFields = [
    {
      value: linkedIn,
      setValue: setLinkedIn,
      label: 'LinkedIn URL',
      type: 'text',
      placeholder: '예) https://linkedin.com/in/yourname',
    },
  ];

  useEffect(() => {
    if (!personTermChecked || !websiteTermChecked) {
      setDisabled(true);
      return;
    }

    // Update validation check to use the new validation rules
    const hasInvalidFields = requiredFields.some(field => {
      if (!field.value) return true;
      if (field.validationRules) {
        return field.validationRules.some(rule => rule(field.value) !== null);
      }
      return false;
    });

    setDisabled(hasInvalidFields);
  }, [requiredFields, personTermChecked, websiteTermChecked]);

  // BACKEND REQUIRED!
  // const handleSubmit = async () => {
  //   const userData = {
  //     fullname: name,
  //     email: email,
  //     bornYear: bornDate.split('-')[0] ? Number(bornDate.split('-')[0]) : null,
  //     bornMonth: bornDate.split('-')[1] ? Number(bornDate.split('-')[1]) : null,
  //     bornDate: bornDate.split('-')[2] ? Number(bornDate.split('-')[2]) : null,
  //     major: major || null,
  //     gradYear: gradYear ? Number(gradYear) : null,
  //     linkedin: linkedIn || null,
  //   };

  //   const userConfirmed = Alert.alert(
  //     '확인',
  //     '한 번 생성된 로그인 정보 수정은 어렵습니다. 진행하시겠습니까?',
  //     [
  //       {text: '취소', style: 'cancel'},
  //       {text: '확인', onPress: async () => registerUser(userData)},
  //     ],
  //   );

  //   if (!userConfirmed) return;
  // };

  // const registerUser = async userData => {
  //   try {
  //     const res = await axios.get(`${BACKEND_URL}/auth/userExists/${email}`);
  //     if (res.status === 200) {
  //       Alert.alert('알림', '이미 가입된 이메일입니다.');
  //       navigation.navigate('Home');
  //       return;
  //     }
  //   } catch {
  //     try {
  //       const res = await axios.post(`${BACKEND_URL}/auth/signup/`, userData);
  //       if (res.status === 201) {
  //         navigation.navigate(`SignUpSuccess`, {name});
  //       } else {
  //         Alert.alert('오류', '회원가입에 실패했습니다.');
  //       }
  //     } catch (err) {
  //       Alert.alert('오류', '회원가입 중 문제가 발생했습니다.');
  //     }
  //   }
  // };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerLargeText}>
            키사에 처음 오신걸 환영합니다!
          </Text>
          <Text style={styles.headerSmallText}>
            회원가입을 위해 아래 정보를 입력해주세요.
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
            {backgroundColor: disabled ? 'gray' : 'blue'},
          ]}
          // onPress={handleSubmit}
          onPress={() => Alert.alert('앙 지오쨩 상랑행 뀨우~~ 잘해찌이이?')}
          disabled={disabled}>
          <Text style={[styles.submitButtonText]}>회원가입 제출</Text>
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
    rowGap: 8,
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
