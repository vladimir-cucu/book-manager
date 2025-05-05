import { useQuery } from "@tanstack/react-query";
import { Book, Books } from "../types";

export const useGetBooks = (searchTerm: string) =>
  useQuery({
    queryKey: ["books", searchTerm],
    queryFn: async (): Promise<Books> => {
      const res = await fetch(`/api/books?search=${searchTerm}`);
      if (!res.ok) throw new Error("Failed to fetch books.");
      return res.json();
    },
  });

export const useGetBookById = (id: string) =>
  useQuery({
    queryKey: ["book", id],
    queryFn: async (): Promise<Book> => {
      const res = await fetch(`/api/book/${id}`);
      if (!res.ok) throw new Error(`Failed to fetch book with id ${id}.`);
      return res.json();
    },
  });
