import { useEffect } from "react"
import { Link } from "react-router-dom"

const Header = () => {

    useEffect(() => {
        fetch('http://localhost:3000/profile', {
            credentials: 'include'
        })
    }, [])

    return (
        <>
            <header>
                <Link to="/" className="logo">
                    Blog
                </Link>
                <nav>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </nav>
            </header>
        </>
    )
}

export default Header