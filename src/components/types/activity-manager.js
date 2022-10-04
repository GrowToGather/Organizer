import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './activity-manager.css'

const ActivityManager = (props) => {

    const [state, setState] = useState({activityName: "", openActivity: false, activityList: props.data});

    function createEventType() {
        axios.post('https://www.73743355.xyz:23892/organizer/event-type', {
          eventName: document.getElementById("createEventTypeText").value
        })
    }

  return (
    <div className="activity-manger-container">
      <span className="activity-manager-title-text">
        <span>Enter Activity name and update existing one or create a new Activity:</span>
        <br></br>
      </span>
        <input
          id="createEventTypeText"
          type="text"
          placeholder="Activity Name"
          className="organizer-events-textinput input"
        />
        {!state.openActivity ? <button className="wide-filter-closed-select button" onClick={() => setState({...state, openActivity: true})}>
            <span className="wide-filter-closed-select-text">{state.actiFilterText}</span>
            <img
              alt=""
              src="/images/website/down-icon.svg"
              className="wide-filter-closed-select-icon"
            />
          </button> :
          <div className="wide-filter-open-select">
            <button className="wide-filter-button button" onClick={() => setState({...state, openActivity: false})}>
              <span className="wide-filter-open-select-text">{state.actiFilterText}</span>
              <img
                alt=""
                src="/images/website/up-icon.svg"
                className="wide-filter-open-select-icon"
              />
            </button>
            <button className="wide-filter-button1 button">
                <img
                    alt=""
                    src={state.filter[0].allActis ? "/images/website/checked-box.svg" : "/images/website/check-box.svg"}
                    className="wide-filter-image"
                />
                <span className="wide-filter-text03">All</span>
            </button>
            {state.filter.length > 0 ? state.filter[0].actiOpts.map((option, idx) => 
              <div key={idx}>
                <button className="wide-filter-button1 button">
                <img
                    alt=""
                    src={option.selected ? "/images/website/checked-box.svg" : "/images/website/check-box.svg"}
                    className="wide-filter-image"
                />
                <span className="wide-filter-text03">{option.text}</span>
                </button>
              </div>
            ) : null}
        </div> }

        <button className="organizer-events-button10 white-button button" onClick={() => createEventType()}>
        <span>
          <span>Create</span>
          <br></br>
        </span>
        </button>
    </div>
  )
}

export default ActivityManager
