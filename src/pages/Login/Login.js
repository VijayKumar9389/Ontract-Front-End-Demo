import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/api';
import {setLogin} from '../../store/userReducer';

import './Login.scss';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault();
      
        loginUser(username, password)
          .then((res) => {
            if (res.data.auth) {
              dispatch(setLogin(res.data));
            } else {
              // Handle login failure case
            }
          });
      };
      

    return (
        <div className="login-container">
            <h1>OnTract</h1>
            <form className="login-form" >
                <h2 className="login-heading">Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="login-button" type="submit" onClick={login}>Log in</button>
            </form>
        </div>
    );
}

export default Login;