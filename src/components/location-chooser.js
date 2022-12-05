import React, { useState } from 'react'

import PropTypes from 'prop-types'

import HLine from './h-line'
import './location-chooser.css'

const LocationChooser = (props) => {
  const [state, setState] = useState({showCountryList: false, selectedContinent: 0});
  var continentCountries = getContinentCountries();

  function getContinentCountries() {
    var list = Array.from(Array(7), () => Array());
    for (let i = 0; i < props.locationData.countries.length; i++) {
      const c = props.locationData.countries[i];
      list[c.continentID - 1].push(c);
    }
    return list;
  }

  function selectContinent(id) {
    setState({...state, showCountryList: true, selectedContinent: id - 1});
  }

  return (
    <div className="location-chooser-container">
      <div className="location-chooser-container1">
        <div className="location-chooser-title-bar">
          {state.showCountryList ? <button className="location-chooser-return-button yellow-button button" 
            onClick={() => setState({...state, showCountryList: false})}>
            
            <img
              src="/images/website/return-icon.svg"
              alt=""
              className="location-chooser-return-image"
            />
          </button> :
          <span className="location-chooser-return-replacement"/>}
          <span className="location-chooser-text">Select your Location</span>
          <button className="location-chooser-close-button yellow-button button" onClick={() => props.close(-1)}>
            <img
              src="/images/website/remove-icon.svg"
              alt=""
              className="location-chooser-close-image"
            />
          </button>
        </div>
        {!state.showCountryList ? <div className="location-chooser-continent-div">
          <span className="location-chooser-text1">Select Continent:</span>
          <HLine rootClassName="h-line-root-class-name11"></HLine>
          {props.locationData.continents.map((continent, idx) => 
            <button key={idx} className="location-chooser-continent-button white-button button" 
              onClick={() => selectContinent(continent.id)}>{continent.name}</button>
          )}
        </div> :
        <div className="location-chooser-country-div">
          <span className="location-chooser-text2">Select Country in {props.locationData.continents[state.selectedContinent].name}:</span>
          <HLine rootClassName="h-line-root-class-name12"></HLine>
          <div className="location-chooser-container2">
          {continentCountries[state.selectedContinent].map((country, idx) => 
            <button key={idx} className="location-chooser-country-button white-button button" onClick={() => props.close(country.id - 1)}>{country.name}</button>)}
          </div>
        </div>}
      </div>
    </div>
  )
}

export default LocationChooser
