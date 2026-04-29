"use client";

<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CoachLogin</title>
</head>
<body>
    <div className="wrapper">
        <h1>Login</h1>
        <form>
            <div>
                <input type="firstname" name="firstname" id="fistname-input" placeholder="Firstname"/>
            </div>
            <div>
                <input type="email" name="email" id="email-input" placeholder="Email"/>
            </div>
            <div>
                <input type="password" name="password" id="password-input" placeholder="Password"/>
            </div>
            <div>
                <input type="password" name="repeat-password" id="repeat-password-input" placeholder="Repeat Password"/>
            </div>
            <button type="submit">Signup</button>
        </form>
    </div>
</body>
</html>