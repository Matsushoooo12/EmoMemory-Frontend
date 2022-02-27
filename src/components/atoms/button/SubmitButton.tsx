import { Button } from '@chakra-ui/react';
import { memo, ReactNode, VFC } from 'react';

type Props = {
  children: ReactNode;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  width: string;
};

export const SubmitButton: VFC<Props> = memo((props) => {
  const { children, handleSubmit, width } = props;
  return (
    <Button
      bg="#47789F"
      color="white"
      _hover={{ opacity: 0.8 }}
      onClick={(e) => handleSubmit(e)}
      width={width}
    >
      {children}
    </Button>
  );
});
