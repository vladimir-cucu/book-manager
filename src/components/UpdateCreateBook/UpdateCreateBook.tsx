import { Modal, TextInput, Textarea, Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { v4 as uuidv4 } from "uuid";
import { Book } from "../../types";

type Props = {
  book?: Book | null;
  opened: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
};

const UpdateCreateBook = ({ book, opened, onClose, onSave }: Props) => {
  const form = useForm({
    initialValues: {
      title: book?.title ?? "",
      author: book?.author ?? "",
      year: book?.year ?? "",
      description: book?.description ?? "",
      details: book?.details ?? "",
    },
  });

  const handleSubmit = () => {
    const updatedOrNewBook: Book = {
      id: book?.id ?? uuidv4(),
      title: form.values.title,
      author: form.values.author,
      year: Number(form.values.year),
      description: form.values.description,
      details: form.values.details,
    };
    onSave(updatedOrNewBook);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={book ? "Edit Book" : "Create Book"}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Title" {...form.getInputProps("title")} />
          <TextInput label="Author" {...form.getInputProps("author")} />
          <TextInput
            label="Year"
            type="number"
            {...form.getInputProps("year")}
          />
          <Textarea
            label="Description"
            {...form.getInputProps("description")}
          />
          <Textarea label="Details" {...form.getInputProps("details")} />
          <Button mt="md" color="green" type="submit">
            {book ? "Edit" : "Create"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default UpdateCreateBook;
