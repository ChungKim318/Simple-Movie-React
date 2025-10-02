import React, { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  getDoc,
  where,
  orderBy,
  limit,
  query,
} from 'firebase/firestore'
import { v4 } from 'uuid'
import { db } from './firebase-config'
import MovieCard from '~/components/movies/MovieCard'

const FirebaseApp = () => {
  // colRef
  const colRef = collection(db, 'movies')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [moviesId, setMoviesId] = useState('')
  const [moviesArr, setMoviesArr] = useState([])
  const [singleMovie, setSingleMovie] = useState('')

  // Case 1: Get collection without Realtime Database
  // useEffect(() => {
  //   // 1. Get collection
  //   getDocs(colRef)
  //     .then(snapshot => {
  //       let movies = []
  //       snapshot.docs.forEach(doc => {
  //         movies.push({
  //           id: doc.id,
  //           ...doc.data(),
  //         })
  //       })
  //       // console.log('🚀 ~ FirebaseApp ~ movies:', movies)
  //       setMoviesArr(movies)
  //     })
  //     .catch(err => {
  //       console.log('🚀 ~ FirebaseApp ~ err:', err)
  //     })
  // }, [])

  // Case 2: Get collection with Realtime Database
  useEffect(() => {
    onSnapshot(colRef, snapshot => {
      let movies = []
      snapshot.docs.forEach(doc => {
        movies.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setMoviesArr(movies)
    })
    const docRefSingle = doc(db, 'movies', 'jzQPspzSvxTOANrrAZoG')
    // Ver 1: Get single document
    // getDoc(docRefSingle).then(doc => {
    //   console.log(doc.id, doc.data())
    // })

    // Ver 2: Get single document Realtime
    onSnapshot(docRefSingle, doc => {
      console.log(doc.id, doc.data())
    })
  }, [])

  useEffect(() => {
    //Firestore queries
    // const colRefQuery = collection(db, 'movies')
    const q = query(
      colRef,
      where('author', '==', 'Bido'),
      orderBy('author'),
      limit(5)
    )
    onSnapshot(q, snapshot => {
      let movies = []
      snapshot.docs.forEach(doc => {
        movies.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      console.log('🚀 ~ FirebaseApp ~ movies:', movies)
    })
  }, [])

  const handleAddMovie = e => {
    e.preventDefault()
    addDoc(colRef, {
      title,
      author,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        console.log('Success')
        // reset form
      })
      .catch(err => {
        console.log('🚀 ~ handleAddMovie ~ err:', err)
        // reset form
      })
  }

  // fetching single document

  const handleRemove = async id => {
    const colRefDelete = doc(db, 'movies', id)
    await deleteDoc(colRefDelete)
    console.log('🚀 ~ handleRemove success')
  }

  const handleUpdate = async e => {
    e.preventDefault()
    const colRefUpdate = doc(db, 'movies', moviesId)
    await updateDoc(colRefUpdate, {
      title: 'This is update Test',
    })
    console.log('🚀 ~ handleUpdate success')
  }

  return (
    <div className="p-10">
      <div className="w-full max-w-[500px] mx-auto bg-primary shadow-lg p-5 rounded-lg">
        <form onSubmit={handleAddMovie}>
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-secondary"
            placeholder="Enter your title"
            name="title"
            onChange={e => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-secondary"
            placeholder="Enter your author"
            name="author"
            onChange={e => setAuthor(e.target.value)}
          />
          <button
            type="submit"
            className="p-3 bg-secondary text-white text-sm font-medium rounded-lg w-full">
            Add movies
          </button>
        </form>
      </div>
      <div className="w-full max-w-[500px] mx-auto bg-primary shadow-lg p-5 rounded-lg">
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-secondary"
            placeholder="Enter your id"
            name="id"
            onChange={e => setMoviesId(e.target.value)}
          />
          <button
            type="submit"
            className="p-3 bg-secondary text-white text-sm font-medium rounded-lg w-full">
            Update movies
          </button>
        </form>
      </div>
      <div className="grid grid-cols-4 gap-10 p-10">
        {moviesArr.length &&
          moviesArr.map((item, index) => (
            <div key={v4()} className="w-full mx-auto bg-white rounded-lg p-3">
              <h1 className="text-lg mb-5 text-primary line-clamp-1">
                {item.title}
              </h1>
              <h2 className="text-lg mb-5 text-primary">{item.author}</h2>
              <button
                className="p-3 bg-secondary text-white text-sm font-medium rounded-lg w-full"
                onClick={() => handleRemove(item.id)}>
                Remove movies
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default FirebaseApp
