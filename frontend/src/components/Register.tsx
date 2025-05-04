import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import axios from '../../axiosConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/global.css';
import '../assets/css/Login.css';

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!username || !password) {
            setErrorMessage("Both username and password are required.");
            return;
        }

        try {
            const response = await axios.post(
              "/auth/register",
              { username, password, firstName, lastName },
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            console.log("register" , response.data.access_token);
          
            const loginRes = await axios.post(
              "/auth/login",
              { username, password },
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            console.log("login" , loginRes.data.access_token)
            sessionStorage.setItem("access_token", loginRes.data.access_token);
            axios.get('/user', {
                headers: {
                        "Authorization": `Bearer ${loginRes.data.access_token}`
                }
                }).then((response) => {
                    const resp = response.data
                    console.log(resp.username)
                    sessionStorage.setItem('User', JSON.stringify({username: resp.username, first_name: resp.first_name, last_name: resp.last_name, goal: resp.goal}))
                }).catch((error) => {
                    console.log(error)
            });
            //create bookshelves that apply to all users
            console.log(loginRes.data.access_token)
            axios.post('/shelf',{shelfName: "Favorite Books"},  {
                headers: {
                    "Authorization": `Bearer ${loginRes.data.access_token}`
            }
            }).then((response) => console.log(response.data)).catch((error) => console.error(error));
            axios.post('/shelf', {shelfName:"Books I've Read"} , {
                headers: {
                    "Authorization": `Bearer ${loginRes.data.access_token}`
                } 
            }).then((response) => {
                console.log(response.data);
                navigate(`/${username}/profile`)}
            ).catch((error) => console.error(error));
            } catch (error: any) {
            console.error(error);
            setErrorMessage(
              error.response?.data?.error || "Registration failed. Try again."
            ); 
        }
    }

    return (
        <main>
            <div id='registration-form'>
                <form onSubmit={handleSubmit} method='post'>
                    <p id='required'>* = required</p>
                    <label htmlFor='first_name'>First Name*</label>
                        <input
                            type='text'
                            name='first_name'
                            id='first_name'
                            autoComplete='first_name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    <label htmlFor='last_name'>Last Name*</label>
                        <input
                            type='text'
                            name='last_name'
                            id='last_name'
                            autoComplete='last_name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />


                    <label htmlFor='username'>Username*</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        autoComplete='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor='password'>Password*</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        autoComplete='new-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <section>
                        {errorMessage && (
                            <p id='error-message' aria-live='assertive'>
                                <FontAwesomeIcon icon={faTriangleExclamation} /> {errorMessage}
                            </p>
                        )}
                    </section>

                    <button className='primary'>Register</button>
                </form>

                <div id='alt'>
                    <p>Already have an account?</p>
                    <Link to='/login'>Sign In</Link>
                </div>
            </div>
        </main>
    );
}

export default Register;
