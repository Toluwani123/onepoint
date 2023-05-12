import React from 'react'

const Popup = (props) => {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
            <button className='close-btn' onClick={()=>{props.setTrigger(false)}}><h3>Close</h3></button>
            
            {props.children}
        </div>
    </div>
  ): "";
}

export default Popup