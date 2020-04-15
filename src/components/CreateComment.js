import React, { useState } from 'react';
import        { toast }    from 'react-toastify';


import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';


const CreateComment = ({ articleId, onCreate }) => {
    
    const [ content,   setContent   ] = useState("");
    const [ author,    setAuthor    ] = useState("");

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
        .then(({ status, extra, result }) => {
            if (status === "OK") {
                onCreate({
                    id: result.commentId,
                    content,
                    articleId,
                    created_at: new Date(),
                    authorFirstname: "Omy",
                    authorLastname: "Quevedo"
                });

                setContent("");
                setAuthor("");

            } else {
                toast.error(
                    <div>
                        Oh Oh... Nous avons une erreur !<br />
                        {extra}
                    </div>
                );
            }
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
            // no default
        }
    }

    return (
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
            <Button variant="primary" type="submit">Publier</Button>
        </Form>
    )
};

export default CreateComment;