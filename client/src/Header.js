import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  const isAdmin = userInfo?.isAdmin;

  return (
    <header>
      <Link to="/" className="logo">E-Cell Blog</Link>
      <nav>
        {username && (
          <>
            {isAdmin && <Link to="/create">Create new post</Link> }
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
      </nav>
    </header>
  );
}
