import { useState } from 'react'
import { isAuthenticated } from './Auth';
import { Navigate} from 'react-router-dom'

function App() {
  if (isAuthenticated()==false) {
    return <Navigate to="/" replace />;
  }

  return (
<h1>hello world!</h1>
  )
}

export default App
