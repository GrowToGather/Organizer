import React, { useEffect, useState } from 'react'
import { format, add } from 'date-fns'
import { WebHelper } from './components/helper'

import BigEventCard from './components/big-event-card'
import VLine from './components/v-line'
import WideFilter from './components/wide-filter'
import axios from 'axios'
import './organizer-events.css'

const OrganizerEvents = (props) => {
  const [state, setState] = useState({selectedMonth: Date.now(), filter: [{ allActis: false, actiOpts: []}, {age: -1}, {allLangs: false, langOpts: []},
    {allAreas: false, region: "", areaOpts: [{selected: false, text: "International"}, {selected: false, text: "Regional"}]}], events: [], 
    eventSelected: false, selectedEvent: {}, areas: [], continents: [], countries: [], areaCountries: [], images: []});

  function nextMonth(dir) {
    state.selectedMonth = add(state.selectedMonth, {months: dir})
    WebHelper.getEvents(state, setState);
  }

  function updateEventSelection(filter) {
    WebHelper.getEvents({...state, filter: filter}, setState);
  }

  useEffect(() => {
    document.title = "GrowToGather";

    axios.get("https://www.73743355.xyz:23892/organizer/types")
    .then(response => response.data)
    .then((data) => {
      console.log(data);

      for (let i = 0; i < data.eventTypes.length; i++) {
        state.filter[0].actiOpts[i] = {selected: false, id: data.eventTypes[i].id, text: data.eventTypes[i].eventName};
      }

      for (let i = 0; i < data.languages.length; i++) {
        state.filter[2].langOpts[i] = {selected: false, id: data.languages[i].id, text: data.languages[i].languageName};
      }

      state.areas = data.areas;
      state.continents = data.continents;
      state.countries = data.countries;
      state.areaCountries = data.areaCountries;
      state.images = data.images;

      var selectedDate = new Date(state.selectedMonth);
      axios.get("https://73743355.xyz:23892/events/calendar", { params: {"eventType": [-1], "language": [-1], "age": -1, 
        "startDate": (new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)).getTime() / 1000, 
        "endDate": (new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)).getTime() / 1000} })

        .then(response => response.data)
        .then((data) => {
          console.log(data);
          state.events = data.events;
          setState({...state});
      });
    });
  }, []);


  return (
    <div className="organizer-events-container">
      <div className="organizer-events-container01">
        <WideFilter filter={state.filter} updateEventSelection={updateEventSelection} rootClassName="wide-filter-root-class-name"></WideFilter>
        <div className="events-container14">
          <button className="events-date-left-button button" onClick={() => nextMonth(-1)}>
            <img
              alt=""
              src="/images/website/date-prev.svg"
              className="events-date-left-arrow"
            />
          </button>
          <span className="events-date-text">{ format(new Date(state.selectedMonth), "MMM yyyy") }</span>
          <button className="events-date-right-button button" onClick={() => nextMonth(1)}>
            <img
              alt=""
              src="/images/website/date-next.svg"
              className="events-date-right-arrow"
            />
          </button>
        </div>
        <button className="organizer-events-new-event-button white-button button">
          <div className="organizer-events-new-event-div">
            <img className="organizer-events-new-event-img" src="/images/website/add.svg"/>
            <span className="organizer-events-new-event-text">Create new Event</span>
          </div>
        </button>
        
        {state.events.map((e, idx) => 
          <div key={idx} className="organizer-events-outer-event-div">
            <BigEventCard key={idx} data={e} rootClassName="big-event-card-root-class-name"></BigEventCard> 
            <button className="organizer-events-select-button1 white-button button" 
              onClick={() => setState({...state, eventSelected: true ,selectedEvent: e})}>Select Event</button>

            <button className="organizer-events-select-button2 white-button button">Copy Event</button>
          </div>)}

      </div>
      <div className="organizer-events-container15">
        <span className="organizer-events-text25">Edit Event</span>
        <div className="organizer-events-container16">
          <div className="organizer-events-container17">
            <span className="organizer-events-text26">
              <span>Choose Activity:</span>
              <br></br>
            </span>
            <select className="organizer-events-select">
              {state.filter[0].actiOpts.map((obj, idx) => <option key={idx} value={obj.id}>{obj.text}</option>)}
            </select>
          </div>
          <div className="organizer-events-container18">
            <span className="organizer-events-text29">
              <span>Create new Activity:</span>
              <br></br>
            </span>
            <div className="organizer-events-container19">
              <input
                type="text"
                placeholder="Activity Name"
                className="organizer-events-textinput input"
              />
              <button className="organizer-events-button10 white-button button">
                <span>
                  <span>Add</span>
                  <br></br>
                </span>
              </button>
            </div>
          </div>
        </div>
        <VLine rootClassName="v-line-root-class-name7"></VLine>
        <div className="organizer-events-container20">
          <div className="organizer-events-container21">
            <span className="organizer-events-text35">
              <span>Choose Language:</span>
              <br></br>
            </span>
            <select className="organizer-events-select1">
              {state.filter[2].langOpts.map((obj, idx) => <option key={idx} value={obj.id}>{obj.text}</option>)}
            </select>
          </div>
          <div className="organizer-events-container22">
            <span className="organizer-events-text38">
              <span>Create new Language:</span>
              <br></br>
            </span>
            <div className="organizer-events-container23">
              <input
                type="text"
                placeholder="Language Name"
                className="organizer-events-textinput01 input"
              />
              <button className="organizer-events-button11 white-button button">
                <span>
                  <span>Add</span>
                  <br></br>
                </span>
              </button>
            </div>
          </div>
        </div>
        <VLine rootClassName="v-line-root-class-name8"></VLine>
        <div className="organizer-events-container24">
          <div className="organizer-events-container25">
            <span className="organizer-events-text44">
              <span>Choose Area:</span>
              <br></br>
            </span>
            <select className="organizer-events-select2">
              {state.areas.map((obj, idx) => <option key={idx} value={obj.id}>{obj.name}</option>)}
            </select>
            <ul className="organizer-events-ul list">
              <li className="organizer-events-li list-item">
                <span>Text</span>
                <VLine rootClassName="v-line-root-class-name5"></VLine>
              </li>
              <li className="organizer-events-li1 list-item">
                <span>Text</span>
                <VLine rootClassName="v-line-root-class-name6"></VLine>
              </li>
              <li className="organizer-events-li2 list-item">
                <span>Text</span>
              </li>
            </ul>
          </div>
          <div className="organizer-events-container26">
            <span className="organizer-events-text50">
              <span>Create new Area:</span>
              <br></br>
            </span>
            <div className="organizer-events-container27">
              <input
                type="text"
                placeholder="Area Name"
                className="organizer-events-textinput02 input"
              />
              <button className="organizer-events-button12 white-button button">
                <span>
                  <span>Add</span>
                  <br></br>
                </span>
              </button>
            </div>
            <ul className="organizer-events-ul1 list">
              <li className="list-item">
                <div className="organizer-events-container28">
                  <span className="organizer-events-text56">Text</span>
                  <button className="organizer-events-remove-button white-button">
                    <img
                      alt=""
                      src="/images/website/remove-icon.svg"
                      className="organizer-events-image10"
                    />
                  </button>
                </div>
                <VLine rootClassName="v-line-root-class-name3"></VLine>
              </li>
              <li className="organizer-events-li4 list-item">
                <div className="organizer-events-container29">
                  <span className="organizer-events-text57">Text</span>
                  <img
                    alt="image"
                    src="https://play.teleporthq.io/static/svg/default-img.svg"
                    className="organizer-events-image11"
                  />
                </div>
                <VLine rootClassName="v-line-root-class-name4"></VLine>
              </li>
              <li className="organizer-events-li5 list-item">
                <div className="organizer-events-container30">
                  <span className="organizer-events-text58">Text</span>
                  <img
                    alt="image"
                    src="https://play.teleporthq.io/static/svg/default-img.svg"
                    className="organizer-events-image12"
                  />
                </div>
              </li>
            </ul>
            <div className="organizer-events-container31">
              <select className="organizer-events-select3">
                {state.countries.map((obj, idx) => <option key={idx} value={obj.id}>{obj.name}</option>)}
              </select>
              <button className="organizer-events-button13 white-button button">Add</button>
            </div>
          </div>
        </div>
        <VLine rootClassName="v-line-root-class-name9"></VLine>
        <div className="organizer-events-container32">
          <span className="organizer-events-text59">Title:</span>
          <input
            type="text"
            placeholder="Event Title"
            className="organizer-events-textinput03 input" 
            defaultValue={ state.eventSelected ? state.selectedEvent.name : ""}
          />
        </div>
        <VLine rootClassName="v-line-root-class-name10"></VLine>
        <div className="organizer-events-container33">
          <span className="organizer-events-text60">Event Link:</span>
          <input
            type="text"
            placeholder="https://link.to.event/call"
            className="organizer-events-textinput04 input"
            defaultValue={ state.eventSelected ? state.selectedEvent.link : ""}
          />
        </div>
        <VLine rootClassName="v-line-root-class-name11"></VLine>
        <div className="organizer-events-container34">
          <span className="organizer-events-text61">
            <span>Description:</span>
            <br></br>
          </span>
          <textarea
            placeholder="Detailed Description of Event"
            className="organizer-events-textarea textarea"
            defaultValue={ state.eventSelected ? state.selectedEvent.Description : ""}
          ></textarea>
        </div>
        <VLine rootClassName="v-line-root-class-name12"></VLine>
        <div className="organizer-events-container35">
          <div className="organizer-events-container36">
            <span className="organizer-events-text64">Choose Date:</span>
            <input
              type="datetime-local"
              className="organizer-events-textinput05 input"
              defaultValue={state.eventSelected ? (new Date(state.selectedEvent.date * 1000)).toISOString().slice(0, -8) : "" }
            />
          </div>
          <div className="organizer-events-container37">
            <span className="organizer-events-text65">Duration:</span>
            <div className="organizer-events-container38">
              <span className="organizer-events-text66">Hours: </span>
              <input
                type="number"
                placeholder="1"
                className="organizer-events-textinput06 input"
                defaultValue={state.eventSelected ? parseInt((state.selectedEvent.endDate - state.selectedEvent.date) / 3600) : ""}
              />
              <span className="organizer-events-text67">Minutes: </span>
              <input
                type="number"
                placeholder="30"
                className="organizer-events-textinput07 input"
                defaultValue={state.eventSelected ? parseInt((state.selectedEvent.endDate - state.selectedEvent.date) / 60) % 60 : ""}
              />
            </div>
          </div>
        </div>
        <VLine rootClassName="v-line-root-class-name13"></VLine>
        <div className="organizer-events-container39">
          <div className="organizer-events-container40">
            <span className="organizer-events-text68">
              <span>Minimal Age:</span>
              <br></br>
            </span>
            <input
              type="number"
              placeholder="18"
              className="organizer-events-textinput08 input"
              defaultValue={ state.eventSelected ? state.selectedEvent.ageMin : ""}
            />
          </div>
          <div className="organizer-events-container41">
            <span className="organizer-events-text71">
              <span>Maximal Age:</span>
              <br></br>
            </span>
            <input
              type="number"
              placeholder="999"
              className="organizer-events-textinput09 input"
              defaultValue={ state.eventSelected ? state.selectedEvent.ageMax : ""}
            />
          </div>
        </div>
        <VLine rootClassName="v-line-root-class-name14"></VLine>
        <div className="organizer-events-container42">
          <div className="organizer-events-container43">
            <span className="organizer-events-text74">
              <span>Choose Image:</span>
              <br></br>
            </span>
            <button className="organizer-events-button14 white-button button">
              <img
                alt=""
                src="/images/website/image-icon.svg"
                className="organizer-events-image13"
              />
            </button>
          </div>
          <div className="organizer-events-container44">
            <span className="organizer-events-text77">
              <span>Create Image:</span>
              <br></br>
            </span>
            <div className="organizer-events-container45">
              <input
                type="file"
                placeholder="placeholder"
                className="organizer-events-textinput10 input"
              />
              <button className="organizer-events-button15 white-button button">Add</button>
            </div>
          </div>
        </div>
        <VLine rootClassName="v-line-root-class-name15"></VLine>
        <div className="organizer-events-container46">
          <button className="organizer-events-button16 yellow-button button">
            Create new Event
          </button>
          <div className="organizer-events-container47"></div>
          <button className="organizer-events-button17 red-button button">
            Delete Event
          </button>
        </div>
        { !state.eventSelected ? <div className="organizer-events-edit-overlay"><span className="organizer-events-edit-overlay-text">
          <b>Create, Select or Copy an Event</b></span></div> : null }

      </div>
    </div>
  )
}

export default OrganizerEvents
