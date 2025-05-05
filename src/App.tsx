import {
  AppShell,
  Burger,
  Group,
  Button,
  Input,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import BookCard from "./components/BookCard";
import BookDetails from "./components/BookDetails";
import { useGetBooks } from "./api/queries";
import { useState } from "react";
import UpdateCreateBook from "./components/UpdateCreateBook";
import { useCreateBook } from "./api/mutations";

const App = () => {
  const [isBurgerOpened, { toggle: toggleBurger }] = useDisclosure();
  const [isCreateBookOpened, { open: openCreateBook, close: closeCreateBook }] =
    useDisclosure(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: books, isFetching } = useGetBooks(searchTerm);
  const { mutate: createBook } = useCreateBook();

  return (
    <>
      <UpdateCreateBook
        book={null}
        opened={isCreateBookOpened}
        onClose={closeCreateBook}
        onSave={createBook}
      />
      <AppShell
        header={{ height: 80 }}
        navbar={{
          width: 350,
          breakpoint: "sm",
          collapsed: { mobile: !isBurgerOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Burger
              opened={isBurgerOpened}
              onClick={toggleBurger}
              hiddenFrom="sm"
              size="sm"
            />
            <Input
              placeholder="Search books..."
              rightSection={<IconSearch size={16} />}
              radius="md"
              style={{ flexGrow: 1 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={openCreateBook}>Create Book</Button>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar
          p="md"
          style={{ height: "calc(100vh - 80px)", overflowY: "auto" }}
        >
          {books ? (
            <Stack>
              {Object.values(books ?? {}).map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onClick={() => setSelectedBookId(book.id)}
                />
              ))}
            </Stack>
          ) : isFetching ? (
            <Text>Loading Books.</Text>
          ) : (
            <Text>No books available.</Text>
          )}
        </AppShell.Navbar>
        <AppShell.Main>
          {selectedBookId ? (
            <BookDetails id={selectedBookId} />
          ) : (
            <Text>Select a book to view details.</Text>
          )}
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default App;
