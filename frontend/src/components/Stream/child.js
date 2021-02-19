import './child.css';
import React, { useState } from 'react';
import axios from 'axios';
require('dotenv').config();

const Meme = (props) => {
    //Declare state variables
    const [isEdit,setEdit] = useState(false);
    const [newCaption, setCaption] = useState("");
    const [newURL, setURL] = useState("");

    async function update(event) {
        event.preventDefault();
        try {
            //PATCH API request to edit meme

            // const response = await axios({
            //     method: 'PATCH',
            //     url: `http://localhost:8081/memes/${props._id}`,
            //     headers: {'Content-Type': 'application/json'},
            //     //If caption or URL field is left blank, select the original value 
            //     //data: {caption: newCaption?newCaption:props.caption, url: newURL?newURL:props.url}
            //     data: {caption: newCaption, url: newURL}
            //   });
            
            const response = await axios({
                method: 'PUT',
                url: `http://localhost:8081/memes/${props._id}`,
                headers: {'Content-Type': 'application/json'},
                //If caption or URL field is left blank, select the original value 
                data: {name: props.name, caption: newCaption?newCaption:props.caption, url: newURL?newURL:props.url}
                //data: {name: props.name, caption: newCaption, url: newURL}
              });

            // fetch(`http://localhost:8081/memes/${props._id}`,
            //     {method: "PATCH",  
            //     headers: {"Content-type": "application/json"},
            //     body: JSON.stringify({caption: newCaption, url: newURL})
            // })
            // .then(response => { console.log(response.status);
            //     return response.json();  })  
            // .then(data => console.log(data));

            console.log('Returned data:', response);
            window.location.href = window.location.href;
          } catch (err) {
            console.log(`Axios request failed: ${err}`);
          }
    };

    //Form for editing a meme
    function showForm() {
        return (
            <React.Fragment>
                <form>
                    <label>Caption: </label>
                    <input onChange={event => setCaption(event.target.value)}></input>
                    <br/>
                    <label>Meme URL: </label>
                    <input onChange={event => setURL(event.target.value)}></input>
                    <br/>
                    <div class="center">
                        <button class="button1" onClick={update}>Submit</button>
                    </div>
                    <br/>
                </form>
            </React.Fragment>
        );
    };

    //Render an individual meme along with its owner name and caption
    return (
        <div class="child-container1">
            <div class="child-item1">
                <strong>{props.name}</strong>
                <br/>
                {props.caption}
                <div>
                    <img src={props.url} alt="Invalid URL" />
                </div>
                <br/>
            </div>
            <div class="child-container2">
                <button class="button1" onClick={() => setEdit(true)}>Edit</button>
                <br/>
                {/* Render the Edit meme form if button is pressed */}
                {isEdit && showForm()}
            </div>
        </div>
    );
};

export default Meme;
