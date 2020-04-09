import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils/date';

import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';

const ViewComment = ({ match }) => {
    const { id } = match.params;
    console.log(id);
    const [ comment, setComment ] = useState({});

    useEffect(() => {
        fetch('http://localhost:3001/api/comment?article_id=' + article_id)
            .then((result) => {
               return result.json();
            })
            .then(({ status, comment }) => {
                if (status === "OK") {
                    setComment(comment);
                } else {
                    toast.error("OH OH... Nous avons eu un problem !");
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [ id ]);

    return (
        <Container>
            <p>
                {comment.content}
            </p>
            <p>
                Posté le {formatDate(new Date())}<br />
                Par {comment.authorFirstname} {comment.authorLastname}
            </p>
        </Container>
    );
};

export default ViewComment