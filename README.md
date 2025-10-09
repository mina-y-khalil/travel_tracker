# travel_tracker

<p align="center">
  <img src="https://redeem-innovations.com/wp-content/uploads/2025/10/Screenshot-2025-10-08-at-11.05.47-PM.png" alt="Travel Tracker Cover" />
</p>

## 📖 Overview

Travel Tracker is a simple Node.js + Express + PostgreSQL web application that allows you to log the countries you have visited.  
Users can add countries by typing either the full name or part of the name, and the app looks up the country code, stores it, and displays all visited countries dynamically through an **EJS view**.

## ✨ Features

- Add countries by **partial name search** (`LIKE '%term%'`)
- Prevent duplicates with user-friendly error handling
- Displays total count of visited countries
- EJS rendering for front-end
- Clean PostgreSQL integration

## 🧰 Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL (`pg`)
- **View Engine:** EJS
- **Middleware:** body-parser
- **Styling:** Custom CSS (`public/styles/main.css`)

## 📂 Project Structure

```
TRAVEL_TRACKER/
├─ node_modules/
├─ public/
│  └─ styles/
│     └─ main.css
├─ views/
│  └─ index.ejs
├─ .gitignore
├─ index.js          # main server file
├─ LICENSE
├─ package.json
├─ package-lock.json
└─ README.md
```

## ✅ Prerequisites

- Node.js (>= 18)
- PostgreSQL (>= 13)
- Database named **world** with `countries` and `visited_countries` tables

## 🗄️ Database Setup

### Create Database

```sql
CREATE DATABASE world;
```

### Tables

```sql
-- Master list of countries
CREATE TABLE IF NOT EXISTS countries (
  country_code VARCHAR(2) PRIMARY KEY,
  country_name VARCHAR(100) NOT NULL
);

-- User’s visited countries
CREATE TABLE IF NOT EXISTS visited_countries (
  id SERIAL PRIMARY KEY,
  country_code VARCHAR(2) NOT NULL REFERENCES countries(country_code) UNIQUE
);
```

### Sample Seed Data

```sql
INSERT INTO countries (country_code, country_name) VALUES
('US', 'United States'),
('GB', 'United Kingdom'),
('EG', 'Egypt'),
('FR', 'France'),
('DE', 'Germany')
ON CONFLICT (country_code) DO NOTHING;
```

## 🔐 Configuration

Update the PostgreSQL connection in `index.js` if needed:

```js
const db = new PG.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "password",
  port: 5432,
});
```

## 🚀 Running Locally

```bash
# install dependencies
npm install

# start server
node index.js
# or use nodemon for dev
nodemon index.js
```

App will run at:

```
http://localhost:3000
```

## 🌐 Routes

### **GET /**

- Renders `index.ejs` with:
  - `countries` (array of codes)
  - `total` (count)
  - `error` (if any)

### **POST /add**

- Accepts form data `country=<string>`
- Matches partial name using `LIKE` SQL
- Handles:
  - Duplicate insert → `"Country has already been added, try again."`
  - Invalid name → `"Country name does not exist, try again."`

## 🖼️ Example View Contract

```js
{
  countries: ['US', 'GB', 'EG'],
  total: 3,
  error: undefined | 'Country already added' | 'Country does not exist'
}
```

## 📝 Commit Examples

- `feat: add partial country search with LIKE`
- `fix: handle duplicate country insert gracefully`
- `docs: add setup instructions to README`

---

## 🌐 Connect with Me

Let’s connect and share ideas!

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mina%20Y.%20Khalil-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/mina-y-khalil/)
