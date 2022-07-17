import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs,
  addDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBMbuaqyQy1eZHLC4luotO_4cJw1WXM9AE",
  authDomain: "fir-first-lesson.firebaseapp.com",
  projectId: "fir-first-lesson",
  storageBucket: "fir-first-lesson.appspot.com",
  messagingSenderId: "877936966957",
  appId: "1:877936966957:web:78feda1f09eba0113c67a4"
}

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// get collection data
getDocs(colRef)
.then((snapshot) => {
  let books = []
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})
.catch(err => {
  console.log(err.message)
})

//adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submt', (e)=> {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    addBookForm.reset()
  })
})

//deleting  documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submt', (e)=> {
  e.preventDefault()
})