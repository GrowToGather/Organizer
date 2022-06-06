import React, { useEffect } from 'react';
import './Events.css';

function Events() {

    useEffect(() => {
        document.title = "Event Page";
    }, []);

    return (
        <div className="Events">
            <div className="topbar">
                <header>
                    <div className="header">
                        <a href="../"><img src="./images/logo.svg" alt="Logo" /></a>

                        <h1 className="logo_text">GTG Organizer</h1>
                    </div>

                    <div className="nav">
                        <ul id="primaryNav" className="hide">
                            <li><a href="./">Events</a></li>
                        </ul>
                    </div>
                </header>
            </div>

            <div className='edit_area'>
                <h1>Edit Event</h1>

                <p>Event type: </p>
                <select/>

                <p>Age: </p>
                <select/>

                <p>Area: </p>
                <select/>

                <p>Language: </p>
                <select/>

                <p>Name: </p>
                <input/>

                <p>Image: </p>
                <button></button>

                <p>Date: </p>
                <input/>

                <p>Link: </p>
                <input/>
                
                <p>Description: </p>
                <input/>

                <br/><br/>
                <button className="btn_edit">Update</button>
                <button className="btn_remove">Delete</button>
            </div>


            <div className='calender_area'>
                <div className="filter">
                    <div className="filter_option">
                        <p className="option">Activity</p>
                        <p className="option">Area</p>
                        <p className="option">Language</p>
                        <p className="option">Age</p>
                    </div>
                    <div className="filter_choice">
                        <p className="choice">choose..</p>
                        <p className="choice">choose..</p>
                        <p className="choice">choose..</p>
                        <p className="choice">choose..</p>
                    </div>
                </div>

                <div className="all">
                    <article className="slider">
                        <h1 className="month">June 2021</h1>
                    </article>
                </div>

                <div className='card'>
                    <div className="flex">
                        <h2 className="title">German Language Lounge</h2>
                        <h3 className="when">Saturday, 5 June 2021 </h3>
                        <h4 className="time">16.30-17.30</h4>

                        <div className="links">
                            <button className="first_link"> <a href="./" className="btn_card"> View Details</a></button>
                            <button className="second_link"><a href="./" className="btn_card2"> <img src="./images/zoom.svg" alt="" className="btn_svg" /> Join via Zoom</a></button>
                        </div>
                    </div>
                    <div className="flex2"><img src="./images/card_pic1.jpg" alt="activity" className="card_picture" /></div>
                    <button className='card_overlay'/>
                </div>
            </div>
        </div>
    );
}

export default Events;