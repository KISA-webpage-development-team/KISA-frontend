import { updateUser } from "@/apis/users/mutations";
import { CustomButton } from "@/final_refactor_src/components/button";
import { CustomFormItem } from "@/final_refactor_src/components/form";
import React, { memo, useCallback, useState } from "react";

type UserEditFormProps = {
  major: string;
  setMajor: (value: string) => void;
  gradYear: number;
  setGradYear: (value: number) => void;
  linkedIn: string;
  setLinkedIn: (value: string) => void;
  email: string;
  token: string;
};

const UserEditForm = ({
  major,
  setMajor,
  gradYear,
  setGradYear,
  linkedIn,
  setLinkedIn,
  email,
  token,
}: UserEditFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // [Business Logic]: update the user information
    const data = {
      major: major,
      gradYear: gradYear, // number
      linkedin: linkedIn,
    };

    try {
      const res = await updateUser(email, data, token);

      // [TODO] Error HAndling
      if (!res) {
        alert("정보 수정에 실패했습니다.");
        setLoading(false);
        throw new Error("Failed to update user information");
      }

      alert("정보가 성공적으로 수정되었습니다.");
      setLoading(false);
      window.location.replace(`/users/${email}`);
      return;
    } catch (err) {
      throw new Error("Failed to update user information");
    }
  };

  // Form Validation -----------------------------------------------------------
  const gradYearValidation = (value: string) => {
    const year = parseInt(value, 10);
    if (isNaN(year) || year <= 1900 || year >= 3000) {
      return "졸업년도를 다시 확인해주세요.";
    }
    return null;
  };

  return (
    <form
      className="flex-1 
    flex flex-col gap-6
    max-w-2xl"
    >
      {/* Major */}
      <CustomFormItem
        htmlFor="major"
        labelText="전공 (Major)"
        type="text"
        value={major}
        onChange={(e) => setMajor(e.target.value)}
        required
      />

      {/* Grad Year */}
      <CustomFormItem
        htmlFor="gradYear"
        labelText="졸업년도 (Graduation Year)"
        type="number"
        value={String(gradYear)}
        onChange={(e) => setGradYear(parseInt(e.target.value))}
        validationRules={[gradYearValidation]}
        required
      />

      {/* LinkedIn */}
      <CustomFormItem
        htmlFor="linkedIn"
        labelText="LinkedIn"
        type="text"
        value={linkedIn}
        onChange={(e) => setLinkedIn(e.target.value)}
      />

      <CustomButton
        forSubmit={true}
        type="primary"
        text="수정"
        onClick={handleSubmit}
        // [NOTE] This is kind of stupid abstraction
        // It's better to handle this using something like custom useForm hook
        disabled={
          loading || !major || !gradYear || gradYear <= 1900 || gradYear >= 3000
        }
      />
    </form>
  );
};

export default memo(UserEditForm);
