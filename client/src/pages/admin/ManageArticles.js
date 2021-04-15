import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ArticlesList from '../ArticlesList';

export default class ManageArticles extends Component {
  render() {
    return (
      <div>
        <ArticlesList onAdmin="true"/>
        <Button href="/admin/create-article" variant="primary" style={{margin: 15}}>Create article</Button>
      </div>
    );
  }
}
