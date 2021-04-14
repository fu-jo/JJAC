import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ArticlesList from '../ArticlesList';

export default class ManageArticles extends Component {
  render() {
    return (
      <div>
        <h2>Articles</h2>
        <ArticlesList status='Admin'/>
        <Button href="/admin/create-article" variant="primary" style={{margin: 15}}>Create article</Button>
      </div>
    );
  }
}
