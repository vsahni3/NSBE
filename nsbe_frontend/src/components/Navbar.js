import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './Navbar.css'
import { auth, db, logout } from "../firebase";
import Logo from './img/Logo.png'

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" >
                <img className="navbar_logo" src={Logo}></img>
                <p className="navbar_title">BrutalityWatch</p>
            </Link>

            {/* <Link to="/" className="navbar_title">
                TechTutor
            </Link> */}
            <ul>
                <CustomLink className='navbar_chat' to="/dashboard">Home</CustomLink>
                <CustomLink className='navbar_prompt' to="/prompt">Analysis</CustomLink>
                <button className="navbar_logout" onClick={logout}>
                    Logout
                </button>
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}