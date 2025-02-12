import type { Book } from "@shared/types";

export const books: Book[] = [
  {
    title: "Introduction to Philosophy",
    author: "William James",
    ddc: "100000"
  },
  {
    title: "The Bible",
    author: "Various Authors",
    ddc: "220000"
  },
  {
    title: "Basic Economics",
    author: "Thomas Sowell",
    ddc: "330000"
  },
  {
    title: "English Grammar Guide",
    author: "Raymond Murphy",
    ddc: "425000"
  },
  {
    title: "Physics for Scientists",
    author: "Paul Tipler",
    ddc: "530000"
  }
];

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function getTodaysBook(): Book {
  const dayIndex = getDayOfYear() % books.length;
  return books[dayIndex];
}
