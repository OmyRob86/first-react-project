import React from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

import { formatDate } from '../utils/date';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { FaAllergies } from 'react-icons/fa';

const ViewComment = ({ comment, onDelete }) => {
    const { id, content, authorId, authorFirstname, authorLastname, created_at } = comment;

    const [ cookies, setCookie ] = useCookies();

    const handleClick = () => {

        fetch('http://localhost:3001/api/comments/delete', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
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

                onDelete(id);

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

        console.log("Hola Corona :D ");
    }

    const renderTrashButton = () => {
        const user = cookies.user || {};
        if (user.id === authorId) {
            return (
                <Button
                    variant="outline-danger"
                    onClick={handleClick}
                >
                    <FaAllergies />
                </Button>
            )
        }
    };

    return (
        <ListGroup.Item>
            <p>
                {renderTrashButton()}
                &nbsp;{content}
            </p>
            <small className="text-muted">
                par {authorFirstname} {authorLastname}&nbsp;
                le {formatDate(created_at)}
            </small>
        </ListGroup.Item>
    );
};


export default ViewComment