import { ChangeEvent, useState } from "react";

export const useForm = (type: string) => {
  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const reset = () => setValue("");

  return { value, onChange, type, reset };
};
