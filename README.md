---
# 🔐 Google OAuth Login with Node.js, Express, Passport.js & MySQL

This full-stack authentication project demonstrates how to integrate **Google OAuth 2.0 login** using **Passport.js** in a **Node.js + Express** server with **MySQL** for storing user data.

---

## 🚀 Features

* 🔑 **Google OAuth 2.0 Login:** Secure authentication using Google's OAuth 2.0.
* 💾 **Persistent User Data with MySQL:** Stores user information in a MySQL database.
* 🔒 **Session Management with `express-session`:** Handles user sessions for a seamless experience.
* ✅ **Automatic Signup on First Login:** New users are automatically registered upon their initial Google login.
* 👤 **Protected Dashboard Route:** Access to certain routes is restricted to authenticated users.
* 🔐 **Logout Functionality:** Allows users to end their sessions securely.

---

## 🧰 Tech Stack

* **Backend:** Node.js, Express.js
* **Authentication:** Passport.js (specifically `passport-google-oauth20`)
* **Database:** MySQL
* **Sessions:** `express-session`
* **Environment Configuration:** `dotenv`

---
## ⚙️ Setup Instructions

Follow these steps to get the project up and running on your local machine.

## 1. Clone the Repository

First, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/Yash03joshi/google-oauth-auth-node.git
cd google-oauth-auth-node
npm install
```
### 4. Configure Environment Variables

This project uses environment variables for sensitive information and configuration. A template file, `example.env`, is provided. You need to create a `.env` file from this template and populate it with your specific values.

**On Linux/macOS:**

```bash
# For Linux
cp env.example .env
# For Windows
copy env.example .env
```

**Get your Google Credentials:**

To obtain `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, you'll need to create a project in the Google Cloud Console.

* *Go to the APIs & Services > Credentials page.*
* Click **Create Credentials > OAuth client ID**.
* Select Web application as the application type.
* Add `http://localhost:3000` to Authorized JavaScript origins.
* Add `http://localhost:3000/auth/google/callback` to Authorized redirect URIs.
* Once created, your client ID and client secret will be displayed.

---
