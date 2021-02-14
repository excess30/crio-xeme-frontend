import { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import config from '../config';

class MemeForm extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.formRef = createRef();

        this.state = {
            validated: false,
            data: {
                name: "",
                caption: "",
                url: ""
            }
        }
    }

    onSubmit(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            axios.post(`${config.backend}/meme`, this.state.data)
                .then((_) => {
                    alert("posted!");
                    ReactDOM.findDOMNode(this.formRef).reset();
                    this.setState({ validated: false })
                })
                .catch((e) => {
                    console.log(e);
                    alert("error posting");
                });
            e.preventDefault();
        }

        this.setState({ validated: true })
    }

    render() {
        return (
            <Form
                id="memeForm"
                noValidate
                validated={this.state.validated}
                onSubmit={this.onSubmit}
                ref={ref => this.formRef = ref}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" placeholder="enter name" onChange={(e) => this.state.data["name"] = e.target.value} />
                    <Form.Control.Feedback type="invalid">
                        Name cannot be empty.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formCaption">
                    <Form.Label>Caption</Form.Label>
                    <Form.Control type="text" placeholder="enter caption" onChange={(e) => this.state.data["caption"] = e.target.value} />
                </Form.Group>

                <Form.Group controlId="formUrl">
                    <Form.Label>URL</Form.Label>
                    <Form.Control required type="text" placeholder="enter meme url" onChange={(e) => this.state.data["url"] = e.target.value} />
                    <Form.Control.Feedback type="invalid">
                        Caption cannot be empty.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Post!
                </Button>
            </Form>
        );
    }
}

export default MemeForm;
