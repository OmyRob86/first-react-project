import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils/date';
import { toast } from 'react-toastify';

import Container from 'react-bootstrap/Container';
import ViewComments from '../components/ViewComments';


const ViewArticle = ({ match }) => {
    const { articleId } = match.params;

    const [ article, setArticle ] = useState({});

    useEffect(() => {
        fetch('http://localhost:3001/api/article?id=' + articleId)
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
                toast.error("Oups nous avons un probléme !");
                console.log(error);
            })
    }, [ articleId ]);


    return(
        <Container>
            <h1>{article.title}</h1>
            <p>
                {article.content}
            </p>
            <p>
                posté le {formatDate(article.created_at)}<br/>
                par {article.authorFirstname} {article.authorLastname}
            </p>
            <ViewComments articleId = {articleId} />
        </Container>
    );
};

export default ViewArticle