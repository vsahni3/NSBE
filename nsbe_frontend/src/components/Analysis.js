import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './Analysis.css'
import ScrollToBottom from 'react-scroll-to-bottom'

const Analysis = () => {
  // Get Transcript & Analysis in JSON form from Backend
  // If Transcript: white
  // If Analysis: gray
  // const [conversations, setConversations] = useState([
  //   [
  //     "\nHi, how's it going?\nI'm fine officer, how are you?\nYou are very articulate; you don't sound black.",
  //     "The comment is highly offensive and racist. It implies that black people\n are not expected to be articulate, and it contains a bias towards\n people of color.",
  //     "Unintentionally racist",
  //     "04/03/2023 19:57",
  //   ],

  //   [
  //     "\nHi, how's it going?\nI'm fine officer, how are you?\nYou are very articulate; you don't sound black.",
  //     "The comment is highly offensive and racist. It implies that black people\n are not expected to be articulate, and it contains a bias towards\n people of color.",
  //     "Unintentionally racist",
  //     "04/03/2023 19:57",
  //   ],
  //   [
  //     "\nHi, how's it going?\nI'm fine officer, how are you?\nYou are very articulate; you don't sound black.",
  //     "The comment is highly offensive and racist. It implies that black people\n are not expected to be articulate, and it contains a bias towards\n people of color.",
  //     "Unintentionally racist",
  //     "04/03/2023 19:57",
  //   ],
  //   [
  //     "\nHi, how's it going?\nI'm fine officer, how are you?\nYou are very articulate; you don't sound black.",
  //     "The comment is highly offensive and racist. It implies that black people\n are not expected to be articulate, and it contains a bias towards\n people of color.",
  //     "Unintentionally racist",
  //     "04/03/2023 19:57",
  //   ],
  // ]);
  const [conversations, setConversations] = useState([])

  useEffect(async () => {
    const response = await fetch('http://127.0.0.1:5000/give_analysis/')
        const jsonMapData = await response.json();
        console.log(jsonMapData.response)
        setConversations(jsonMapData.response);
  }, [])

  return (
    <>
      <Navbar />
      <div>
        <div className='chat-window'>
          <ScrollToBottom className='chat-body'>

            {conversations.map((conversation, index) => (
              <div key={index} >

                <div className='transcript'>
                  <div className='classification'>
                    {conversation[2]}
                  </div>
                  {conversation[0]}
                  <div className='date'>
                    {conversation[3]}
                  </div>
                </div>
                <div className='analysis'>
                  {conversation[1]}
                </div>
              </div>
            ))}
          </ScrollToBottom>

        </div>


      </div>
    </>

  )
}

export default Analysis