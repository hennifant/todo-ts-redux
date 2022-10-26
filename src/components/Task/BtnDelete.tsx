import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { IBtnDelete } from "../../interfaces/Task";
import { deleteTask, deleteAllTasks } from "../../slices/TaskSlice";
import { useDispatch } from "react-redux";

function BtnDeleteAll() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  return (
    <>
      <Button
        colorScheme="gray"
        px="8"
        h="45"
        color="gray.500"
        mt="8"
        onClick={onOpen}
      >
        Aufgabe löschen
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>
            Bestätigen Sie, dass alle Aufgaben gelöscht werden sollen?
          </ModalHeader>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Nein
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => dispatch(deleteAllTasks())}
            >
              Ja
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function BtnDelete({ task }: IBtnDelete) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  return (
    <>
      <IconButton
        aria-label="Aufgabe löschen"
        icon={<FiTrash2 />}
        isRound={true}
        onClick={onOpen}
      />

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>Möchten Sie die Aufgabe wirklich löschen?</ModalHeader>
          <ModalBody>
            <Text>{task.description}</Text>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Nein
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => dispatch(deleteTask(task))}
            >
              Ja
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { BtnDelete, BtnDeleteAll };
