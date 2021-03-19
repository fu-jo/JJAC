import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import React, {useState, useEffect} from 'react'

import { firestore } from '../firebase'

import ArticleCard from './ArticleCard'

const SORT_OPTIONS = {
    'DATE_ASC': {column:'date', direction:'asc'},
    'DATE_DESC': {column:'date', direction:'desc'},
    'TITLE_ASC': {column:'title', direction:'asc'},
    'TITLE_DESC': {column:'title', direction:'desc'},
}

function usePosts(sortBy='DATE_DESC') {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const unsubscribe = //drop subscription to firestore
            firestore.collection('posts')
            .orderBy(SORT_OPTIONS[sortBy].column,SORT_OPTIONS[sortBy].direction)
            .onSnapshot((snapshot) => {
                const newPosts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setPosts(newPosts)
            })

        return () => unsubscribe()  //callback when unmounted
    },[sortBy])

    return posts
}

const FeaturedArticles = () => {
    const [sortBy, setSortBy] = useState('DATE_DESC') //default
    const posts = usePosts(sortBy).slice(0, 3)

    return (
            <Container>
              <Row>
                <Col>
                  <h4>Featured Articles</h4>
                </Col>
                <Col className="view-all-link">
                  <Link to="/articles-list">View All</Link>
                </Col>
              </Row>
              <div className="cards-container">
                <Row>
                  {posts.map((article, idx) => <ArticleCard article={article} idx={idx}/>)}
                </Row>
              </div>
            </Container>

    )
}

export default FeaturedArticles
