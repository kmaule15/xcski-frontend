import React, { useState } from 'react';

const CreateAccount = () => {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, SetEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
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