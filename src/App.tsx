import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Flex, Heading, Image, Text } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        alignContent="flex-start"
        wrap="nowrap"
        gap="0.5rem"
      >
        <Image
          alt="Servgenie Logo"
          src="/servgenie-logo.png"
          objectFit="initial"
          objectPosition="50% 50%"
          backgroundColor="initial"
          onClick={() => alert("📸 Say cheese!")}
        />
        <Heading level={1}>SERVGENIE</Heading>
        <Heading level={3}>Any wish, anytime, anywhere.</Heading>
        <Text
          variation="tertiary"
          fontWeight={200}
          fontSize="1.2em"
          fontStyle="italic"
        >
          Coming soon...
        </Text>
      </Flex>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
            {todo.content}
          </li>
        ))}
      </ul>
      <div>In the mean time, leave us your wishes. 🥳</div>
    </main>
  );
}

export default App;
