export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  description: string;
  details: string;
};

export type Books = Record<string, Book>;
