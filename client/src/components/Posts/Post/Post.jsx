import React from 'react'

const Post = ({ post }) => {
    return (
        <li id={post.id}>
            <div className='post-entry'>
                <h3>{post.title}</h3>
                <h4>{post.content}</h4>
                <h4>{post.description}</h4>
                <code className='post'></code>
            </div>
        </li>
    )
}

export default Post