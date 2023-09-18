import React, { useState } from 'react';

const CreateAccount = () => {

    //make constants to hold form data
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, SetEmail] = useState('');

    //POSTs the form data to the backend
    const handleSubmit = (event) => {
        event.preventDefault();

        //TODO: figure out how to post all this shit to the backend

        const formData = {
            username,
            password,
            email
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </label>

            <br />

            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
            </label>

            <br />
            
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(event) => SetEmail(event.target.value)}
                />
            </label>

            <br />
            <button type="submit">Create Account</button>
        </form>
    );
}

export default CreateAccount;