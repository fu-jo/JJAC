import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";
import BottomBar from "../components/BottomBar";

import "../styles/pages/SingleArticle.css";
import testArticle from "../assets/test-article";

export default class SingleArticle extends Component {
  constructor(props) {
    super(props);
    this.getArticleData = this.getArticleData.bind(this);
    this.getDate = this.getDate.bind(this);

    this.state = { articleID: this.props.match.params.id, data: null, loading: true }
  }

  componentDidMount() {
    this.getArticleData(this.state.articleID)
  }

  // this will need to call to the backend when it gets connected
  getArticleData(articleID) {
    try {
      const data = testArticle
      this.setState({data: data, loading: false})
    }
    catch(e) {
      console.log(e)
    }
  }

  getDate(dateStr) {
    let date = new Date(dateStr).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    return (date ? date : null)
  }

  render() {
    return (
      <div>
        {this.props.status === "Member" ? <MemberNavbar /> : <NonMemberNavbar /> }
        <Container className="article">
          {!this.state.loading && (
            <div>
              <h1>{this.state.data.title}</h1>
              <h6>By {this.state.data.author} • {this.getDate(this.state.data.date)}</h6>
              <br/>
              {this.state.data.img && <img className="text-wrap" src={this.state.data.img} />}
              <p>{this.state.data.body}</p>
              <b>
                Tags: {this.state.data.tags.map((tag, idx) => (
                  <a href="/articles-list">
                    <Badge pill variant="primary" key={idx} className="tag-badge">{tag}</Badge>
                  </a>
                ))}
              </b>
            </div>
          )}
        </Container>
        <BottomBar />
      </div>
    );
  }
}
