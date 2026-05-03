import "./StyleLogin.css";
import React from "react";
import Head from 'next/head';


export default function CoachLogin() {
  return (
<>
    <title>Opret Bruger</title>
    <div className="wrapper">
        <Head>
            <title>Opret Bruger</title>
        </Head>
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
</>
  )
};