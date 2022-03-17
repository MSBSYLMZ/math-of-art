import './Home.styles.css'

import { useState } from "react"

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from "../../redux/user/user.actions"
import { selectCurrentUser } from "../../redux/user/user.selector"

import DefaultButton from '../../components/defaultButton/Default-button.component'

const HomePage = () => {
  const dispatch= useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  
  const [ userCredentials, setUserCredentials ]=useState({
    name:""
  });
  
  const navigate = useNavigate();


  const handleSubmit = () =>{
   dispatch(setCurrentUser(userCredentials))
   navigate("/puzzle")
  }

  const handleChange = event =>{
    setUserCredentials({...userCredentials,name:event.target.value})
  }

  return (
    <div className="wrapper">
      <div className='home'>
      
      <h1>Welcome {currentUser?.name ? currentUser.name : ""}</h1>
      <input onChange={handleChange} type="text" id="name" placeholder='Enter your name...'/>
      <DefaultButton onClick={handleSubmit}>Start Game</DefaultButton>
      </div>
    </div>
  )
}

export default HomePage