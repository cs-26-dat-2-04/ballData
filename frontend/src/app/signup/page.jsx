import "./StyleLogin.css";
import React from "react";

export default function CoachLogin() {
  return (
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Opret Bruger</title>
</head>
<body>
    <div className="wrapper">
        <h1>Opret Bruger</h1>
        <form>
            <div>
                <input type="firstname" name="firstname" id="fistname-input" placeholder="Fornavn"/>
            </div>
            <div>
                <input type="email" name="email" id="email-input" placeholder="Email"/>
            </div>
            <div>
                <input type="password" name="password" id="password-input" placeholder="Password"/>
            </div>
            <div>
                <input type="password" name="repeat-password" id="repeat-password-input" placeholder="Gentag Password"/>
            </div>
            <button type="submit">Opret Bruger</button>
        </form>
    </div>
</body>
</html>
  )
};