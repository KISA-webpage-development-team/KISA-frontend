"use client";

// 이름 또는 단체 (required)
// 이메일 주소 (required)
// 내용 (required)
// ‘Contact Us (보내기)’ 버튼

import { useForm } from "react-hook-form";
// import { sendEmail } from "../../service/contact";

const Contact = () => {
  const { register, handleSubmit } = useForm();

  // styles
  const inputStyle =
    "w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-blue-500 focus:shadow-md";

  const labelStyle = "mb-3 flex gap-1 text-base font-medium text-black";

  function onSubmit(data) {
    // sendEmail(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
      <div className="mb-5">
        <label htmlFor="name" className={labelStyle}>
          이름 또는 단체
          <p className="text-red-500">*</p>
        </label>
        <input
          type="text"
          className={inputStyle}
          {...register("name", { required: true })}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className={labelStyle}>
          이메일 주소
          <p className="text-red-500">*</p>
        </label>
        <input
          type="email"
          className={inputStyle}
          {...register("email", { required: true })}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="message" className={labelStyle}>
          내용
          <p className="text-red-500">*</p>
        </label>
        <textarea
          rows={4}
          className={`${inputStyle} resize-none`}
          {...register("message", { required: true })}
        ></textarea>
      </div>
      <div>
        <button className="hover:shadow-form rounded-md bg-blue-500 py-2 px-6 text-base font-semibold text-white outline-none">
          Contact Us
        </button>
      </div>
    </form>
  );
};

export default Contact;
