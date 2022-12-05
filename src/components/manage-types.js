import React, { useEffect, useState } from 'react'
import './manage-types.css'
import ActivityManager from './types/activity-manager'
import AreaManager from './types/area-manager'
import ImageManager from './types/image-manager'
import LanguageManager from './types/language-manager'

const ManageTypes = (props) => {

  function showManager() {
    switch (props.type) {
        case 0:
          return <ActivityManager data={props.data}></ActivityManager>
        case 1:
          return <LanguageManager data={props.data}></LanguageManager>
        case 2:
          return <AreaManager data={props.data}></AreaManager>
        case 3:
          return <ImageManager data={props.data}></ImageManager>
    }
  }

  return (
    <div className="manage-types-container">
      <div className="manage-types-container01">
        <button className="manage-types-remove-button yellow-button" onClick={() => props.close()}>
          <img
            alt=""
            src="/images/website/remove-icon.svg"
            className="manage-types-remove-icon"
          />
        </button>
        {showManager()}
      </div>
    </div>
  )
}

export default ManageTypes
