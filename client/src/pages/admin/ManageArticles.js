import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ArticlesList from '../ArticlesList';
import "../../styles/pages/AdminPage.css"

export default class ManageArticles extends Component {
  render() {
    return (
      <div>
        <Button className="logout" href="/home">Logout</Button>
        <h2 className="title">Articles</h2>
        <ArticlesList status='Admin'/>
        <Button href="/admin/create-article" variant="primary" style={{margin: 15}}>Create Article</Button>
      </div>
    );
  }
}
