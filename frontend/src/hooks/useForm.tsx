import { ChangeEvent, useState } from "react";

export default function useForm(type: string) {
  const [value, setValue] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const reset = () => setValue("");

  return { value, onChange, reset, type };
}
