import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setredirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    const login = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/login', {
            method: 'post',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-type': 'application/json' },
            credentials: 'include'
        });
        if (response.ok) {
            response.json().then(usrInfo => setUserInfo(usrInfo))
            setredirect(true);
        } else {
            alert('invalid cridentials');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="form-container" onSubmit={login}>
            <h2>Login</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login