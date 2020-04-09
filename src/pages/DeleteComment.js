import React, { useState } from 'react';
import        { toast }    from 'react-toastify';

import Container from 'react-bootstrap/Container';
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';

const DeleteComment = () => {
    const [ id, setId ] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

            fetch('http//localhost:3001/api/comments/delete', {
                method: "POST",
                headers: {
                    'Content-Type': 'appication/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    id,
                }),
            })
        .then((result) => {
            return result.json();
        })
        .then(({ status, extra }) => {
            if (status === "OK") {
                setId("");
                toast.success("Le commentaire à bien été supprimé");
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
    }
    const handleChange = (event) => {
        switch (event.target.name) {
            case "id":
                setId(event.target.value);
                break;
            // no default
        }
    }
    
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="comment.id">
                    <Form.Label>Id du commentaire à supprimer</Form.Label>
                    <Form.Control
                        type="number"
                        name="id"
                        onChange={handleChange}
                        value={id}
                    />
                </Form.Group>
                <Button type="submit" >Supprimer commentaire</Button>
            </Form>
        </Container>
    )
};

export default DeleteComment;