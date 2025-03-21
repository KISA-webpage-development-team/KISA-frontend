import React, {useState, useEffect, useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Alert,
  Button,
} from 'react-native';
import CustomInput from '@/shared/components/CustomInput';
import ErrorDisplay from '@/shared/components/ErrorDisplay';
import CustomLabel from '@/shared/components/CustomLabel';
import HorizontalDivider from '@/shared/components/HorizontalDivider';
import RequiredFields from '@/shared/components/signup/RequiredFields'
import axios from 'axios';
// import { BACKEND_URL } from '@/constants/env';

export default function SignUpScreen({navigation}) {
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('');
  const [bornDate, setBornDate] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  // Terms & Conditions
  const [personTermChecked, setPersonTermChecked] = useState(false);
  const [websiteTermChecked, setWebsiteTermChecked] = useState(false);

  // Form validation state
  const [disabled, setDisabled] = useState(true);

  const requiredFields = useMemo(
    () => [
      {
        value: name,
        setValue: setName,
        label: '이름 (본명)',
        placeholder: '예) 홍길동',
        error: name.length === 0,
        errorMsg: '게시판에 사용될 이름입니다. 반드시 실명으로 작성해주세요.',
        errorState: 'alert',
      },
      {
        value: email,
        setValue: setEmail,
        label: 'umich 이메일',
        placeholder: '예) example@umich.edu',
        error: !email.endsWith('@umich.edu') || email.length === 0,
        errorMsg: '유효한 미시간 이메일을 입력해주세요.',
        errorState: 'error',
      },
      {
        value: major,
        setValue: setMajor,
        label: '전공 (major)',
        placeholder: '예) Computer Science',
        error: major.length === 0,
        errorMsg: '전공을 입력해주세요.',
        errorState: 'error',
      },
      {
        value: bornDate,
        setValue: setBornDate,
        label: '생년월일',
        placeholder: 'YYYY-MM-DD',
        error: bornDate.length !== 10,
        errorMsg: '출생년도를 입력해주세요.',
        errorState: 'error',
      },
      {
        value: gradYear,
        setValue: setGradYear,
        label: '졸업년도 (YYYY)',
        placeholder: '예) 2026',
        error: gradYear.length !== 4,
        errorMsg: '정확한 졸업년도를 입력해주세요.',
        errorState: 'error',
      },
    ],
    [name, email, major, bornDate, gradYear],
  );

  useEffect(() => {
    if (!personTermChecked || !websiteTermChecked) {
      setDisabled(true);
      return;
    }

    for (const field of requiredFields) {
      if (field.error || field.value === '') {
        setDisabled(true);
        return;
      }
    }
    setDisabled(false);
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
    <SafeAreaView style={{flex: 1, padding: 16}}>
      <ScrollView>
        {/* Header */}
        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
          키사에 처음 오신걸 환영합니다!
        </Text>
        <Text style={{fontSize: 16, textAlign: 'center', marginBottom: 20}}>
          회원가입을 위해 아래 정보를 입력해주세요.
        </Text>

        {/* Required Fields */}
        <RequiredFields fields={requiredFields} />
         {/* {requiredFields.map((field, index) => (
          <View key={index} style={{marginBottom: 10}}>
            <CustomLabel text={field.label} required={true} />{' '}
            <CustomInput
              value={field.value}
              onChangeText={field.setValue}
              placeholder={field.placeholder}
            />
            {field.error && (
              <ErrorDisplay message={field.errorMsg} state={field.errorState} />
            )}
          </View>
        ))}  */}

        <HorizontalDivider color={'dark'} />

        {/* Optional Fields */}
        <View style={{marginBottom: 10}}>
          <CustomLabel text={'LinkedIn URL'} required={false} />
          <CustomInput
            value={linkedIn}
            onChangeText={setLinkedIn}
            placeholder="예) https://linkedin.com/in/yourname"
          />
        </View>

        <HorizontalDivider color={'dark'} />

        {/* Terms & Conditions */}
        <View style={{marginBottom: 20}}>
          <Text style={{fontWeight: 'bold'}}>개인정보 수집 약관</Text>
          <Text>약관 내용을 스크롤하여 확인하세요.</Text>
          <Button
            title="동의합니다"
            onPress={() => setPersonTermChecked(!personTermChecked)}
            color={personTermChecked ? 'green' : 'gray'}
          />
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={{fontWeight: 'bold'}}>웹사이트 이용 약관</Text>
          <Text>약관 내용을 스크롤하여 확인하세요.</Text>
          <Button
            title="동의합니다"
            onPress={() => setWebsiteTermChecked(!websiteTermChecked)}
            color={websiteTermChecked ? 'green' : 'gray'}
          />
        </View>

        {/* Submit Button */}
        <Button
          title="회원가입 제출"
          // onPress={handleSubmit}
          disabled={disabled}
          color={disabled ? 'gray' : 'blue'}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
