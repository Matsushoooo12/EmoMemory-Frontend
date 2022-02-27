import { Button } from '@chakra-ui/react';
import { memo, ReactNode, VFC } from 'react';

type Props = {
  showLabel: string;
  setShowLabel: React.Dispatch<React.SetStateAction<string>>;
  labelText: string;
  children: ReactNode;
};

export const ProfileTabButton: VFC<Props> = memo((props) => {
  const { showLabel, setShowLabel, labelText, children } = props;
  return (
    <Button
      width="100px"
      onClick={() => setShowLabel(`${labelText}`)}
      bg={showLabel === `${labelText}` ? '#47789F' : 'white'}
      color={showLabel === `${labelText}` ? 'white' : '#47789F'}
      border={showLabel === `${labelText}` ? 'none' : '3px solid #47789F'}
      _hover={{ opacity: 0.8 }}
    >
      {children}
    </Button>
  );
});
