import React from 'react';
import { Link, Redirect, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import LinesEllipsis from "react-lines-ellipsis";

import { firestore } from '../firebase'

const getDate = (dateStr) => {
    let date = new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return date ? date : null;
  };

const Article = ({article, idx, access}) => {
  async function deleteArticle() {
    console.log(article.id)
    await firestore.collection('posts').doc(article.id).delete();
  }

  return (
    <tr key={idx}>
            <td>
              <a href={`/article/${article.id}`} className="article-link">
                <div className="article-box full-width">
                  <span>
                    {article.title}
                    {"\n"}
                  </span>
                  {article.content && (
                    <LinesEllipsis
                      text={article.content}
                      maxLine="2"
                      ellipsis="..."
                      basedOn="words"
                      className="article-content"
                    />
                  )}
                </div>
              </a>
            </td>
            {article.date ? (
              <td>
                <a href ={`/article/${article.id}`} className="article-link">
                  <div className="full-width">{getDate(article.date)}</div>
                </a>
              </td>
            ) : (
              <td>
                <a href={`/article/${article.id}`} className="article-link">
                  <div className="full-width"></div>
                </a>
              </td>
            )}
            {access.status === 'Admin' ? <th>
              <Button variant='success' href={`/admin/modify-article/${article.id}`}>Edit</Button>
              <Button variant='danger' onClick={deleteArticle}>Delete</Button>
            </th>
            :
              ''
            }

    </tr>
  )
}

export default Article;