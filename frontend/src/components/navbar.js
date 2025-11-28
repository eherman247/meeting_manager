import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <div className="nav">
        <Link to='/'>
          <h1>Meeting Manager</h1>
        </Link>
        <nav>
          <Link to='/login'>Login</Link>
          <Link to='/createAccount'>Create Account</Link>
          <Link to='/sessionsOverview'>Sessions Overview</Link>
          <Link to='/timeSession'>Time Session</Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar