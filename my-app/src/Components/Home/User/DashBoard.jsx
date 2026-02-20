import React from 'react'
import  {useAuth } from '../../Context/User/UserData'

export default function DashBoard(e) {
          e.preventDefault();    
    const { user } = useAuth();
    console.log(user);

  return (
     <>
      <h2>Dashboard</h2>
      <h3>Welcome, {user?.name}</h3>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </>
  )                                                                                                                                                                                                                     

}

                                                                                                                                                                                                                                                            
