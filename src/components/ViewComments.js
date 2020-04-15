import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ListGroup from 'react-bootstrap/ListGroup';

import CreateComment from './CreateComment';
import ViewComment from '../components/ViewComment';

const ViewComments = ({ articleId }) => {

    const [ comments, setComments ] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/comments?articles_id=' + articleId)
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
    }, [ articleId ]);

    const handleCreate = (comment) => {
        const newComments = [ ...comments ];

        newComments.push(comment);

        setComments(newComments);
    }

    const handleDelete = (commentId) => {
        const newComments = comments.filter((comment) => {
            return comment.id !== commentId;
        })

        setComments(newComments);
    }

    const renderedComments = comments.map((comment) => {
        return (
            <ViewComment
            key={comment.id}
            comment={comment}
            onDelete={handleDelete}
            />
        );
    });

    return (
        <ListGroup>
            {renderedComments}
            <ListGroup.Item>
                <CreateComment
                articleId={articleId}
                onCreate={handleCreate} />
            </ListGroup.Item>
        </ListGroup>
    );
};

export default ViewComments;