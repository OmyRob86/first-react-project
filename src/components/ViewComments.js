import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { formatDate } from '../utils/date';

import ListGroup from 'react-bootstrap/ListGroup';

const ViewComments = ({ article_id }) => {

    const [ comments, setComments ] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/comments?articles_id=' + article_id)
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
            toast.error("OH OH... Nous avons eu un problem !");
            console.log(error);
        })
    }, [ article_id ]);

    const renderedComments = comments.map((comment) => {
        return (
            <ListGroup.Item key={comment.id}>
                <p>
                {comment.content}
                </p>
                <small className="text-muted">
                    par {comment.authorFirstname} {comment.authorLastname}&nbsp;
                    le {formatDate(comment.created_at)}
                </small>
            </ListGroup.Item>
        );
    });

    return (
        <div>
        <ListGroup>
            {renderedComments}
        </ListGroup>
        </div>
    );
};

export default ViewComments;