// components/AuthButton.tsx
import { signInWithPopup, signOut } from "firebase/auth"
import { auth, provider } from "@/lib/firebase"
import useUser from "@/hooks/useUser"

export default function AuthButton() {
  const user = useUser()

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (err) {
      console.error("Login error", err)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error("Logout error", err)
    }
  }

  if (user) {
    return (
      <div>
        <p style={{ fontSize: "0.9rem" }}>Hi, {user.displayName}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  return <button onClick={handleLogin}>Login with Google</button>
}