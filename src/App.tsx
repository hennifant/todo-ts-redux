import {
  Heading,
  IconButton,
  VStack,
  useColorMode,
  Link,
  Flex,
} from "@chakra-ui/react";
import {
  FaSun,
  FaMoon,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import TaskList from "./components/Task/List";
import { store } from "./app/store";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  store.subscribe(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(store.getState().tasksWatch.tasks)
    );
    localStorage.setItem("tab", store.getState().tabWatch.tab);
  });

  return (
    <VStack p={4} minH="100vh" pb={28}>
      <IconButton
        aria-label="Thema ändern"
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        isRound={true}
        size="md"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />

      <Heading
        p="5"
        fontWeight="extrabold"
        size="xl"
        bgGradient="linear(to-l, teal.300, blue.500)"
        bgClip="text"
      >
        Aufgabenliste
      </Heading>

      <TaskList />

      <Flex position="absolute" bottom="5">
        <Link href="https://github.com/hennifant" target="_blank">
          <IconButton
            aria-label="Github"
            icon={<FaGithub />}
            isRound={true}
            size="md"
            m="1"
          />
        </Link>
        <Link href="https://www.linkedin.com//" target="_blank">
          <IconButton
            aria-label="Linkedin"
            icon={<FaLinkedin />}
            isRound={true}
            size="md"
            m="1"
          />
        </Link>
        <Link href="https://www.instagram.com/hennifantus/" target="_blank">
          <IconButton
            aria-label="Instagram"
            icon={<FaInstagram />}
            isRound={true}
            size="md"
            m="1"
          />
        </Link>
      </Flex>
    </VStack>
  );
}

export default App;
