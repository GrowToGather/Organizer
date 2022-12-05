import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './language-manager.css'

const LanguageManager = (props) => {

    const [state, setState] = useState({selectedLanguage: -1, languageName: "", languageList: props.data});

    function createLanguage() {
      axios.post("https://" + window.API_URL + ":23892/organizer/event-type", '{ "eventName": "' + document.getElementById("createLanguageText").value + '"}')
        .then(response => response.data)
        .then((data) => {
          state.languageList.length = 0;
          for (let i = 0; i < data.length; i++) {
            state.languageList[i] = {selected: false, id: data[i].id, text: data[i].languageName};
          }
          setState({...state})
        });
    }

    function updateLanguage() {
      axios.put("https://" + window.API_URL + ":23892/organizer/event-type/" + props.data[state.selectedLanguage].id,
        '{ "eventName": "' + document.getElementById("createLanguageText").value + '"}')
        .then(response => response.data)
        .then((data) => {
          state.languageList.length = 0;
          for (let i = 0; i < data.length; i++) {
            state.languageList[i] = {selected: false, id: data[i].id, text: data[i].languageName};
          }
          setState({...state})
        });
    }

    function deleteLanguage() {
      axios.delete("https://" + window.API_URL + ":23892/organizer/event-type/" + props.data[state.selectedLanguage].id)
      .then(response => response.data)
      .then((data) => {
        state.languageList.length = 0;
        for (let i = 0; i < data.length; i++) {
          state.languageList[i] = {selected: false, id: data[i].id, text: data[i].languageName};
        }
        setState({...state, languageName: "", selectedLanguage: -1})
      });
    }

    function clickListElement(name) {
      var selected;
      for (let i = 0; i < props.data.length; i++) {
        if (props.data[i].text == name) {
          document.getElementById("languageButton").disabled = true;
          selected = i;
        }
      }
      setState({...state, selectedLanguage: selected, languageName: name});
      document.activeElement.blur();
    }

    function updateInput(name) {
      var selected = -1;
      for (let i = 0; i < props.data.length; i++) {
        if (props.data[i].text == name) {
          document.getElementById("languageButton").disabled = true;
          selected = i;
        }
      }
      if (selected == -1) {
        document.getElementById("languageButton").disabled = false;
        setState({...state, languageName: name});
      } else {
        setState({...state, selectedLanguage: selected, languageName: name});
      }
    }

    function showLanguageList() {
      var counter = 0;
      var list = props.data.map((option) => option.text.toLowerCase().includes(state.languageName.toLowerCase()) ?
        <div key={counter++}>
          <button className="language-manager-language-button white-button button" onClick={() => clickListElement(option.text)} 
            onMouseDown={(e) => e.preventDefault()}><span className="language-manager-language-text">{option.text}</span></button>
        </div> : null
      )
      if (counter == 0) {
        return <span className="language-manager-no-language">No Languages Found.</span>
      }
      return list;
    }

  return (
    <div className="language-manager-container">
      <span className="language-manager-title-text">Enter Language name and update existing one or create a new Language.</span>
      <span className="language-manager-selected-text">Selected Language: {state.selectedLanguage != -1 ? props.data[state.selectedLanguage].text : ""}</span>
        <div className="language-manager-input-div">
          <input
            id="createLanguageText"
            type="text"
            placeholder="Language Name"
            value={state.languageName}
            onChange={(e) => updateInput(e.target.value)}
            className="language-manager-name-input input"
            autoComplete="off"
          />
          <div className="language-manager-list-activities">
            <div className="language-manager-inner-list-activities">
              {props.data.length > 0 ? showLanguageList() : null}
            </div>
          </div>
        </div>
        <div>
          <button id="languageButton" className="language-manager-create-button white-button button" onClick={() => createLanguage()}>Create new Language</button>
          <button className="language-manager-update-button white-button button" onClick={() => updateLanguage()}>Update selected Language</button>
          <button className="language-manager-delete-button red-button button" onClick={() => deleteLanguage()}>Delete selected Language</button>
        </div>
    </div>
  )
}

export default LanguageManager
