import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import {Navigate} from 'react-router-dom'

const Header = () => {

    const [username, setUsername] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/profile', {
            credentials: 'include'
        }).then(res => {
            res.json().then(userInfo => setUsername(userInfo.username));
        })
    }, [])

    const logout = () => {
        fetch('http://localhost:3000/logout', {
            credentials: 'include',
            method: 'post'
        }).then(() => setUsername(null));
    }

    return (
        <>
            <header>
                <Link to="/" className="logo">
                    Blog
                </Link>
                <nav>
                    {username && (
                        <>
                            <Link to={'/createpost'}>Create New Post</Link>
                            <Link onClick={logout}>Logout</Link>
                        </>
                    )}
                    {!username && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )
                    }
                </nav>
            </header>
        </>
    )
}

export default Header