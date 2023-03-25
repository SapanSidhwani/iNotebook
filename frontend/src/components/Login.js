import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://inotebook-8t59.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token', json.authToken)
            console.log(json);
            props.showAlert("Logged in Successfully", "success");
            navigate('/');
        }
        else{
            props.showAlert("Invalid Details", "danger");
        }
    }
    const onChangeFunc = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value});
    }
    return (
        <div className="mt-2">
            <h2 className="mb-4 text-center">Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChangeFunc} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChangeFunc} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
