import { JSX } from "react";
import { Stack, Text } from "@mantine/core";
import { useGetBookById } from "../../api/queries";

const BookDetails = ({ id }: { id: string }): JSX.Element => {
  const { error, data: book, isPending } = useGetBookById(id);

  if (isPending) {
    return <Text>Loading book details.</Text>;
  }

  if (error || !book) {
    return <Text>Error while loading book details.</Text>;
  }

  return (
    <Stack gap="xs">
      <Text size="xl" fw={500}>
        Title: {book.title}
      </Text>
      <Text size="sm">Author: {book.author}</Text>
      <Text size="sm">Year: {book.year}</Text>
      <Text size="sm">Description: {book.description}</Text>
      <Text mt="sm">{book.details}</Text>
    </Stack>
  );
};

export default BookDetails;
