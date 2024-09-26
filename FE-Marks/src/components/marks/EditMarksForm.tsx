import { useForm } from "../../hooks/useForm";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { TMark, TNewMark } from "../../types/mark";
import { useEditMarkMutation } from "../../redux/endpoints/marks";

const EditMarkFrom = ({
  mark,
  setOpen,
}: {
  mark: TMark;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { reset: resetTag, ...tag } = useForm("text");
  const { reset: resetTitle, ...title } = useForm("text");
  const { reset: resetUrl, ...url } = useForm("text");

  const [updateMark, { isLoading: isUpdateLoading }] = useEditMarkMutation();

  const editMark = async (e: FormEvent) => {
    e.preventDefault();

    const markObject: TNewMark = {
      title: title.value,
      tag: tag.value,
      url: url.value,
    };

    updateMark(markObject);

    setOpen(false);

    resetTag();
    resetUrl();
    resetTitle();
  };
};

export default EditMarkFrom;
