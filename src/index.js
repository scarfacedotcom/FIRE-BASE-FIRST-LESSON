import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  getDoc, updateDoc
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged
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

const unsubCol = onSnapshot(q, (snapshot) => {
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


const unsubDoc = onSnapshot(docRef, (doc) => {
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

  // signing users up
  const signupForm = document.querySelector('.signup')
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        //console.log('user created:', cred.user)
        signupForm.reset()
      })
      .catch((err) => {
        console.log(err.message)
      })
  })

  // logging in and out
  const logoutButton = document.querySelector('.logout')
  logoutButton.addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        //console.log('the user signed out')
      })
      .catch((err) => {
        console.log(err.message)
      })  
  })

  const loginForm = document.querySelector('.login')
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        //console.log('user Logged in:', cred.user)
      })
      .catch((err) => {
        console.log(err.message)
      })
  })

  // subscribing to auth changes
  const unsubAuth =  onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
  })

  // Unsubscribe from db/auth changes
  const unsubButton = document.querySelector('.unsub')
  unsubButton.addEventListener('click', () => {
    console.log('unsubscribing')
    unsubCol()
    unsubDoc()
    unsubAuth()

  })