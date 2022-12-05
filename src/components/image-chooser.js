import React, { useState } from 'react'

import './image-chooser.css'

const ImageChooser = (props) => {
  const [state, setState] = useState({imageName: "", resultAmount: 20});

  var shortedPaths = [];
  getShortenedPaths();

  function getShortenedPaths() {
    for (let i = 0; i < props.data.length; i++) {
      const path = props.data[i].path.split(/[/.]/g);
      shortedPaths[i] = path[path.length - 2];
    }
  }

  function updateInput(name) {
    setState({...state, imageName: name, resultAmount: 20});
  }

  function showGallery() {
    var list = [];
    var counter  = 0
    for (let i = 0; i < shortedPaths.length; i++) {
      const name = shortedPaths[i];
      if (state.resultAmount > counter) {
        if (name.toLowerCase().includes(state.imageName.toLowerCase())) {
          counter++;
          list.push(
            <div className="image-chooser-preview-div">
              <button className="image-chooser-preview-button button" onClick={() => props.close(props.data[i].path)}>
                <img
                  alt=""
                  src={window.location.host + props.data[i].path}
                  className="image-chooser-preview-image"
                />
              </button>
              <span className="image-chooser-preview-name">{name}</span>
            </div>);
        }
      } else {
        list.push(
          <button className="image-chooser-more-images yellow-button button" onClick={() => setState({...state, resultAmount: state.resultAmount + 20})}>
            <span className="image-chooser-more-images-text">Load More Images</span>
            <img
              alt=""
              src="/images/website/down-icon.svg"
              className="image-chooser-next-image-icon1"
            />
          </button>);
        break;
      }
    }
    return list;
  }

  return (
    <div className="image-chooser-container">
      <div className="image-chooser-container1">
        <span className="image-chooser-text">Select Image Event</span>
        <input
          type="text"
          placeholder="Enter Image Name"
          value={state.imageName}
          onChange={(e) => updateInput(e.target.value)}
          className="image-chooser-search-input input"
          autoComplete="off"
        />
        <div className="image-chooser-container2">
          <div className="image-chooser-container3">
            {showGallery()}
          </div>
        </div>
        <button className="image-chooser-remove-button yellow-button" onClick={() => props.close(null)}>
          <img
            alt=""
            src="/images/website/remove-icon.svg"
            className="image-chooser-remove-icon"
          />
        </button>
      </div>
    </div>
  )
}

export default ImageChooser
