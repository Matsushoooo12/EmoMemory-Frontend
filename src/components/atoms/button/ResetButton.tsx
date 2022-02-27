import { Button } from '@chakra-ui/react';
import { memo, ReactNode, VFC } from 'react';

type Props = {
  children: ReactNode;
  handleReset: () => void;
  width: string;
};

export const ResetButton: VFC<Props> = memo((props) => {
  const { children, handleReset, width } = props;
  return (
    <Button
      border="3px solid #47789F"
      color="#47789F"
      onClick={handleReset}
      width={width}
    >
      {children}
    </Button>
  );
});
