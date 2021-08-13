/* eslint-disable react-hooks/exhaustive-deps */

import { memo, useCallback, useEffect, VFC } from "react";
import {
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  Wrap,
  WrapItem,
  useDisclosure
} from "@chakra-ui/react";

import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";

export const UserManagement: VFC = memo(() => {
  const { getUsers, users, loading } = useAllUsers();

  const { isOpen, onClose, onOpen } = useDisclosure();
  useEffect(() => getUsers(), []);

  const onClickUser = useCallback(() => onOpen(), []);
  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }} justify="space-around">
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <p>テスト</p>
        </ModalContent>
      </Modal>
    </>
  );
});
