import React, { useEffect, useState } from 'react'
import './manage-types.css'
import ActivityManager from './types/activity-manager'

const ManageTypes = (props) => {

  function showManager() {
    switch (props.type) {
        case 0:
            return <ActivityManager data={props.data}></ActivityManager>
    }
  }

  return (
    <div className="manage-types-container">
      <div className="manage-types-container01">
        <button className="manage-types-remove-button white-button" onClick={() => props.close()}>
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
