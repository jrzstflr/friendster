import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth"
import { auth, db } from "./firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"

const googleProvider = new GoogleAuthProvider()

// User interface for type safety
export interface UserProfile {
  id: string
  email: string
  name: string
  avatar: string
  bio: string
  friends: string[]
  createdAt: string
  authProvider: "google" | "email"
}

export const signUpWithEmail = async (email: string, password: string, name: string): Promise<UserProfile> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update user profile with display name
    await updateProfile(user, {
      displayName: name,
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    })

    // Create user document in Firestore
    const userProfile: UserProfile = {
      id: user.uid,
      email: user.email || "",
      name: name,
      avatar: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      bio: "",
      friends: [],
      createdAt: new Date().toISOString(),
      authProvider: "email",
    }

    await setDoc(doc(db, "users", user.uid), userProfile)

    return userProfile
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const signInWithEmail = async (email: string, password: string): Promise<UserProfile> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Fetch user profile from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (!userDoc.exists()) {
      throw new Error("User profile not found")
    }

    return userDoc.data() as UserProfile
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const signInWithGoogle = async (): Promise<UserProfile> => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    // Check if user already exists in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (userDoc.exists()) {
      return userDoc.data() as UserProfile
    }

    // Create new user profile for first-time Google sign-in
    const userProfile: UserProfile = {
      id: user.uid,
      email: user.email || "",
      name: user.displayName || "User",
      avatar: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
      bio: "",
      friends: [],
      createdAt: new Date().toISOString(),
      authProvider: "google",
    }

    await setDoc(doc(db, "users", user.uid), userProfile)

    return userProfile
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const getCurrentUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid))
    return userDoc.exists() ? (userDoc.data() as UserProfile) : null
  } catch (error: any) {
    throw new Error(error.message)
  }
}
