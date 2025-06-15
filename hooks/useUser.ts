// hooks/useUser.ts
import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function useUser() {
  const [user, setUser] = useState<User | null | undefined>(undefined) // 🔄 초기값을 undefined로

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])

  return user
}
