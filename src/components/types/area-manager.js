import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './area-manager.css'

const AreaManager = (props) => {

  const [state, setState] = useState({selectedArea: -1, areaName: "", areaList: props.data.areas, openCountrySelection: false, selectedCountries: [],
                                      openContinentList: -1, continentList: props.data.continentList});

    function createArea() {
      axios.post("https://" + window.API_URL + ":23892/organizer/event-type", '{ "eventName": "' + document.getElementById("createAreaText").value + '"}')
        .then(response => response.data)
        .then((data) => {
          state.areaList.areas = data;
          setState({...state})
        });
    }

    function updateArea() {
      axios.put("https://" + window.API_URL + ":23892/organizer/event-type/" + props.data.areas[state.selectedArea].id,
        '{ "eventName": "' + document.getElementById("createAreaText").value + '"}')
        .then(response => response.data)
        .then((data) => {
          state.areaList.areas = data;
          setState({...state})
        });
    }

    function deleteArea() {
      axios.delete("https://" + window.API_URL + ":23892/organizer/event-type/" + props.data.areas[state.selectedArea].id)
      .then(response => response.data)
      .then((data) => {
        state.areaList.areas = data;
        setState({...state, areaName: "", selectedArea: -1})
      });
    }

    function clickListElement(name) {
      var selected;
      for (let i = 0; i < props.data.areas.length; i++) {
        if (props.data.areas[i].name == name) {
          document.getElementById("areaButton").disabled = true;
          selected = i;
        }
      }
      setState({...state, selectedArea: selected, areaName: name});
      document.activeElement.blur();
    }

    function updateInput(name) {
      var selected = -1;
      for (let i = 0; i < props.data.areas.length; i++) {
        if (props.data.areas[i].name == name) {
          document.getElementById("areaButton").disabled = true;
          selected = i;
          continue;
        }
      }
      if (selected == -1) {
        document.getElementById("areaButton").disabled = false;
        setState({...state, areaName: name});
      } else {
        setState({...state, selectedArea: selected, areaName: name});
      }
    }

    function showAreaList() {
      var counter = 0;
      var list = props.data.areas.map((option) => option.name.toLowerCase().includes(state.areaName.toLowerCase()) ?
        <div key={counter++}>
          <button className="area-manager-area-button white-button button" onClick={() => clickListElement(option.name)} 
            onMouseDown={(e) => e.preventDefault()}><span className="area-manager-area-text">{option.name}</span></button>
        </div> : null
      )
      if (counter == 0) {
        return <span className="area-manager-no-area">No Areas Found.</span>
      }
      return list;
    }

  function selectAllCountries(continentID) {
    var val = !state.continentList[continentID].allSelected;
    state.continentList[continentID].allSelected = val;
    for (let i = 0; i < state.continentList[continentID].countries.length; i++) {
      state.selectedCountries[state.continentList[continentID].countries[i].id - 1] = val;
      
    }
    setState({...state});
  }

  function selectOption(countryID) {
      state.selectedCountries[countryID - 1] = !state.selectedCountries[countryID - 1];
      setState({...state});
  }

  function openCountrySelection() {
    var selection = Array(248).fill(false);
    if (props.data.areaCountries) {
      for (let i = 0; i < props.data.areaCountries.length; i++) {
        if (props.data.areaCountries[i].areaID == state.selectedArea + 1) {
          selection[props.data.areaCountries[i].countryID - 1] = true;
        }
      }
    }
    setState({...state, openCountrySelection: !state.openCountrySelection, selectedCountries: selection});
  }

  function countSelectedCountries() {
    var count = 0;
    for (let i = 0; i < state.selectedCountries.length; i++) {
      if (state.selectedCountries[i]) {
        count++;
      }
    }
    return count;
  }

  return (
    <div className="area-manager-container">
      <span className="area-manager-title-text">Enter Area name and update existing one or create a new Area.</span>
      <span className="area-manager-selected-text">Selected Area: {state.selectedArea != -1 ? props.data.areas[state.selectedArea].name : ""}</span>
        <div className="area-manager-input-div">
          <input
            id="createAreaText"
            type="text"
            placeholder="Area Name"
            value={state.areaName}
            onChange={(e) => updateInput(e.target.value)}
            className="area-manager-name-input input"
            autoComplete="off"
          />
          <div className="area-manager-list-activities">
            <div className="area-manager-inner-list-activities">
              {props.data.areas.length > 0 ? showAreaList() : null}
            </div>
          </div>

          <span className="area-manager-selected-amount-text">Selected Country Amount: {countSelectedCountries()}</span>
          <button className="area-manager-closed-select button" onClick={() => openCountrySelection()}>
            <span className="area-manager-closed-select-text">Select Countries inside Area</span>
            <img
              alt=""
              src={state.openCountrySelection ? "/images/website/up-icon.svg" : "/images/website/down-icon.svg"}
              className="area-manager-closed-select-icon"
            />
          </button>
          {state.openCountrySelection ? <div className="area-manager-open-select-outer">
            <div className="area-manager-open-select">
              {state.continentList.map((continent, continentIdx) =>
                <div key={continentIdx} className="area-manager-full-width">
                  <div className="area-manager-continent-select-div">
                    <button className="area-manager-select-all-countries button" onClick={() => selectAllCountries(continentIdx)}>
                      <img
                        alt=""
                        src={continent.allSelected ? "/images/website/white-checked.svg" : "/images/website/white-check.svg"}
                        className="area-manager-image"
                      />
                    </button>
                    <button className="area-manager-continent-select button" 
                      onClick={() => setState({...state, openContinentList: state.openContinentList == continentIdx ? -1 : continentIdx })}>
                      <span className="area-manager-continent-select-text">{continent.name}</span>
                      <img
                        alt=""
                        src={state.openContinentList == continentIdx ? "/images/website/filter-up.svg" : "/images/website/filter-down.svg"}
                        className="area-manager-continent-select-icon"
                      />
                    </button>
                  </div>
                  {state.openContinentList == continentIdx ? <div className="area-manager-country-list">
                    {continent.countries.map((country, idx) => 
                      <button key={idx} className="area-manager-button1 button" onClick={() => selectOption(country.id)}>
                        <img
                          alt=""
                          src={state.selectedCountries[country.id - 1] ? "/images/website/checked-box.svg" : "/images/website/check-box.svg"}
                          className="area-manager-image"
                        />
                        <span className="area-manager-text03">{country.name}</span>
                      </button>
                    )}
                  </div> : null}
                </div>
              )}
            </div>
          </div> : null}
            
        </div>
        <div>
          <button id="areaButton" className="area-manager-create-button white-button button" onClick={() => createArea()}>Create new Area</button>
          <button className="area-manager-update-button white-button button" onClick={() => updateArea()}>Update selected Area</button>
          <button className="area-manager-delete-button red-button button" onClick={() => deleteArea()}>Delete selected Area</button>
        </div>
    </div>
  )
}

export default AreaManager
