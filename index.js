const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const bookData = require('./data/booksData')
const authorData = require('./data/authorsData')

const uri = ''; // fill in connection string here

mongoose.set('useFindAndModify', false);

// console.log('connecting to', uri);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(uri, options)
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log('error connecting to mongodb:', err.message));

// const fetchBooks = async () => {
//   try{
//     const books = await Book.find({})
//     console.log('first Author:', books[0].author)
//   } catch (err) {
//     console.log(err.message)
//   }  
// }

const clearData = async () => {
  try {
    await Book.deleteMany({})
    await Author.deleteMany({})
    console.log("all clear")
  } catch (err) {
    console.log("error: ", err)
  }
} 

const addAuthorData = async () => {
  authorData.forEach(current => {
    const author = new Author({ ...current})
    author.save()
      .then(() => console.log("author saved"))
      .catch(err => console.log("error:", err.error))
  })

  console.log('all done')
}

const getAuthorId = async name => {
  const author = await Author.findOne({ name: name })
  // console.log(author)
  console.log(author._id)
  return author._id
} 
const createBookObject = book => {
  const authorId = getAuthorId(book.author)
  const newBook = new Book({ ...book, author: new mongoose.Types.ObjectId()})
  return newBook
}

const addBookData = async () => {
  bookData.forEach(book => {
    const newBook = createBookObject(book)
    newBook.save()
    .then(() => console.log("book saved"))
    .catch(err => console.log("error:", err))
  })
}

// clearData()

// addAuthorData()

addBookData();