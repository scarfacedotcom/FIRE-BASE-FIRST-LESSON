import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  getDoc, updateDoc
} from 'firebase/firestore'
import {
  getAuth
} from 'firebase/auth'

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
const auth = getAuth()

// collection ref
const colRef = collection(db, 'books')

//queries
const q = query(colRef, orderBy("createdAt"))

// real time collection data


// getDocs(colRef)
// .then((snapshot) => {
//   let books = []
//   snapshot.docs.forEach((doc) => {
//     books.push({ ...doc.data(), id: doc.id })
//   })
//   console.log(books)
// })
// .catch(err => {
//   console.log(err.message)
// })

onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

//adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addBookForm.reset()
  })
})

//deleting  documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e)=> {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

//get a single Document
const docRef = doc(db, 'books', 'xAAZ6NSljYhcmN3czm24')


onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
  })

  //update a document
  const updateForm = document.querySelector('.update')
  updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  })
    .then(() => {
      updateForm.reset()
    })
  })