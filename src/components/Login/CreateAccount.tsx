import React, { useState } from 'react';

const CreateAccount = () => {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, SetEmail] = useState('');

    const handleSubmit = (event) => {

        event.preventDefault();
    };
  };
  
  export default CreateAccount;
  