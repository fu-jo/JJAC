import React, {useState, useEffect} from 'react'
import firebase from '../../firebase'

import Post from './Post/Post'

const SORT_OPTIONS = {
    'DATE_ASC': {column:'date', direction:'asc'},
    'DATE_DESC': {column:'date', direction:'desc'},
    'TITLE_ASC': {column:'title', direction:'asc'},
    'TITLE_DESC': {column:'title', direction:'desc'},
}

function usePosts(sortBy='TITLE_ASC') {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const unsubscribe = //drop subscription to firestore
            firebase.firestore().collection('posts')
            .orderBy(SORT_OPTIONS[sortBy].column,SORT_OPTIONS[sortBy].direction)
            .onSnapshot((snapshot) => {
                const newPosts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setPosts(newPosts)
            })

        return () => unsubscribe()  //callback when unmounted
    },[sortBy])

    return posts
}

const Posts = () => {
    const [sortBy, setSortBy] = useState('TITLE_ASC') //default
    const posts = usePosts(sortBy)

    return (
        <div>
            <h2>Posts</h2>
            <div>
                <label>Sort By</label>{' '}
                <select value={sortBy} onChange={e => setSortBy(e.currentTarget.value)}>
                    <option value='TITLE_ASC'>Title (a-z)</option>
                    <option value='TITLE_DESC'>Title (z-a)</option>
                    <option disabled>---</option>
                    <option value='DATE_ASC'>Date (earliest)</option>
                    <option value='DATE_DESC'>Date (latest)</option>
                </select>
            </div>
            <ol>
                {posts.map((post) => 
                    <Post post={post}/>
                )}
            </ol>
        </div>
    )
}

export default Posts