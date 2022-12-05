import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './activity-manager.css'

const ActivityManager = (props) => {

    const [state, setState] = useState({selectedActivity: -1, activityName: "", activityList: props.data});

    function createEventType() {
      axios.post("https://" + window.API_URL + ":23892/organizer/event-type", '{ "eventName": "' + document.getElementById("createEventTypeText").value + '"}')
        .then(response => response.data)
        .then((data) => {
          state.activityList.length = 0;
          for (let i = 0; i < data.length; i++) {
            state.activityList[i] = {selected: false, id: data[i].id, text: data[i].eventName};
          }
          setState({...state})
        });
    }

    function updateEventType() {
      axios.put("https://" + window.API_URL + ":23892/organizer/event-type/" + props.data[state.selectedActivity].id,
        '{ "eventName": "' + document.getElementById("createEventTypeText").value + '"}')
        .then(response => response.data)
        .then((data) => {
          state.activityList.length = 0;
          for (let i = 0; i < data.length; i++) {
            state.activityList[i] = {selected: false, id: data[i].id, text: data[i].eventName};
          }
          setState({...state})
        });
    }

    function deleteEventType() {
      axios.delete("https://" + window.API_URL + ":23892/organizer/event-type/" + props.data[state.selectedActivity].id)
        .then(response => response.data)
        .then((data) => {
          state.activityList.length = 0;
          for (let i = 0; i < data.length; i++) {
            state.activityList[i] = {selected: false, id: data[i].id, text: data[i].eventName};
          }
          setState({...state, activityName: "", selectedActivity: -1})
        });
    }

    function clickListElement(name) {
      var selected;
      for (let i = 0; i < props.data.length; i++) {
        if (props.data[i].text == name) {
          document.getElementById("activityButton").disabled = true;
          selected = i;
        }
      }
      setState({...state, selectedActivity: selected, activityName: name});
      document.activeElement.blur();
    }

    function updateInput(name) {
      var selected = -1;
      for (let i = 0; i < props.data.length; i++) {
        if (props.data[i].text == name) {
          document.getElementById("activityButton").disabled = true;
          selected = i;
        }
      }
      if (selected == -1) {
        document.getElementById("activityButton").disabled = false;
        setState({...state, activityName: name});
      } else {
        setState({...state, selectedActivity: selected, activityName: name});
      }
    }

    function showActivityList() {
      var counter = 0;
      var list = props.data.map((option) => option.text.toLowerCase().includes(state.activityName.toLowerCase()) ?
        <div key={counter++}>
          <button className="activity-manager-activity-button white-button button" onClick={() => clickListElement(option.text)} 
            onMouseDown={(e) => e.preventDefault()}><span className="activity-manager-activity-text">{option.text}</span></button>
        </div> : null
      )
      if (counter == 0) {
        return <span className="activity-manager-no-activity">No Activities Found.</span>
      }
      return list;
    }

  return (
    <div className="activity-manager-container">
      <span className="activity-manager-title-text">Enter Activity name and update existing one or create a new Activity.</span>
      <span className="activity-manager-selected-text">Selected Activity: {state.selectedActivity != -1 ? props.data[state.selectedActivity].text : ""}</span>
        <div className="activity-manager-input-div">
          <input
            id="createEventTypeText"
            type="text"
            placeholder="Activity Name"
            value={state.activityName}
            onChange={(e) => updateInput(e.target.value)}
            className="activity-manager-name-input input"
            autoComplete="off"
          />
          <div className="activity-manager-list-activities">
            <div className="activity-manager-inner-list-activities">
              {props.data.length > 0 ? showActivityList() : null}
            </div>
          </div>
        </div>
        <div>
          <button id="activityButton" className="activity-manager-create-button white-button button" onClick={() => createEventType()}>Create new Activity</button>
          <button className="activity-manager-update-button white-button button" onClick={() => updateEventType()}>Update selected Activity</button>
          <button className="activity-manager-delete-button red-button button" onClick={() => deleteEventType()}>Delete selected Activity</button>
        </div>
    </div>
  )
}

export default ActivityManager
