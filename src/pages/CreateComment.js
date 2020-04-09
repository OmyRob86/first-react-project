import React, { useState } from 'react';
import        { toast }    from 'react-toastify';

import Container from 'react-bootstrap/Container';
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';

const CreateComment = () => {
    const [ content,   setContent   ] = useState("");
    const [ author,    setAuthor    ] = useState("");
    const [ articles_id, setArticles_id ] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        
        fetch('http://localhost:3001/api/comments/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                content,
                author,
                articles_id,
            }),
        })
        .then((result) => {
            return result.json();
        })
        .then(({ status, extra }) => {
            if (status === "OK") {
                setContent("");
                setAuthor("");
                setArticles_id("");
                toast.success("Le commentaire viens d'être publié");
            } else {
                toast.error(
                    <div>
                        Oh Oh... Nous avons une erreur !<br />
                        {extra}
                    </div>
                );
            }
            console.log(status);
        })
        .catch((error) => {
            toast.error("Oh Oh... Nous avons une erreur !");
            console.log(error);
        });
    };

    const handleChange = (event) => {

        switch(event.target.name) {
            case "content":
                setContent(event.target.value);
                break;
            case "author":
                setAuthor(event.target.value);
                break;
            case "articles_id":
                setArticles_id(event.target.value);
                break;
            // no default
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="comment.content" >
                    <Form.Label>Créer un commentaire</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="content"
                        onChange={handleChange}
                        value={content}
                    />
                </Form.Group>
                <Form.Group controlId="comment.author" >
                    <Form.Label>Id de l'Auteur</Form.Label>
                    <Form.Control
                        type="number"
                        name="author"
                        onChange={handleChange}
                        value={author}
                    />
                </Form.Group>
                <Form.Group controlId="comment.articles_id" >
                    <Form.Label>Id de l'Article</Form.Label>
                    <Form.Control
                        type="number"
                        name="articles_id"
                        onChange={handleChange}
                        value={articles_id}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Publier</Button>
            </Form>
        </Container>
    )
};

export default CreateComment;