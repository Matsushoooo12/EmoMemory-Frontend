import { Textarea } from '@chakra-ui/react';
import { memo, VFC } from 'react';

type Props = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  className: string;
};

export const PrimaryTextarea: VFC<Props> = memo((props) => {
  const { placeholder, value, onChange, name, className } = props;

  return (
    <Textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      variant="flushed"
      focusBorderColor="#47789F"
      className={className}
    />
  );
});
