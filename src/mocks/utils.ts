import { mockBooks } from "./mockData";
import { Books } from "../types";

export const loadBooks = (): Books => {
  const storedBooks = localStorage.getItem("books");
  return storedBooks ? JSON.parse(storedBooks) : mockBooks;
};

export const saveBooks = (books: Books) => {
  localStorage.setItem("books", JSON.stringify(books));
};
