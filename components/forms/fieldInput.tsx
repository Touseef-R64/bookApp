import React, { Dispatch, SetStateAction } from "react";
import { dateformateHandler } from "../../utils/dateformat";

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
  const currentDate = new Date().toISOString().split("T")[0];
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
          value={
            type === "date"
              ? dateformateHandler(value?.[name])?.standardDateReverse
              : value?.[name] || ""
          }
          onChange={(e) => {
            handleChange(e);
          }}
          max={type === "date" ? currentDate : null}
          pattern={pattern && pattern}
        ></input>
      )}
    </div>
  );
}

export default FieldInput;
