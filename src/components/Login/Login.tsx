
import "./Login.css"
import './BackgroundSquares.css';
import { Container, Form, Button, Image } from 'react-bootstrap';
import axios from "axios";

const Login = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const payload = {
      username: username,
      password: password,
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/login', payload)

      console.log('Response: ', response.data)
    } catch (error) {
      console.error('An error occurred while logging in:', error)
    }


  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
    <div className="sign-in-box">
      <div className="text-center mb-4">
        <Image
          src="./XCS.png" 
          alt="Brand Logo"
          className="brand-logo"
        />
        <h2>Sign In</h2>
      </div>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="formUsername">
          <Form.Control
            type="text"
            name="username" 
            placeholder="Enter username"
            style={{ maxWidth: '300px' }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            name="password" 
            placeholder="Password"
            style={{ maxWidth: '300px' }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
      <div className="text-center mt-3">
        <a href="#">Forgot Password?</a>
      </div>
      <div className="text-center mt-3">
        <span>Don't have an account?</span>{' '}
        <a href="./signup">Sign Up</a>
      </div>
    </div>
    <div className="squares-background"></div> 
  </Container>
  );
};

export default Login;
