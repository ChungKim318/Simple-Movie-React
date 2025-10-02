import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from './firebase-config'

const FirebaseAuth = () => {
  const [value, setValue] = useState({
    email: '',
    password: '',
  })
  const [userInfo, setUserInfo] = useState(null)
  onAuthStateChanged(
    auth,
    currentUser => {
      if (currentUser) {
        setUserInfo(currentUser)
      } else {
        setUserInfo(null)
      }
    },
    error => {
      console.log(error)
    }
  )

  const handleInputChange = e => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    })
  }

  const handleCreateUser = async e => {
    try {
      e.preventDefault()
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      )

      await updateProfile(auth.currentUser, {
        displayName: 'Bido',
      })

      setUserInfo(createdUser)

      console.log('User created successfully')

      const userRef = collection(db, 'users')

      await addDoc(userRef, {
        uid: createdUser.user.uid,
        email: value.email,
        password: value.password,
      })
    } catch (err) {
      console.log('err', err)
    }
  }

  const handleLogin = async e => {
    e.preventDefault()
    const userCreated = await signInWithEmailAndPassword(
      auth,
      value.email,
      value.password
    )
    setUserInfo(userCreated)
    console.log('Login successfully')
  }

  const handleSignOut = () => {
    signOut(auth)
    setUserInfo(null)
  }

  return (
    <div className="py-10">
      <div className="w-full max-w-[500px] mx-auto bg-slate-500 p-5 rounded-lg">
        <form onSubmit={handleCreateUser}>
          <input
            type="email"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-secondary text-black"
            placeholder="Enter your email"
            name="email"
            onChange={handleInputChange}
          />
          <input
            type="password"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-secondary text-black"
            placeholder="Enter your password"
            name="password"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="p-3 bg-primary text-white text-sm font-medium rounded-lg w-full">
            Register
          </button>
        </form>
        <div className="mt-10 flex items-center gap-x-5">
          {!!userInfo && <span>{userInfo.displayName}</span>}
          <button
            className="p-3 bg-secondary text-white text-sm font-medium rounded-lg"
            onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
      <div className="w-full max-w-[500px] mx-auto bg-slate-500 p-5 rounded-lg mt-10">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-secondary text-black"
            placeholder="Enter your email"
            name="email"
            onChange={handleInputChange}
          />
          <input
            type="password"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-secondary text-black"
            placeholder="Enter your password"
            name="password"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="p-3 bg-primary text-white text-sm font-medium rounded-lg w-full">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default FirebaseAuth
