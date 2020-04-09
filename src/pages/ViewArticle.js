import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils/date';

import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';

const ViewArticle = ({ match }) => {
    const { id } = match.params;
    console.log(id);
    const [ article, setArticle ] = useState({});

    useEffect(() => {
        fetch('http://localhost:3001/api/article?id=' + id)
            .then((result) => {
               return result.json();
            })
            .then(({ status, article }) => {
                if (status === "OK") {
                    setArticle(article);
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
            <h1>{article.title}</h1>
            <p>
                {article.content}
            </p>
            <p>
                Posté le {formatDate(new Date())}<br />
                Par {article.authorFirstname} {article.authorLastname}
            </p>
            <div>
                Commentaires
            </div>
        </Container>
    );
};

export default ViewArticle