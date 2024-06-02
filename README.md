# Task Management Web Application SaaS

This project is a simplified version of a task management web application SaaS. It allows users to create, update, delete, and list tasks. Each task has a title, description, due date, and status (e.g., "To Do," "In Progress," "Done"). The application supports multiple users, with each user having their own set of tasks.

## Table of Contents

- [Architecture](#architecture)
- [Design Decisions](#design-decisions)
- [Setup](#setup)
- [Usage](#usage)
- [Testing](#testing)

## Architecture

The application follows a modular architecture with the following main components:

- **Controllers**: Handle HTTP requests and responses.
- **Services**: Business logic and interaction with the data layer.
- **Routes**: Define API endpoints.
- **Utils**: Utility functions and shared modules.
- **Middlewares**: Handle request processing such as logging and error handling.

### Directory Structure

src/
|-- tests/
| |-- taskService.test.ts
| |-- userController.test.ts
|-- controllers/
| |-- taskController.ts
| |-- userController.ts
|-- routes/
| |-- taskRoutes.ts
| |-- userRoutes.ts
|-- services/
| |-- taskService.ts
| |-- userService.ts
|-- utils/
| |-- expressUtils.ts
| |-- logger.ts
| |-- errors.ts
|-- app.ts
|-- server.ts


## Design Decisions

### Error Handling and Logging

Error handling is implemented using custom error classes (`NotFoundError`, `ValidationError`) and logging utilities (`log`, `logError`). This ensures consistent error handling and logging across the application.

### Validation

Input validation is handled in controllers. For example, the `createUser` function checks for the presence of the `name` field and returns a `ValidationError` if it is missing.

### Effect-TS

The application uses the `Effect-TS` library to handle side effects and manage application state in a functional manner. This ensures that the codebase is more maintainable and scalable.

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AmitKumar1972/task-app-server.git
cd task-app-server

2. Install dependencies:
npm install

## Usage
Running the Server
To start the server, run:
npm start

The server will start on http://localhost:3001.

API Endpoints
POST /users: Create a new user.

Request Body: { "name": "John Doe" }
Response: { "id": 1, "name": "John Doe" }
POST /users/
/tasks: Create a new task for the specified user.

Request Body: { "title": "Task Title", "description": "Task Description", "dueDate": "2024-12-31", "status": "To Do" }
Response: { "id": 1, "title": "Task Title", "description": "Task Description", "dueDate": "2024-12-31", "status": "To Do" }
GET /users/
/tasks: Retrieve all tasks for the specified user.

Response: [ { "id": 1, "title": "Task Title", "description": "Task Description", "dueDate": "2024-12-31", "status": "To Do" } ]
GET /users/
/tasks/
: Retrieve a specific task for the specified user.

Response: { "id": 1, "title": "Task Title", "description": "Task Description", "dueDate": "2024-12-31", "status": "To Do" }
PUT /users/
/tasks/
: Update a specific task for the specified user.

Request Body: { "title": "Updated Title", "description": "Updated Description", "dueDate": "2024-12-31", "status": "In Progress" }
Response: { "id": 1, "title": "Updated Title", "description": "Updated Description", "dueDate": "2024-12-31", "status": "In Progress" }
DELETE /users/
/tasks/
: Delete a specific task for the specified user.

Response: 204 No Content
