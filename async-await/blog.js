// Native implementation shortcoming SLOW, must author and rating is async
const getBook = async bookName => {
  const book = await fetchBook(bookName);

  const author = await fetchAuthor(book.authorId);
  const rating = await fetchRating(book.id);

  return {
    ...book,
    author,
    rating
  };
};

// Promise.all fetches author and rating async but hard to read
const getBook = async bookName => {
  const book = await fetchBook(bookName);

  return Promise.all([
    fetchAuthor(book.authorId),
    fetchRating(book.id)
  ]).then(results => ({
    ...book,
    author: results[0],
    rating: results[1]
  }));
};

// Best of both worlds using destructring, await and Promise.all
const getBook = async bookName => {
  const book = await fetchBook(bookName);

  const [author, rating] = await Promise.all([
    fetchAuthor(book.authorId),
    fetchRating(book.id)
  ]);

  return {
    ...book,
    author,
    rating
  };
};