import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap'; // Add this line
import "./createAccount.css"
import './BackgroundSquares.css';

const CreateAccount = () => {

    //make constants to hold form data
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, SetEmail] = useState('');

    //POSTs the form data to the backend
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        //TODO: figure out how to post all this shit to the backend

        const formData = {
            username,
            password,
            email
        };

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                console.log('Success');
            } else {
                console.error('Fail');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center">
            <div className="sign-in-box">
                <div className="text-center mb-4">
                    <h2>Create Account</h2>
                </div>
                <Form onSubmit={handleSubmit} className="mt-4">
                    <Form.Group controlId="formBasicUsername">
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            placeholder="Username"
                            style={{ maxWidth: '300px' }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Password"
                            style={{ maxWidth: '300px' }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(event) => SetEmail(event.target.value)}
                            placeholder="Email"
                            style={{ maxWidth: '300px' }}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create Account
                    </Button>
                </Form>
            </div>
            <div className="squares-background"></div> 
        </Container>
    );
}

export default CreateAccount;
