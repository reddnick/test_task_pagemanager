# Page manager
Express/Sequelize/PassportJS/Hbs

How to run:

1. Install dependencies: npm install
2. Start mysql server
3. Create database and check .env file to change settings
4. npm start

Default address:
- login
http://localhost:2000/security/login
- Registration
http://localhost:2000/security/register
- Pages(without security)
http://localhost:2000/{{slug_created_page}}
- List pages
http://localhost:2000/admin/pages
- Add new page
http://localhost:2000/admin/pages/create
- Edit
http://localhost:2000/admin/pages/{{slug_created_page}}/edit
- Delete
http://localhost:2000/pages/{{id}}/delete
- Logout
http://localhost:2000/security/logout
