
### Project Name: Customer Success Platform

---

### Project Overview:

The Customer Success Platform is a comprehensive application aimed at enhancing communication, transparency, and efficiency within our system. It automates the process of notifying stakeholders about updates or changes, thereby ensuring timely and relevant information dissemination. This project involves the development of various functionalities, including registration and login, role-based management, email notification system, CRUD operations for project charter sections, export functionality, user interface development, and documentation.

---

### Features:

1. **Registration and Login:**
   - Users can register for an account using basic information or log in via Microsoft accounts using Auth0.
   - Integration with Microsoft authentication eliminates the need for separate credentials, enhancing user experience.

2. **Role-Based Management:**
   - Admins have full access to manage projects, sections, and users.
   - Auditors can view project details, assign project managers, and add comments.
   - Project Managers can update project details and submit changes.
   - Other stakeholders have view-only access to project details.

3. **CRUD Operations for Project Charter Sections:**
   - Implement Create/Read/Update/Delete functionality for each of the 15 sections of the project charter.

4. **Email Notification System:**
   - Stakeholders receive email notifications for updates within the platform, triggered by changes in the Audit History table.

5. **Export as a Document:**
   - Users can export project details in a predefined format, including the first 10 CRUD operations from the provided template.

6. **User Interface Development:**
   - A user-friendly interface allows stakeholders to manage notification preferences and view updates.

7. **Documentation:**
   - Comprehensive documentation is provided for all implemented functionalities, configurations, and development processes.

---

### Installation:

1. Clone the repository from [GitHub link](#).
2. Check each frontend and backend directory for its own readme.md for setup.
3. Install dependencies using `npm install` for frontend and `bundle install` for backend.
4. Configure Auth0 for Microsoft authentication.You can refer below repository.
   [GitHub](https://github.com/Rinil-Parmar/Login-Auth0-MSidentity).
5. Set up the database and run migrations using `rails db:create` and `rails db:migrate`.
6. Start the server using `npm start` for frontend and `rails server -p 4000` for backend.

---


# Adding Admin User to Local Database

This is required because I have used a local database for this app. In requirements, PostgreSQL is given. When you log in to the app using auth0 default role is client. Only the admin has access to assign roles. You can not go to the admin dashboard. For that, you have to do it manually😂.
After cloning the project repository and setting it up locally, you can add an admin user to the local database using the following cURL command:

```
curl -X POST http://localhost:4000/api/v1/users -H 'Content-Type: application/json' -d '{"user": {"name": "Admin", "email": "admin@gmail.com", "pass": "null", "role": "admin"}}'
```

This command will send a POST request to the `/api/v1/users` endpoint with the following JSON payload:


After successful execution, You can Register the user with the `admin@gmail.com` email from the auth0 and after login you will get admin access. Now, In another browser, you can log in using MS identity or Google default role will be a client. You can change it from the admin panel in the add user section.

---
# Limitation of the Auth0:-
Generally, Auth0 provides an authentication service that handles user authentication and provides your application with authentication tokens. However, I faced an issue that, in the Chrome browser lost the user data after each refresh but the same thing worked well with the Edge browser. So check it in a different browser for the testing.


### Usage:

1. Register for an account or log in using Microsoft credentials.
2. Navigate through different sections of the platform to perform CRUD operations or view project details.
3. Manage user roles and permissions as an Admin.
5. Receive email notifications for updates in the platform.
6. Export project details as a document for offline reference.

---

### Contributing:

We welcome contributions to enhance the Customer Success Platform. Please follow the contribution guidelines provided in the repository.

---


### Authors:

- [Rinil Parmar](https://github.com/Rinil-Parmar) 

---

