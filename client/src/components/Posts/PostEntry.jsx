import React, { useState } from 'react'
import firebase from '../../firebase'

const PostEntry = () => {
    //const [title, setTitle] = useState(' ') for react hooks
    //const [content, setContent] = useState(' ')
    //const [description, setDescription] = useState(' ')

    function onSubmit(e) {
        e.preventDefault()
        firebase.firestore().collection('posts').add({
            title: e.target.title.value,
            content: e.target.content.value,
            description: e.target.description.value,
            date: e.target.date.value,
            tags: [],
            links:[]
        })
        .then(() => {       //clears form on submit
            e.target.title.value = ''
            e.target.content.value = ''
            e.target.description.value = ''
            e.target.date.value = ''
        })
    }

    return (
    <form onSubmit={onSubmit}>
        <div>
            <label for="title">Title</label>
            <input name="title" type="text" />
        </div>
        <div>
            <label for="description">Description</label>
            <input name="description" type="text" />
        </div>
        <div>
            <label for="content">Content</label>
            <input name="content" type="text" />
        </div>
        <div>
            <label for="date">Date</label>
            <input name="date" type="date" />
        </div>
        
        {//FIXME need tags and links
        /*<div> //for react hooks
            <label for="content">Content</label>
            <input id="content" type="text" value={content} onChange={e => setContent(e.currentTarget.value)} />
        </div>*/}
        <button>Create Post</button>
    </form>
    )
}

export default PostEntry