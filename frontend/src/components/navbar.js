import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <div className="nav">
        <Link to='/'>
          <h1>Meeting Manager</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar