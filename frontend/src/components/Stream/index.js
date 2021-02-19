import React from 'react';
import axios from 'axios';
import Meme from './child';
require('dotenv').config();

export default class Stream extends React.Component {
    //Declare state variables
    state = {
        isLoading: true,
        memes: [],
        error: null,
    };

    componentDidMount() {
        //GET API request to fetch memes from backend
        axios
        .get("http://localhost:8081/memes")
        .then(response =>
        response.data.map(meme => ({
            _id: `${meme._id}`,
            name: `${meme.name}`,
            caption: `${meme.caption}`,
            url: `${meme.url}`
        })))
        .then(memes => {
        this.setState({
            memes,
            isLoading: false
        });})
        .catch(error => this.setState({ error, isLoading: false }));
    };

    //Render all the fetched memes
    render() {
        const { isLoading, memes } = this.state;
        return (
            <React.Fragment>
            <div>
                {!isLoading ?
                (memes.map((meme) => <Meme _id={meme._id} name={meme.name} caption={meme.caption} url={meme.url}/>))
                 : (<p>Loading...</p>)}
            </div>
            </React.Fragment>
        );
    };
};
