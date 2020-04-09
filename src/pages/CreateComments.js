import React, { useState } from 'react';
import        { toast }    from 'react-toastify';

import Container from 'react-bootstrap/Container';
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';

const CreateComments = () => {
    const [ content,   setContent   ] = useState("");
    const [ author,    setAuthor    ] = useState("");
    const [ articleId, setArticleId ] = useState("");

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
                articleId,
            }),
        })
        .then((result) => {
            return result.json();
        })
        .then(({ status, extra }) => {
            if (status === "OK") {
                setContent("");
                setAuthor("");
                setArticleId("");
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
        console.log("target name : ", event.target.name);
        console.log("target value : ", event.target.value);

        switch(event.target.name) {
            case "content":
                setContent(event.target.value);
                break;
            case "author":
                setAuthor(event.target.value);
                break;
            case "articleId":
                setArticleId(event.target.value);
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
                <Form.Group controlId="comment.articleId" >
                    <Form.Label>Id de l'Article</Form.Label>
                    <Form.Control
                        type="number"
                        name="articleId"
                        onChange={handleChange}
                        value={articleId}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Publier</Button>
            </Form>
        </Container>
    )
};

export default CreateComments;