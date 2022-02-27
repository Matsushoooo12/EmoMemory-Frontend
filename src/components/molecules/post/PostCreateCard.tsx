import { Box, Flex, HStack, Input, Textarea } from '@chakra-ui/react';
import { memo, VFC } from 'react';

import { ResetButton } from '../../atoms/button/ResetButton';
import { SubmitButton } from '../../atoms/button/SubmitButton';

type Props = {
  EmotionCard: string;
  handleEmotionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  content: string;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  handleReset: () => void;
  textareaStyle: string;
};

export const PostCreateCard: VFC<Props> = memo((props) => {
  const {
    EmotionCard,
    handleEmotionChange,
    handleContentChange,
    content,
    handleSubmit,
    handleReset,
    textareaStyle,
  } = props;
  return (
    <Box
      bgImage={EmotionCard}
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      width="400px"
      height="400px"
    >
      <Box textAlign="center" pt="150px">
        <form>
          <Input type="hidden" name="emotion" onChange={handleEmotionChange} />
          <Textarea
            resize="none"
            variant="unstyled"
            // className="textarea note happy"
            className={textareaStyle}
            width="60%"
            height="210px"
            onChange={handleContentChange}
            value={content}
          />
          <Flex justify="center" mt="56px">
            <HStack spacing="16px">
              <SubmitButton handleSubmit={handleSubmit} width="80px">
                投稿
              </SubmitButton>
              <ResetButton handleReset={handleReset} width="80px">
                リセット
              </ResetButton>
            </HStack>
          </Flex>
        </form>
      </Box>
    </Box>
  );
});
