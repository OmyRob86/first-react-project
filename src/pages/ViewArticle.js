import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils/date';
import ViewComments from '../pages/ViewComments'

import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import CardDeck from 'react-bootstrap/CardDeck';

const ViewArticle = ({ match }) => {
    const { id } = match.params;
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

    return(
        <Container>
            <h1>{article.title}</h1>
            <p>
                {article.content}
            </p>
            <p>
                posté le {formatDate(new Date())}<br/>
                par {article.authorFirstname} {article.authorLastname}
            </p>
           <CardDeck>
               <ViewComments articles_id = { id } />
           </CardDeck>
        </Container>
    );
};

export default ViewArticle