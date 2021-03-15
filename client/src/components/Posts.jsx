import React from 'react'

const Posts = () => {
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
            {/* { posts.map((post) => (
                    <ol>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </ol>
            ))} */}
            <ol>
                <li>
                    <div className='post-entry'>
                        <code className='post'></code>
                    </div>
                </li>
            </ol>
        </div>
    )
}

export default Posts