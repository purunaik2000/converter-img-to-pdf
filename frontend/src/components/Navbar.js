import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [user, setUser] = useState(localStorage.getItem("user"));
    useEffect(() => {
        setUser(localStorage.getItem("user"));
    }, [user]);
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link className="link" to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="link" to="/history">
                        Collection
                    </Link>
                </li>
                <li>
                    <Link className="link" to="/login">
                        {user ? "User" : "Login"}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
