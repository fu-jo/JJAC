import React, {useState, useEffect} from 'react'
import firebase from '../../firebase'

function usePosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        firebase.firestore().collection('posts')
        .onSnapshot((snapshot) => {
            const newPosts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setPosts(newPosts)
        })
    },[])

    return posts
}

const Posts = () => {
    const posts = usePosts()

    return (
        <div>
            <h2>Posts</h2>
            <div>
                <label>Sort By</label>{' '}
                <select name="" id="">
                    <option value="">Title (a-z)</option>
                    <option value="">Title (z-a)</option>
                    <option disabled></option>
                    <option value="">Date (earliest)</option>
                    <option value="">Date (latest)</option>
                </select>
            </div>
            <ol>
                {posts.map((post) => 
                    <li id={post.id}>
                        <div className='post-entry'>
                            <h3>{post.title}</h3>
                            <h4>post.articleText</h4>
                            <code className='post'></code>
                        </div>
                    </li>
                )}
            </ol>
        </div>
    )
}

export default Posts