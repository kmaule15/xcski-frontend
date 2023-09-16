import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Link to="trailsearch">Find a Trail</Link>
      <span> </span>
      <Link to="mytrails">My Trails</Link>
      <span> </span>
      <Link to="community">Community</Link>
      <span> </span>
      <Link to="login"> Login</Link>
    </>
  );
};

export default NavBar;
