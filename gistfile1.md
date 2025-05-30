# Full-Stack Coding Task: Django API + React App

## Task Overview

You’ll be building a small API in Django that supports basic CRUD operations and a single-page React app that communicates with the API. The task will help assess your understanding of both Django backend development and React frontend development.

---

## Part 1: Django API (Backend)

**Objective**: Create a simple Django app with a REST API to manage a collection of "items".

### 1. Models:
- Create a model for "items" with appropriate fields to store relevant data. You are free to decide which fields are necessary and their types.

### 2. API Endpoints:
- Create the following endpoints:
    1. **GET /items/**: List all items.
    2. **POST /items/**: Create a new item.
    3. **PATCH /items/{id}/**: Update an existing item.
    4. **GET /items/{id}/**: Get a specific item by its ID.

- Any library or framework can be used to help build the API endpoints (such as Django Rest Framework, DRF, or any other suitable method).

### 3. Authentication: 
- Implement basic authentication for the API (you can choose any authentication method, such as session-based or token-based).

### 4. Error Handling: 
- Return appropriate HTTP status codes for success and failure (e.g., 404 for "not found", 400 for "bad request", etc.).

---

## Part 2: React App (Frontend)

**Objective**: Create a small React app that communicates with the Django API and allows users to interact with the items.

### 1. App Structure:
- Build a small app to interact with the API. You can choose the structure and methods used for managing state, making HTTP requests, and organizing components.

### 2. API Interaction:
- Use any HTTP client (such as `fetch` or `axios`) to interact with the Django API. 
    - `GET` request to `/items/` to retrieve the list of items.
    - `POST` request to `/items/` to create a new item.
    - `PATCH` request to `/items/{id}/` to update an existing item.

### 3. State Management:
- You can choose your preferred method for managing application state.

### 4. Form Handling:
- Implement forms to submit new items and update existing ones (via `POST` and `PATCH`).

### 5. Design:
- The design should be simple but functional. Feel free to use basic HTML and CSS or incorporate a UI framework (such as Material-UI, Bootstrap, or something else).

---

## Part 3: Task Submission

The candidate should:
- Provide a **working Django API** that can be run locally, with appropriate instructions on how to set it up.
- Provide a **React app** that communicates with the API.
- Include a `README.md` with setup instructions, and a brief explanation of their approach and any design decisions made.

---

## Additional Notes:
- **Time Frame**: This task should be completed within **2 hours**.
- **Testing**: The candidate should test the API endpoints with tools like Postman or cURL, and the React app should be tested in the browser.
- **Bonus Points**: Clean code, error handling, validation on both the frontend and backend, and attention to detail in API response status codes.

---

## Evaluation Criteria:

### 1. **Django API**:
- Correct implementation of API endpoints.
- Proper HTTP response codes and error handling.
- Clean and readable code with proper structuring.

### 2. **React App**:
- Correct handling of HTTP requests using any HTTP client.
- Proper form handling and state management.
- UI/UX, even if simple, should be user-friendly.

### 3. **Overall**:
- Proper use of the HTTP protocol (GET, POST, PATCH).
- Clean and maintainable code.
- Attention to detail in functionality and structure.

---