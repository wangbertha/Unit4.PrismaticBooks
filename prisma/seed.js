const prisma = require("../prisma");
const seed = async () => {
  // TODO: Create 10 books with placeholder titles
  const books = [];
  for (let i=0; i<10; i++) {
    // { title: 'Book 0'}
    books.push({ title: `Book ${i}`});
  }
  await prisma.book.createMany({ data: books });
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
