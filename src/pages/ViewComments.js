import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils/date';

import Container from 'react-bootstrap/Container';
import Card      from 'react-bootstrap/Card';
import CardDeck  from 'react-bootstrap/CardDeck';
import { toast } from 'react-toastify';

const ViewComments = ({ articles_id }) => {
    const [ comments, setComments ] = useState ([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/comments?id=' + articles_id)
            .then((result) => {
               return result.json();
            })
            .then(({ status, comments }) => {
                if (status === "OK") {
                    setComments(comments);
                } else {
                    toast.error("OH OH... Nous avons eu un problem !");
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [articles_id]);

    const renderedComments = comments.map((comment) => {
        const { articles_id, content, created_at, authorFirstname, authorLastname } = comment;
        return(
            <Card key={articles_id}>
                <Card.Body>
                    <Card.Text>
                        {content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        Créé le {formatDate(created_at)}&nbsp;
                        Par: {authorFirstname}&nbsp;{authorLastname}.
                    </small>
                </Card.Footer>
            </Card>
        );
    });
    
    return (
        <div>
            <h4>Les derniéres commentaires</h4>
            <Container>
                <CardDeck>
                    {renderedComments}
                </CardDeck>
            </Container>
        </div>
    );
};

export default ViewComments
