import CustomField from "../shared/CustomField";

export default function OptionalFields({ fields }) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {fields.map(
        (
          {
            value,
            setValue,
            label,
            type,
            placeholder,
            isError,
            errorMsg,
            errorState,
          },
          index
        ) => (
          <div key={index} className="w-full">
            <CustomField
              value={value}
              setValue={setValue}
              label={label}
              required={false}
              type={type}
              placeholder={placeholder}
              isError={isError}
              errorMsg={errorMsg}
              errorState={errorState}
            />
          </div>
        )
      )}
    </div>
  );
}
