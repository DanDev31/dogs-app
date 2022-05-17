import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className="logo">
        <Link to="/" className='logo'>
          DOGGO
        </Link>
      </div>
      <ul className="navbar__menu">

        <li>
          <Link to="/dogs" className='dogs__link'>
            Dogs
          </Link>
        </li>

        {/* <li>
          <Link to="/About">
            About
          </Link>
        </li> */}

        <li>
          <Link to="newbreed" className='link'>
            Create new dog
          </Link>
        </li>

      </ul>
    </nav>
  )
}
