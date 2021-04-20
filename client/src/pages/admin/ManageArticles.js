import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ArticlesList from '../ArticlesList';
import "../../styles/pages/AdminPage.css"

export default class ManageArticles extends Component {
  render() {
    return (
      <div>
        <Button className="user-view" href="/home">User View</Button>
        <h2 className="title">Articles</h2>
        <ArticlesList onAdmin/>
        <Button href="/admin/create-article" variant="primary" style={{margin: 15}}>Create Article</Button>
      </div>
    );
  }
}
