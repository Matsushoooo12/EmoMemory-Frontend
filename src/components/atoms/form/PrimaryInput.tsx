import { Input } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
};

export const PrimaryInput: VFC<Props> = memo((props) => {
  const { placeholder, value, onChange, type, name } = props;
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      name={name}
      variant="flushed"
      focusBorderColor="#47789F"
    />
  );
});
