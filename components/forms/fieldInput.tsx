import React, { Dispatch, SetStateAction } from "react";

interface props {
  setField: Dispatch<SetStateAction<bookIType>>;
  name: string;
  title: string;
  value: bookIType;
  required?: boolean;
  type: string;
  pattern?: string;
  placeholder?: string;
}

function FieldInput({
  name,
  setField,
  title,
  value,
  type,
  pattern,
  placeholder,
  required,
}: props) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setField((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className={`w-full ${type === "textarea" ? "" : `max-w-[300px]`}`}>
      <label>
        {title}
        {required && <span className="text-red-600">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          className="w-full  p-[5px_10px] rounded-[5px] shadow-main border-[1px]"
          name={name}
          placeholder={placeholder && placeholder}
          required={required}
          value={value?.[name] || ""}
          onChange={(e) => {
            handleChange(e);
          }}
        ></textarea>
      ) : (
        <input
          className="w-full  p-[5px_10px] rounded-[5px] shadow-main border-[1px]"
          name={name}
          type={type}
          placeholder={placeholder && placeholder}
          required={required}
          value={value?.[name] || ""}
          onChange={(e) => {
            handleChange(e);
          }}
          pattern={pattern && pattern}
        ></input>
      )}
    </div>
  );
}

export default FieldInput;
