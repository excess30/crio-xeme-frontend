import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import axios from 'axios';

import config from '../config';

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

        this.loadPosts = this.loadPosts.bind(this);
    }

    loadPosts() {
        axios.get(`${config.backend}/memes`)
            .then((response) => {
                this.setState({
                    data: response.data.sort((a, b) => {
                        const aDate = new Date(a.createdAt);
                        const bDate = new Date(b.createdAt);

                        return bDate - aDate;
                    })
                });
            });
    }

    render() {
        const loadButton = (
            <div style={{ paddingTop: "10px", textAlign: "center" }}>
                <Button onClick={this.loadPosts}>
                    Load posts
                </Button>
            </div>
        );

        if (this.state.data.length === 0) {
            return loadButton;
        }

        console.log(this.state.data)

        const posts = this.state.data.map((post) =>
            <PostCard data={post} />
        );

        return (
            <>
                {loadButton}
                <div style={{ textAlign: "center" }}>
                    <CardColumns style={{ paddingTop: "20px" }}>
                        {posts}
                    </CardColumns>
                </div>
            </>
        )
    }
}

function PostCard(props) {
    const timestamp = new Date(props.data.createdAt);
    const timeString = timestamp.toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric"});

    return (
        <Card style={{ width: "20rem", textAlign: "left" }}>
            <Card.Img variant="top" src={props.data.url} />
            <Card.Body>
                <Card.Title>{props.data.name}</Card.Title>
                <Card.Text>
                    {props.data.caption}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">{timeString}</small>
            </Card.Footer>
        </Card>
    )
}

export default Posts;
