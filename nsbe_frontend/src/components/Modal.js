import React, { useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";
import { AppContext } from "./Context";

const Modal = props => {
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  const { reportPhrase, setReportPhrase, sampleResponse, setSampleResponse } = useContext(AppContext);
  const reportCrime = async () => {
    await fetch('http://127.0.0.1:5000/report/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "prompt": reportPhrase })
    })
      .then(response => response.json())
  }

  const getMapInfo = async () => {
    const response = await fetch('http://127.0.0.1:5000/map/')
    const jsonMapData = await response.json();
    console.log(jsonMapData.response)
    setSampleResponse(jsonMapData);
  }

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">{"Report a case"}</h4>
          </div>
          <div className="modal-body">{"Please Describe the case!"}
            <div className="line">
              <input
                value={reportPhrase}
                onChange={(e) => {
                  setReportPhrase(e.target.value);
                  console.log(reportPhrase);
                }}></input>
            </div>
          </div>

          <div className="modal-footer">
            <button
              onClick={async () => {
                await reportCrime();
                await setReportPhrase('');
                await getMapInfo();
                props.onClose();
              }}
            >
              Submit
            </button>
            <button onClick={props.onClose} className="button">
              Close
            </button>

          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;