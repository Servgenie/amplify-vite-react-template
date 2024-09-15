import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import {
  Flex,
  Heading,
  Image,
  Text,
  SelectField,
  Card,
  View,
  Badge,
  Divider,
  Button,
} from "@aws-amplify/ui-react";

const client = generateClient<Schema>();



const items = [
  {
    title: "Coach Genie",
    badges: ["Waterfront", "Verified"],
  },
  {
    title: "Caregiver Genie",
    badges: ["Mountain", "Verified"],
  },
  {
    title: "Milford - Room #3",
    badges: ["Mountain", "Verified"],
  },
];




function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  let value = 0;
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

      <SelectField
        label="Select A Genie"
        size="large"
        placeholder="Please Select Your Wish"
       
      >
        <option  value="0">Fitness Genie</option>
        <option  value="1">Care Genie</option>
        <option value="2">Cosmetologist Genie</option>
      </SelectField>

      <Card borderRadius="medium" maxWidth="20rem" variation="outlined">
        <Image
          src="/road-to-milford-new-zealand-800w.jpg"
          alt="Demonstrate and explain how to perform various exercises and routines to minimize injuries and improve fitness"
        />
        <View padding="xs">
          <Flex>
            {items[0].badges.map((badge) => (
              <Badge
                key={badge}
                backgroundColor={
                  badge === "Waterfront"
                    ? "blue.40"
                    : badge === "Mountain"
                    ? "green.40"
                    : "yellow.40"
                }
              >
                {badge}
              </Badge>
            ))}
          </Flex>
          <Divider padding="xs" />
          <Heading padding="medium">{items[0].title}</Heading>
          <Button variation="primary" isFullWidth>
            Book it
          </Button>
        </View>
      </Card>

      <Card borderRadius="medium" maxWidth="20rem" variation="outlined">
        <Image
          src="/road-to-milford-new-zealand-800w.jpg"
          alt="A professional who assists individuals with daily tasks and activities so that their patients can live more independent lives"
        />
        <View padding="xs">
          <Flex>
            {items[1].badges.map((badge) => (
              <Badge
                key={badge}
                backgroundColor={
                  badge === "Waterfront"
                    ? "blue.40"
                    : badge === "Mountain"
                    ? "green.40"
                    : "yellow.40"
                }
              >
                {badge}
              </Badge>
            ))}
          </Flex>
          <Divider padding="xs" />
          <Heading padding="medium">{items[1].title}</Heading>
          <Button variation="primary" isFullWidth>
            Book it
          </Button>
        </View>
      </Card>


      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
            {todo.content}
          </li>
        ))}
      </ul>

      <div>In the mean time, leave us your wishes.</div>
    </main>
  );
}

export default App;
