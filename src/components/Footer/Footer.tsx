import './Footer.css';
import { Container } from 'react-bootstrap';

const Footer = () => {



  return (
    <footer className="bg-dark text-light">
      <Container className="py-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 ">
            <ul className="list-unstyled">
              <li><a href="./" className="text-light text-decoration-none">Home</a></li>
              <li><a href="./" className="text-light text-decoration-none">About</a></li>
              <li><a href="./" className="text-light text-decoration-none">Services</a></li>
              <li><a href="./" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-6 text-end">
            <p>© 2023 XCS</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
