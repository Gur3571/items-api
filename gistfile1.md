# Full-Stack Coding Task: Django API + React App

## Task Overview

You’ll be building a small API in Django that supports basic CRUD operations and a single-page React app that communicates with the API. The task will help assess your understanding of both Django REST API development and React frontend development.

---

## Part 1: Django API (Backend)

**Objective**: Create a simple Django app with a REST API to manage a collection of "items".

### 1. Models:
- Create a model called `Item` with the following fields:
    - `name`: CharField (Max length: 100)
    - `description`: TextField (Max length: 500)
    - `created_at`: DateTimeField (auto_now_add=True)
    - `updated_at`: DateTimeField (auto_now=True)

### 2. API Endpoints:
- Create the following endpoints using Django REST Framework (DRF):
    1. **GET /items/**: List all items.
    2. **POST /items/**: Create a new item (with a name and description).
    3. **PATCH /items/{id}/**: Update the name or description of an existing item.
    4. **GET /items/{id}/**: Get a specific item by its ID.

- Use Django Rest Framework's serializers to handle input and output validation for the `Item` model.

### 3. Authentication: 
- Use **Session Authentication** (no need to implement token authentication) for simplicity, but just ensure that the API can be accessed after login.

### 4. Error Handling: 
- Return appropriate HTTP status codes for success and failure (e.g., 404 for "not found", 400 for "bad request", etc.).

---

## Part 2: React App (Frontend)

**Objective**: Create a small React app that communicates with the Django API and allows users to interact with the items.

### 1. App Structure:
- Use `useState` and `useEffect` hooks to manage state and perform HTTP requests.
- Create a simple form to add new items (name and description).
- Display the list of items fetched from the Django API.
- Display individual items with the option to update their name/description.
- Use basic form validation to ensure name and description are not empty.

### 2. API Interaction:
- Use **fetch** or **axios** to make HTTP requests to the Django API.
    - `GET` request to `/items/` to retrieve the list of items.
    - `POST` request to `/items/` to create a new item.
    - `PATCH` request to `/items/{id}/` to update an existing item.

### 3. State Management:
- Store items in the state and render them in a list format.
- Add basic error handling (e.g., show an error message if the request fails).

### 4. React Features:
- Use `useEffect` to make the initial `GET` request when the app loads.
- Implement a form to submit new items and update existing ones (via `POST` and `PATCH`).

### 5. Design:
- The design should be simple but functional. You can use basic HTML and CSS (optional to use a UI library like Material-UI or Bootstrap for quicker prototyping).

---

## Part 3: Task Submission

The candidate should:
- Provide a **working Django API** that can be run locally, with appropriate migrations and instructions on how to set it up.
- Provide a **React app** that communicates with the API.
- Include a `README.md` with setup instructions, and a brief explanation of their approach.

---

## Additional Notes:
- **Time Frame**: This task should be completed within **2 hours**.
- **Testing**: The candidate should test the API endpoints with tools like Postman or cURL, and the React app should be tested in the browser.
- **Bonus Points**: Clean code, error handling, validation on both the frontend and backend, and attention to detail in API response status codes.

---

## Evaluation Criteria:

### 1. **Django API**:
- Correct use of Django REST Framework.
- Proper HTTP response codes and error handling.
- Clean and readable code with proper structuring.

### 2. **React App**:
- Correct handling of HTTP requests using `fetch`/`axios`.
- Good use of React hooks (`useState`, `useEffect`).
- Basic form handling and state management.
- UI/UX, even if simple, should be user-friendly.

### 3. **Overall**:
- Proper use of the HTTP protocol (GET, POST, PATCH).
- Clean and maintainable code.
- Attention to detail in functionality and structure.

---
