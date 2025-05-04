import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import axios from '../../axiosConfig'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/global.css'
import '../assets/css/Login.css'
import { Bounce, toast } from 'react-toastify';


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const successMessage = (name:string) => toast(`Log in successful. Welcome to your account, ${name}!`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });

    async function handleSubmit(event:FormEvent) {
        event.preventDefault();
        if (username === "" || password === "") {
            setErrorMessage("Username and password are required.");
            return;
        }
        try {
            const response = await axios.post("/auth/login", {
                username,
                password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log("login" , response.data.access_token)
            sessionStorage.setItem("access_token", response.data.access_token); 
            axios.get('/user', {
                headers: {
                        "Authorization": `Bearer ${response.data.access_token}`
                }
                }).then((response) => {
                    const resp = response.data
                    console.log(resp.username)
                    sessionStorage.setItem('User', JSON.stringify({username: resp.username, first_name: resp.first_name, last_name: resp.last_name, goal: resp.goal}))
                    successMessage(resp.first_name);
                }).catch((error) => {
                    console.log(error)
                });
       
                navigate(`/${username}/profile`);
            } catch (error) {
            console.error(error);
            setErrorMessage("Invalid username or password. Please try again.");
            }
    }

    return(
        <main>
            <div id='login-form'>
                <form
                    onSubmit={(event)=>handleSubmit(event)}
                    method='post'>
                        <p id='required'>* = required</p>
                    <label htmlFor='username'>Username</label>
                        <input 
                            type='text'
                            name='username'
                            id='username'
                            autoComplete='on'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            />
                    <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            autoComplete='on'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                    <section>
                        {errorMessage !== "" ? 
                        <><p id='error-message' aria-live='assertive'><FontAwesomeIcon icon={faTriangleExclamation}/> {errorMessage} </p>
                        </> : <></> } 
                    </section>
                    <button className='primary'>Sign In</button>
                </form>
                <div id='alt'>
                    <p>Don't have an account? </p>
                    <Link to='/register'>Sign Up</Link>
                </div>
            </div>

        </main>
    );
}

export default Login;
