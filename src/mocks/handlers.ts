import { http, HttpResponse, RequestHandler } from "msw";
import { loadBooks, saveBooks } from "./utils";
import { Book } from "../types";

export const handlers: RequestHandler[] = [
  http.get("/api/books", async ({ request }) => {
    const books = loadBooks();
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search")?.toLowerCase() || "";
    console.log(searchTerm);
    const filteredBooks = Object.keys(books).reduce(
      (acc, bookId) =>
        books[bookId].title.toLowerCase().includes(searchTerm)
          ? { ...acc, [bookId]: books[bookId] }
          : acc,
      {} as Book,
    );
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(HttpResponse.json(filteredBooks));
      }, 1000);
    });
  }),

  http.get("/api/book/:id", async ({ params }) => {
    const { id } = params;
    const books = loadBooks();
    const book = typeof id === "string" ? books[id] : undefined;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          book
            ? HttpResponse.json(book)
            : new HttpResponse(null, { status: 404 }),
        );
      }, 1000);
    });
  }),

  http.delete("/api/book/:id", async ({ params }) => {
    const { id } = params;
    const books = loadBooks();
    if (typeof id !== "string" || !books[id]) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(new HttpResponse(null, { status: 404 }));
        }, 1000);
      });
    }
    delete books[id];
    saveBooks(books);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new HttpResponse(null, { status: 204 }));
      }, 1000);
    });
  }),

  http.put("/api/book/:id", async ({ params, request }) => {
    const { id } = params;
    const updatedBook = await request.json();
    if (typeof id !== "string" || typeof updatedBook !== "object") {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(new HttpResponse(null, { status: 404 }));
        }, 1000);
      });
    }
    const books = loadBooks();
    books[id] = { ...books[id], ...updatedBook };
    saveBooks(books);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new HttpResponse(null, { status: 204 }));
      }, 1000);
    });
  }),

  http.post("/api/book", async ({ request }) => {
    const newBook = await request.json();
    if (typeof newBook !== "object") {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(new HttpResponse(null, { status: 404 }));
        }, 1000);
      });
    }
    const books = loadBooks();
    books[(newBook as Book).id] = { ...(newBook as Book) };
    saveBooks(books);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          new HttpResponse(JSON.stringify({ ...books[(newBook as Book).id] }), {
            status: 201,
          }),
        );
      }, 1000);
    });
  }),
];
