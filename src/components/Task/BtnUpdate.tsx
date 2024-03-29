import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  useDisclosure,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { ITask, IBtnUpdate } from "../../interfaces/Task";
import { updateTask } from "../../slices/TaskSlice";
import { useDispatch } from "react-redux";

function BtnUpdate({ task }: IBtnUpdate) {
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newTask, setNew] = useState<ITask>(task);

  const initialRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  function handleTask(e: React.ChangeEvent<HTMLInputElement>) {
    setNew({ ...newTask, description: e.target.value });
  }

  function upTask() {
    const info = task.description.trim();

    if (!info) {
      toast({
        title: "Geben Sie eine Aufgabe ein",
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    dispatch(updateTask(newTask));
    onClose();
  }

  return (
    <>
      <IconButton
        aria-label="Aufgabe bearbeiten"
        icon={<FiEdit />}
        isRound={true}
        onClick={onOpen}
        hidden={task.complete}
      />
      <Modal
        isCentered
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>Aktualisierung der Aufgabe</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="Geben Sie eine Aufgabe ein"
                defaultValue={newTask.description}
                onChange={handleTask}
                onFocus={handleTask}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Abbrechen
            </Button>
            <Button colorScheme="blue" onClick={() => upTask()}>
              Speichern
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BtnUpdate;
