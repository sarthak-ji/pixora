import React from 'react'
import { router } from './app.router.jsx'
import { RouterProvider } from "react-router"
import { AuthProvider } from './features/auth/auth.provider.jsx'
import { PostContextProvider } from './features/posts/post.provider.jsx'

import "./features/shared/global.scss"
import "./style.scss"


function App() {

  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App