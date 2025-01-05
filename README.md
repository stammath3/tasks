# Tasks Fullstack App 🚀

## Overview 

**Tasks Fullstack App** is a web application that allows users to manage tasks. The app enables adding, selecting, and deleting users, while allowing users to create and complete tasks. Each user has specific tasks associated with them, and tasks can be managed via an easy-to-use interface.

### Key Features: ✨
- Add, delete, and select users.
- Create and complete tasks for selected users.
- View tasks associated with a user in a list.
- Interact with tasks: create and delete them.

## Technologies Used: 🛠️
- **Backend**: 
  - .NET (C#)
  - Entity Framework
  - SQL Server
  - Azure App Service and Azure SQL Database
  
- **Frontend**: 
  - Angular
  - TypeScript
  - HTML/CSS
  - Cypress (for testing)

## Architecture: 🏗️
This app is a full-stack application with a **frontend** and **backend**:

1. **Backend Application**:
    - **.NET Core API**: Handles server-side logic, communicates with the database, and provides APIs for the frontend to interact with.
    - **Entity Framework**: Used for ORM to interact with the SQL database.
    - **SQL Server**: Database for storing users and tasks.
    - **Swagger**: To interact with API endpoints and test them directly from the browser.
    - **GitHub Actions**: Automates the build, test, and deployment processes.

2. **Frontend Application**:
    - **Angular**: Framework for building the user interface.
    - **Cypress**: For end-to-end testing of both the frontend UI and API interactions.
    - **Angular Services**: To communicate with the backend API.

## Deployment 📦

Both the frontend and backend are deployed to **Azure**. The app is accessible through the following live link:
- [App URL](https://tasks-fullstack-app-a3fnb9f6cyf2cuca.northeurope-01.azurewebsites.net/)

Additionally, the app is continuously deployed using **GitHub Actions**. The workflow file is available at: 
- [GitHub Actions](https://github.com/stammath3/tasks/actions)

## Backend API Endpoints: 🔌

The backend provides several API endpoints to interact with users and tasks:

1. **Users**:
    - `GET /api/users`: Fetch all users.
    - `POST /api/users`: Create a new user.
    - `DELETE /api/users/{id}`: Delete a user by ID.
    - `PUT /api/users/{id}`: Update user data.

2. **Tasks**:
    - `GET /api/tasks`: Fetch all tasks.
    - `POST /api/tasks`: Create a new task.
    - `DELETE /api/tasks/{id}`: Delete a task by ID.

You can explore these endpoints and their details through **Swagger**.

## Folder Structure 📁

- **Backend**:
    - **Controllers**: Contains the API endpoints (show controllers).
    - **Data**: Includes migrations and data context, using the repository pattern for data abstraction (show data folder).
    - **Entities and DTOs**: Define the application data models (show entities).
    - **Services and Helpers**: Organizes logic for cleaner code (show extension folder, helpers).
    - **wwwroot**: Static files served by the backend (show static files).
    - **Program.cs**: Configures the backend application, including CORS support and security settings (show program.cs).

- **Frontend**:
    - **Cypress**: Contains end-to-end tests for UI and API interactions (show cypress folder).
        - **Create Task**: Test for creating tasks via API and UI (show create-task.cy.ts).
        - **Create User**: Test for adding new users (show create-user.cy.ts).
        - **Delete User**: Test for deleting users (show delete-user.cy.ts).
        - **Task and User Retrieval**: Ensures tasks and users are fetched correctly (show tasks, users tests).
    - **Components**: Contains Angular components for the app's UI.
    - **Services**: Contains logic for communicating with the backend API (show services).
    - **Shared**: Contains environment variables and shared resources (show environment.ts).
    - **SSL**: Contains self-signed certificates for HTTPS in local development (show ssl folder).
    - **Assets**: Static files like images or styles.

- **Optional**:
    - **Docker Compose**: Used for setting up SQL Server locally (show docker-compose.yml).
    - **Git Ignore**: Contains files/folders excluded from being committed to version control (show .gitignore).
    - **Readme**: This file you are reading.

## Local Development Setup 🌱

To run the app locally, follow the steps below.

### Backend:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tasks-fullstack-app.git
   cd tasks-fullstack-app/backend

2. Restore the .NET dependencies:
   ```bash
    dotnet restore

3. Apply the database migrations:
    dotnet ef database update

4. Run the application:
    dotnet run


### Frontend:

1. Navigate to the frontend directory:

    cd tasks-fullstack-app/frontend

2. Install the required dependencies: 
    npm install

3. Run the frontend: 
    ng serve

Visit http://localhost:4200 to view the application.

### Automated Testing with Cypress 🧑‍💻

    - API and UI Tests: Tests are written using Cypress. 
    These tests ensure the correctness of both the frontend and backend. 
    Run the tests using the command:

    npx cypress open

Thank you for checking out my Tasks Fullstack App! If you encounter any issues or have suggestions, please open an issue on GitHub.

### Key Points Covered: 📌

- **Overview**: Explains the core functionality of your app (tasks and users).
- **Technologies**: Mentions the frameworks and tools used (Angular, .NET Core, SQL Server, Cypress).
- **Backend and Frontend Breakdown**: Discusses the structure and key parts of both the backend and frontend applications.
- **Deployment**: Provides details on Azure deployment and CI/CD via GitHub Actions.
- **Folder Structure**: Describes key folders and their contents.
- **Testing**: Explains the automated tests using Cypress.
- **Setup Instructions**: Gives instructions on how to set up and run the app locally.

Enjoy! 🎉