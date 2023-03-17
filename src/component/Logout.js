import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {

    const navigate = useNavigate()
   console.log("kkkkk logout");
    useEffect(() => {navigate('/login')},[])
  
}
