import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast }      from 'react-toastify';

import Container     from 'react-bootstrap/Container';
import Form          from 'react-bootstrap/Form';
import Button        from 'react-bootstrap/Button';


const Signin = ({ history }) => {
    const [ email,     setEmail     ] = useState ("");
    const [ password,  setPassword  ] = useState ("");
    const [ cookies, setCookie ] = useCookies("userToken");

    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
                // no default
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/api/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then((result) => {
            return result.json();
        })
        .then(({ status, extra, infos }) => {
            if (status === "OK") {
                console.log(infos);
                setCookie("userToken", infos.userToken);
                setCookie("user", infos.user);
                
                history.push('/');
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
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="signin.email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="address@email.tld"
                    />
                </Form.Group>
                <Form.Group controlId="signin.password">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control 
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Connexion</Button>
            </Form>
        </Container>
    );
};

export default Signin;