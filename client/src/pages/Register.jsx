import React, { useState } from 'react'

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = async (e) => {
        e.preventDefault();
        console.log({username, password});
        await fetch('http://localhost:3000/register', {
            method: 'post',
            body: JSON.stringify({username, password}),
            headers: {'Content-type': 'application/json'}
        })

    }

    return (
        <div className="form-container" onSubmit={register}>
            <h2>Register</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register