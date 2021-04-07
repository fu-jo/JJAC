import React from 'react'
import LinesEllipsis from "react-lines-ellipsis";

import Button from 'react-bootstrap/Button'
import { firestore } from '../../../firebase'

const User = ({user, idx}) => {
  async function deleteUser() {
    console.log(user.id)
    await firestore.collection('users').doc(user.id).delete();
  }

  return (
    <tr key={idx}>
      <td>
        <a href={`article/${user.id}`} className="article-link">
          <div className="article-box full-width">
            <span>
              {user.displayName}
              {"\n"}
            </span>
          </div>
        </a>
      </td>
      <td>
      {user.email && ( <p>{user.email}</p> )}
      {// <LinesEllipsis
              //   text={article.content}
              //   maxLine="2"
              //   ellipsis="..."
              //   basedOn="words"
              //   className="article-content"
              // />
      }
      </td>
      <td>
        <Button variant='success'>Edit</Button>
        <Button variant='danger' onClick={deleteUser}>Delete</Button>
      </td>
    </tr>
  )  
}

export default User;