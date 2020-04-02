import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';

const CreateArticle = () => {
    const [ title,   setTitle   ] = useState("");
    const [ content, setContent ] = useState("");
    const [ author,  setAuthor  ] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("titre : ", title);
        console.log("content : ", content);
        console.log("author : ", author);
    }

    const handleChange = (event) => {
        console.log("target name : ", event.target.name);
        console.log("target value : ", event.target.value);

        /*if (event.target.name === "title") {
            setTitle(event.target.value);
        } else if (event.target.name === "content") {
            setContent(event.target.value);
        } else {
            setAuthor(event.target.value);
        }*/

        switch(event.target.name) {
            case "title":
                setTitle(event.target.value);
                break;
            case "content":
                setContent(event.target.value);
                break;
            case "author":
                setAuthor(event.target.value);
                break;
            // no default
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="article.title" >
                    <Form.Label>Titre de l'Article</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={title}
                        placeholder="titre de l'article"
                    />
                </Form.Group>
                <Form.Group controlId="article.content" >
                    <Form.Label>Contenu de l'Article</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="content"
                        onChange={handleChange}
                        value={content}
                        placeholder="contenu de l'article"
                    />
                </Form.Group>
                <Form.Group controlId="article.author" >
                    <Form.Label>Id de l'Auteur</Form.Label>
                    <Form.Control
                        type="numner"
                        name="author"
                        onChange={handleChange}
                        value={author}
                        placeholder="id de l'auteur"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Creér l'article</Button>
            </Form>
        </Container>
    )
};

export default CreateArticle;