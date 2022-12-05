import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './image-manager.css'

const ImageManager = (props) => {

    const [state, setState] = useState({selectedImage: -1, imageName: "", imageList: props.data});
    var shortedPaths = [];
    getShortenedPaths();

    function createImage() {
      axios.post("https://" + window.API_URL + ":23892/organizer/event-type", '{ "eventName": "' + document.getElementById("createImageText").value + '"}')
        .then(response => response.data)
        .then((data) => {
          state.imageList.length = 0;
          for (let i = 0; i < data.length; i++) {
            state.imageList[i] = {selected: false, id: data[i].id, text: data[i].imageName};
          }
          setState({...state})
        });
    }

    function updateImage() {
      axios.put("https://" + window.API_URL + ":23892/organizer/event-type/" + props.data[state.selectedImage].id,
        '{ "eventName": "' + document.getElementById("createImageText").value + '"}')
        .then(response => response.data)
        .then((data) => {
          state.imageList.length = 0;
          for (let i = 0; i < data.length; i++) {
            state.imageList[i] = {selected: false, id: data[i].id, text: data[i].imageName};
          }
          setState({...state})
        });
    }

    function deleteImage() {
      axios.delete("https://" + window.API_URL + ":23892/organizer/event-type/" + props.data[state.selectedImage].id)
      .then(response => response.data)
      .then((data) => {
        state.imageList.length = 0;
        for (let i = 0; i < data.length; i++) {
          state.imageList[i] = {selected: false, id: data[i].id, text: data[i].imageName};
        }
        setState({...state, imageName: "", selectedImage: -1})
      });
    }

    function clickListElement(name) {
      var selected;
      for (let i = 0; i < props.data.length; i++) {
        if (props.data[i].text == name) {
          document.getElementById("imageButton").disabled = true;
          selected = i;
        }
      }
      setState({...state, selectedImage: selected, imageName: name});
      document.activeElement.blur();
    }

    function updateInput(name) {
      var selected = -1;
      for (let i = 0; i < props.data.length; i++) {
        if (props.data[i].text == name) {
          document.getElementById("imageButton").disabled = true;
          selected = i;
        }
      }
      if (selected == -1) {
        document.getElementById("imageButton").disabled = false;
        setState({...state, imageName: name});
      } else {
        setState({...state, selectedImage: selected, imageName: name});
      }
    }

    function showImageList() {
      var counter = 0;
      console.log(shortedPaths);
      var list = shortedPaths.map((option) => option.toLowerCase().includes(state.imageName.toLowerCase()) ?
        <div key={counter++}>
          <button className="image-manager-image-button white-button button" onClick={() => clickListElement(option)} 
            onMouseDown={(e) => e.preventDefault()}><span className="image-manager-image-text">{option}</span></button>
        </div> : null
      )
      if (counter == 0) {
        return <span className="image-manager-no-image">No Images Found.</span>
      }
      return list;
    }

    function getShortenedPaths() {
      for (let i = 0; i < props.data.length; i++) {
        const path = props.data[i].path.split(/[/.]/g);
        shortedPaths[i] = path[path.length - 2];
      }
    }

  return (
    <div className="image-manager-container">
      <span className="image-manager-title-text">Enter Image name and update existing one or create a new Image.</span>
      <span className="image-manager-selected-text">Selected Image: {state.selectedImage != -1 ? props.data[state.selectedImage].path : ""}</span>
        <div className="image-manager-input-div">
          <input
            id="createImageText"
            type="text"
            placeholder="Image Name"
            value={state.imageName}
            onChange={(e) => updateInput(e.target.value)}
            className="image-manager-name-input input"
            autoComplete="off"
          />
          <div className="image-manager-list-activities">
            <div className="image-manager-inner-list-activities">
              {props.data.length > 0 ? showImageList() : null}
            </div>
          </div>
          <input 
            type="file"
            className="image-manager-upload-file input"
          />
          <img className="image-manager-upload-image" src="/images/website/image-icon.svg"/>
        </div>
        <div>
          <button id="imageButton" className="image-manager-create-button white-button button" onClick={() => createImage()}>Create new Image</button>
          <button className="image-manager-update-button white-button button" onClick={() => updateImage()}>Update selected Image</button>
          <button className="image-manager-delete-button red-button button" onClick={() => deleteImage()}>Delete selected Image</button>
        </div>
    </div>
  )
}

export default ImageManager
