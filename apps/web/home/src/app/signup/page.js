"use client";

// sign up form
// 이름 + 미시간 이메일

// (optional) 전공 + 출생년도 +  졸업년도 + LinkedIn URL

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "../../constants/env";

// sub-ui components
import RequiredFields from "../../components/SignUp/RequiredFields";
import OptionalFields from "../../components/SignUp/OptionalFields";
import HorizontalDivider from "../../components/shared/HorizontalDivider";
import TermConditions from "../../components/SignUp/TermConditions";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";

import { personalInfoTerm } from "../../config/termCondition";
import { websiteTerm } from "../../config/termCondition";

export default function SignUpPage() {
  const router = useRouter();

  // form states
  const [name, setName] = useState(null); // user input 한글 이름
  const [email, setEmail] = useState(null); // user input 이메일
  const [major, setMajor] = useState(null); // user input 전공
  const [bornDate, setBornDate] = useState(null); // user input 출생년도
  const [gradYear, setGradYear] = useState(null); // user input 졸업년도

  // term conditions
  const [personTermScroll, setPersonTermScroll] = useState(false); // 개인정보 수집 약관 스크롤 [boolean]
  const [personTermChecked, setPersonTermChecked] = useState(false); // 개인정보 수집 약관 동의 [checkbox]
  const [websiteTermScroll, setWebsiteTermScroll] = useState(false); // 웹사이트 이용 약관 스크롤 [boolean]
  const [websiteTermChecked, setWebsiteTermChecked] = useState(false); // 웹사이트 이용 약관 동의 [checkbox]

  // optional fields
  const [linkedIn, setLinkedIn] = useState(null); // user input linkedIn URL

  // form validity
  const [disabled, setDisabled] = useState(true);

  // required fields
  const requiredFields = useMemo(
    () => [
      {
        value: name,
        setValue: setName,
        label: "Name",
        type: "text",
        placeholder: "ex) Jioh In",
        isError: true,
        errorMsg:
          "This is the name that will be used on the bulletin board.Please use your real name.",
        errorState: "alert",
      },
      {
        value: email,
        setValue: setEmail,
        label: "UMich Email",
        type: "email",
        placeholder: "ex) example@umich.edu",
        isError:
          (!email?.endsWith("@umich.edu") && email?.length > 0) ||
          email?.length === 0,
        errorMsg: "Please enter a valid umich email.",
        errorState: "error",
      },
      {
        value: major,
        setValue: setMajor,
        label: "Major",
        type: "text",
        placeholder: "ex) Computer Science",
        isError: major?.length === 0,
        errorMsg: "Please enter your major.",
        errorState: "error",
      },
      {
        value: bornDate,
        setValue: setBornDate,
        label: "Birthdate",
        type: "date",
        isError: bornDate !== null && bornDate?.length !== 10,
        errorMsg: "Please enter your birthdate.",
        errorState: "error",
      },
      {
        value: gradYear,
        setValue: setGradYear,
        label: "Graduation Year (YYYY)",
        type: "number",
        isError: gradYear !== null && gradYear?.length !== 4,
        errorMsg: "Please enter a valid graduation year.",
        errorState: "error",
      },
    ],
    [name, email, major, bornDate, gradYear]
  );

  const optionalFields = [
    {
      value: linkedIn,
      setValue: setLinkedIn,
      label: "LinkedIn URL",
      type: "url",
      errorState: "none",
    },
  ];

  // form validity check
  useEffect(() => {
    // term condition check
    if (!personTermChecked || !websiteTermChecked) {
      setDisabled(true);
      return;
    }

    // additional error check on name
    const isNameValid = name?.length > 0;
    if (!isNameValid) {
      setDisabled(true);
      return;
    }

    for (const field of requiredFields) {
      if (
        (field.errorState === "error" && field.isError) ||
        field.value === null
      ) {
        setDisabled(true);
        return;
      }
    }
    setDisabled(false);
  }, [requiredFields, name, personTermChecked, websiteTermChecked]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      fullname: name,
      email: email,
      bornYear: bornDate.split("-")[0] ? Number(bornDate.split("-")[0]) : null,
      bornDate: bornDate.split("-")[2] ? Number(bornDate.split("-")[2]) : null,
      bornMonth: bornDate.split("-")[1] ? Number(bornDate.split("-")[1]) : null,
      major: major ? major : null,
      gradYear: gradYear ? Number(gradYear) : null,
      linkedin: linkedIn ? linkedIn : null,
    };

    const userConfirmed = window.confirm(
      "한 번 생성된 로그인 정보 수정은 어렵습니다. 진행하시겠습니까?"
    );

    if (!userConfirmed) {
      return;
    }

    // user exists check
    try {
      const res = await axios.get(`${BACKEND_URL}/auth/userExists/${email}`);

      if (res.status === 200) {
        window.alert("이미 가입된 이메일입니다.");
        window.location.href = "/";
        return;
      }
    } catch {
      //   // send /auth/signup api call to create a new user

      const url = `${BACKEND_URL}/auth/signup/`;
      try {
        const res = await axios.post(url, userData);
        if (res.status === 201) {
          // redirect to home
          return router.push(`/signup/${name}`);
        }
        // add error notification
        return;
      } catch (err) {
        window.alert("회원가입에 실패했습니다.");
        // add error notification
        return;
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-10
    max-w-sm h-full mx-auto mb-20"
    >
      <div className="flex flex-col text-center gap-1 items-center">
        <h1 className={`${sejongHospitalBold.className} text-2xl`}>
          Welcome to KISA!
        </h1>
        <h2 className={`${sejongHospitalLight.className}`}>
          Please enter the following information to sign up.
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col 
        gap-6 md:gap-8
         items-center w-full px-4"
      >
        {/* required inputs */}
        <RequiredFields fields={requiredFields} />

        {/*  divider  */}
        <HorizontalDivider color="gray" />

        {/* optional inputs: linkedIn */}
        <OptionalFields fields={optionalFields} />

        <HorizontalDivider color="gray" />
        <>
          {/* 개인정보수집약관 */}
          <TermConditions
            isScrolledToBottom={personTermScroll}
            setIsScrolledToBottom={setPersonTermScroll}
            label={personalInfoTerm.label}
            text={personalInfoTerm.text}
            checkboxLabel={personalInfoTerm.checkboxLabel}
            termChecked={personTermChecked}
            setTermChecked={setPersonTermChecked}
          />
          {/* 웹사이트 이용약관 */}
          <TermConditions
            isScrolledToBottom={websiteTermScroll}
            setIsScrolledToBottom={setWebsiteTermScroll}
            label={websiteTerm.label}
            text={websiteTerm.text}
            checkboxLabel={websiteTerm.checkboxLabel}
            termChecked={websiteTermChecked}
            setTermChecked={setWebsiteTermChecked}
          />
        </>

        <button
          type="submit"
          className="w-full primary_btn"
          disabled={disabled}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
