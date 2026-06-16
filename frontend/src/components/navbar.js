import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };

  return (
    <header className="navbar">
      <div className="nav">
        <Link to="/">
          <div className="logo-container">
            <img
              src="/MeetingManagerLogo.png"
              alt="Meeting Manager Logo"
              className="logo"
            />
            <h1 className="logo-text">Meeting Manager</h1>
          </div>
        </Link>
        <nav>
          {user && (
            <div>
              {user.email}
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/createAccount">Create Account</Link>
            </div>
          )}
          {user && (
            <div>
              <Link to="/sessionsOverview">Sessions Overview</Link>
              <Link to="/timeSessionCreation">Create Time Session</Link>
            </div>
          )}
          <div>
            <Link to="/timeSession">Time Session</Link>
            <Link to="/joinSession">Join Session</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
