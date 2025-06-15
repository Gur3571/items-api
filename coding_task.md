# Full-Stack Coding Task: Django API + React App

## Task Overview

You’ll be building a small API in Django that supports basic CRUD operations and a single-page React app that communicates with the API. The task will help assess your understanding of both Django backend development and React frontend development.

---

## Part 1: Django API (Backend)

**Objective**: Create a simple Django app with a REST API to manage a collection of "items".

### 1. Data:
- An item entity should have at least the following fields
    - `name`: Name of the item.
    - `description`: Description of the item.
    - `group`: Item group.
    - `created_at`: Timestamp for when the item was created.
    - `updated_at`: Timestamp for when the item was last updated.

### 2. API Endpoints:
- Create the following endpoints:
    1. **GET /items/**: List all items.
    2. **POST /items/**: Create a new item.
    3. **PATCH /items/{id}/**: Update an existing item.
    4. **GET /items/{id}/**: Get a specific item by its ID.

- Any library or framework can be used to help build the API endpoints (such as Django Rest Framework).

### 3. Additional rules to adhere to:
- Have at least 2 item groups - Primary, Secondary
- There should be only unqiue item names in each group (e.g item with name "Rock" can be both in Primary and Secondary groups, but there can't be 2 items named "Rock" in the same group, e.g Primary)

### 4. Error Handling: 
- Return appropriate HTTP status codes for success and failure (e.g., 404 for "not found", 400 for "bad request", etc.).

---

## Part 2: React App (Frontend)

**Objective**: Create a small React app that communicates with the Django API and allows users to interact with the items.

### 1. App Structure:
- Build a small app to interact with the API. You can choose the structure and methods for managing state, making HTTP requests, and organizing components. Utilize all endpoints and build the following functionality - list items, create new item, review single item, update existing item.

### 2. Design:
- Feel free to use any a UI framework (such as Chakra UI, or something else).

---

## Part 3: Task Submission

- Submit code to Git repository and provide access to it
- Provide a **working Django API** that can be run locally, with appropriate instructions on how to set it up.
- Provide a **React app** that communicates with the API.
- The code for both the backend (Django) and frontend (React) can be within the same repository, but they must be runnable as separate apps (e.g., you should be able to start the backend and frontend independently).
- Include a `README.md` with setup instructions.

---