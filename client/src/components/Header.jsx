import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../UserContext"

const Header = () => {

    const {setUserInfo, userInfo} = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:3000/profile', {
            credentials: 'include'
        }).then(res => {
            res.json().then(usrInfo => setUserInfo(usrInfo));
        })
    }, [])

    const logout = () => {
        fetch('http://localhost:3000/logout', {
            credentials: 'include',
            method: 'post'
        }).then(() => setUserInfo(null));
    }

    const username = userInfo?.username;

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