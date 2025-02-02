import React from 'react'
import { useAuth } from '../context/AuthContext';


export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      <h1>Welcome Home {user.name}</h1>
    </div>
  )
}
