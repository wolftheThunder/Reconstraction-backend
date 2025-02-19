Backend API

Setup
1. Clone the Repo
bash
Copy
Edit
git clone <repo-url>
cd <repo-directory>



2. Install Dependencies
bash
Copy
Edit
npm install



3. Create MySQL Database
Create a database using MySQL:

sql
Copy
Edit
CREATE DATABASE backend-api;



4. Configure .env
Create a .env file and add the following configuration:


# Database Configuration
DB_NAME=backend-api
DB_USER=root
DB_PASSWORD=""
DB_HOST=localhost

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
ADMIN_EMAIL_PASSWORD=bldkuauwgnqmzkbr
ADMIN_EMAIL=rashid.khan.maitla13@gmail.com

# JWT Secret
JWT_SECRET=Secret@key!56!

# Server Port
PORT=5656


5. Run Migrations

npx sequelize-cli db:migrate
6. Start the Server

npm start
The server will run on http://localhost:5656.

Admin Login
Use the following credentials to login:

Email: admin@example.com
Password: admin123