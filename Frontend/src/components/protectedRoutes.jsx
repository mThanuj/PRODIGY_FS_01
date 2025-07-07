import React from 'react'
import {Navigate} from "react-router-dom"

const ProtectedRoute = ({ children , path}) => {

  const token = localStorage.getItem("token")
  if (!token && path!=="/login"  && path!=="/register") {
    return <Navigate to="/login"/>
  }
  if(token && path==="/login")
    {
    return <Navigate to="/Home"/>
  }
  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute