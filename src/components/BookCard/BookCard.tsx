import { JSX } from "react";
import {
  Card,
  Group,
  Text,
  Stack,
  ActionIcon,
  Modal,
  Button,
} from "@mantine/core";
import styles from "./BookCard.module.scss";
import { Book } from "../../types";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteBook, useUpdateBook } from "../../api/mutations";
import UpdateCreateBook from "../UpdateCreateBook";

type Props = {
  book: Book;
  onClick: () => void;
};

const BookCard = ({ book, onClick }: Props): JSX.Element => {
  const [isDeleteBookOpened, { open: openDeleteBook, close: closeDeleteBook }] =
    useDisclosure(false);
  const [isEditBookOpened, { open: openEditBook, close: closeEditBook }] =
    useDisclosure(false);

  const { mutate: deleteBook } = useDeleteBook();
  const { mutate: updateBook } = useUpdateBook(book.id);

  return (
    <>
      <Modal
        opened={isDeleteBookOpened}
        onClose={closeDeleteBook}
        title="Delete Book"
        centered
      >
        <Text>Are you sure you want to delete this book?</Text>
        <Button
          mt="md"
          color="red"
          onClick={(event) => {
            event.stopPropagation();
            deleteBook(book.id);
            closeDeleteBook();
          }}
        >
          Delete
        </Button>
      </Modal>
      <UpdateCreateBook
        book={book}
        opened={isEditBookOpened}
        onClose={closeEditBook}
        onSave={updateBook}
      />
      <Card
        withBorder
        radius="md"
        p="md"
        shadow="xs"
        className={styles.card}
        onClick={onClick}
      >
        <Group justify="space-between" align="start">
          <Stack gap="xs" w="100%">
            <Group justify="space-between" w="100%">
              <Text fw={500} size="md">
                {book.title}
              </Text>
              <Group>
                <ActionIcon variant="subtle" color="blue">
                  <IconEdit
                    size={18}
                    onClick={(
                      event: React.MouseEvent<SVGSVGElement, MouseEvent>,
                    ) => {
                      event.stopPropagation();
                      openEditBook();
                    }}
                  />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={(
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                  ) => {
                    event.stopPropagation();
                    openDeleteBook();
                  }}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            </Group>
            <Text c="dimmed" size="sm">
              by {book.author} &middot; {book.year}
            </Text>
          </Stack>
        </Group>
        <Text size="sm" mt="sm" lineClamp={2} c="gray.7">
          {book.description}
        </Text>
      </Card>
    </>
  );
};

export default BookCard;
