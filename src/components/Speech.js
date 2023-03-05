import React, { useState, useContext, useEffect } from 'react';
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from './Context';
import "./Speech.css";
// import CameraIcon from './img/camera_button.png'
import Maps from './Maps';
import Modal from './Modal';
import ReportIcon from './img/flag.png'
import RecordIcon from './img/recording.png'
import SubmitIcon from './img/submit.png'


function Speech() {
    const [value, setValue] = useState('');
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            const res = help(result);
            setValue(result);
            //   console.log(result);
        },
    });
    const [messageList, setMessageList] = useState([]);
    const [UserOrAI, setUserOrAI] = useState('user'); // whether or not this is robot OR USER
    const [countStop, setCountStop] = useState(0);
    const { sampleResponse, setSampleResponse } = useContext(AppContext);
    const navigate = useNavigate();
    const { speak } = useSpeechSynthesis();
    const [show, setShow] = useState(false);
    {/* location: { lat: 43.664486, lng: -79.399689 }, */ }

    // const [sampleResponse, setSampleResponse] = useState({});

    async function help(value) {

        if (value.toLowerCase().includes('help')) {
            console.log(value, value.toLowerCase());
            stop();
            // end the conversation & analyze
            postSpeech().then((reply) => {
                console.log("HELP reported!!!")
            });
            // report the urgent case x
            await fetch('https://nsbe.herokuapp.com/report/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "prompt": 'Urgent Request for Help' })
            })
                .then(response => response.json())
            await getMapInfo();


        }
    }

    const getMapInfo = async () => {
        const response = await fetch('https://nsbe.herokuapp.com/map/')
        const jsonMapData = await response.json();
        console.log(jsonMapData.response)
        setSampleResponse(jsonMapData);
        console.log("Updating the map!")
    }

    useEffect(() => {
        getMapInfo();
    }, []);

    const sendMessage = async (messageValue, user_author) => {
        // if (currentMessage !== "") {
        const messageData = {
            author: user_author, // whether or not this is robot OR USER
            message: messageValue,
            time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
        };

        //   await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        //clear my message console after the message is sent
        //   setCurrentMessage("");
        // }
    };


    // send the user's speech (converted to text) to the backend
    const postSpeech = async () => {
        try {
            const body = { "transcript": value }; // convert to JSON since body needs to be in JSON format
            // const responses = [];
            const response = await fetch('https://nsbe.herokuapp.com/analyze/', {
                method: "POST",
                // mode: 'no-cors',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": '*',
                    "Access-Control-Allow-Headers": '*',
                    "Access-Control-Allow-Methods": 'GET, POST, PUT, DELETE'
                },
                body: JSON.stringify(body)
            });
            // console.log(await response.json())
            let resp = "";
            await response.json().then((data) => {
                console.log(data)
                resp = data.response;
            })
            // console.log(resp)
            // responses.push(resp);
            // sendMessage(resp, 'ai');
            // speak({ text: resp })
            // console.log(responses[countStop]);
            // setCountStop(countStop + 1);
            // setUserOrAI('ai');
            // setValue('asdasdasdasd');
            // sendMessage(responses[countStop], 'ai');
            // speak({ text: responses[countStop] })
            // sendMessage(response);
            // console.log(responses[countStop]);
            setValue('');
            // return response.response;


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="chat-window">
                {/* footer */}
                <div className="chat-body">

                    <Maps markerInfos={sampleResponse.response} />
                </div>

                <div className="chat-footer">
                    <button>
                        <img src={RecordIcon} className='send-button' onClick={listen} />
                    </button>
                    <button>
                        <img
                            src={SubmitIcon}
                            // className='send-button'
                            onClick={() => {
                                stop();
                                setUserOrAI('user');
                                sendMessage(value, 'user');
                                postSpeech().then((reply) => {
                                    console.log("wow")
                                });
                                console.log('user speech:', value)
                            }} />
                    </button>
                    <button>
                        <img src={ReportIcon} onClick={() => setShow(true)} />
                    </button>
                    <Modal onClose={() => setShow(false)} show={show}>
                        <p>This is modal body</p>
                    </Modal>

                    {listening}
                </div>


            </div>
        </>

    );
}

export default Speech;