
import "./Login.css"
import './BackgroundSquares.css';
import { Container, Form, Button, Image } from 'react-bootstrap';

const Login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const email = formData.get('email');
    const password = formData.get('password');

    // More to add
    console.log('Email:', email);
    console.log('Password:', password);
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
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email" 
            placeholder="Enter email"
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
        <a href="#">Sign Up</a>
      </div>
    </div>
    <div className="squares-background"></div> 
  </Container>
  );
};

export default Login;
