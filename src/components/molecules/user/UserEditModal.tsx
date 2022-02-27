import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { memo, VFC } from 'react';

import { ResetButton } from '../../atoms/button/ResetButton';
import { SubmitButton } from '../../atoms/button/SubmitButton';
import HappyFace from '../../../images/HappyFace.png';
import AngerFace from '../../../images/AngerFace.png';
import SorrowFace from '../../../images/SorrowFace.png';
import FunFace from '../../../images/FunFace.png';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleEmotionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emotionFace: string;
  name: string;
  onClickHappyFace: () => void;
  onClickAngerFace: () => void;
  onClickSorrowFace: () => void;
  onClickFunFace: () => void;
  handleUpdateUser: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  handleReset: () => void;
};

export const UserEditModal: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    handleEmotionChange,
    emotionFace,
    name,
    handleNameChange,
    onClickHappyFace,
    onClickAngerFace,
    onClickSorrowFace,
    onClickFunFace,
    handleUpdateUser,
    handleReset,
  } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent shadow="md" width="480px" height="430px">
        <ModalBody textAlign="center">
          <ModalCloseButton
            mt="16px"
            mr="16px"
            fontSize="16px"
            fontWeight="bold"
          />
          <Box width="320px" mx="auto">
            <Heading as="h1" fontSize="32px" mt="40px" mb="32px">
              プロフィール編集
            </Heading>
            <form>
              <InputGroup display="block" position="relative">
                <Stack spacing="24px">
                  <Input
                    type="hidden"
                    name="emotion"
                    onChange={handleEmotionChange}
                    value={emotionFace}
                  />
                  <Input
                    placeholder="名前"
                    value={name}
                    onChange={handleNameChange}
                    type="text"
                    name="name"
                    variant="flushed"
                    focusBorderColor="#47789F"
                    mb="24px"
                  />
                  <Box>
                    <Heading as="h2" fontSize="24px" mb="16px">
                      あなたの今の感情は？
                    </Heading>
                    <Flex justify="center">
                      <HStack spacing="8px">
                        <Image
                          src={HappyFace}
                          width="60px"
                          height="60px"
                          border={
                            emotionFace === 'happy'
                              ? '5px solid yellow'
                              : 'none'
                          }
                          shadow={emotionFace === 'happy' ? 'md' : 'none'}
                          onClick={onClickHappyFace}
                        />
                        <Image
                          src={AngerFace}
                          width="60px"
                          height="60px"
                          border={
                            emotionFace === 'anger' ? '5px solid red' : 'none'
                          }
                          shadow={emotionFace === 'anger' ? 'md' : 'none'}
                          onClick={onClickAngerFace}
                        />
                        <Image
                          src={SorrowFace}
                          width="60px"
                          height="60px"
                          border={
                            emotionFace === 'sorrow' ? '5px solid blue' : 'none'
                          }
                          shadow={emotionFace === 'sorrow' ? 'md' : 'none'}
                          onClick={onClickSorrowFace}
                        />
                        <Image
                          src={FunFace}
                          width="60px"
                          height="60px"
                          border={
                            emotionFace === 'fun' ? '5px solid green' : 'none'
                          }
                          shadow={emotionFace === 'fun' ? 'md' : 'none'}
                          onClick={onClickFunFace}
                        />
                      </HStack>
                    </Flex>
                  </Box>
                  <Flex justify="center">
                    <HStack spacing="16px">
                      <SubmitButton
                        handleSubmit={handleUpdateUser}
                        width="80px"
                      >
                        更新
                      </SubmitButton>
                      <ResetButton handleReset={handleReset} width="80px">
                        リセット
                      </ResetButton>
                    </HStack>
                  </Flex>
                </Stack>
              </InputGroup>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
