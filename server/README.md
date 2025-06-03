# Law Firm Backend Server

This directory contains the backend server for the Law Firm website application. It is built with Node.js, Express, Sequelize ORM, and PostgreSQL.

## Setup and Installation

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm (comes with Node.js)
*   Docker and Docker Compose (or just Docker Engine if running PostgreSQL container directly)

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Navigate to Server Directory:**
    ```bash
    cd server
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Environment Variables:**
    *   Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    *   Open `server/.env` and fill in the required variables:
        *   `DB_HOST`: Hostname of your PostgreSQL server (e.g., `localhost` if using local Docker).
        *   `DB_USER`: PostgreSQL username.
        *   `DB_PASSWORD`: PostgreSQL password.
        *   `DB_NAME`: Name of the database.
        *   `DB_PORT`: Port for PostgreSQL (default is `5432`).
        *   `DB_DIALECT`: Should be `postgres`.
        *   `PORT`: Port on which the backend server will run (e.g., `3001`).
        *   `API_SECRET_KEY`: A strong, random string used to protect write-access API endpoints. Generate a secure key for production.

5.  **Database Setup:**
    *   **Using Docker Compose (Recommended for local development):**
        *   Ensure you have a `.env` file in the *project root* (`<repository_name>/.env`) with at least the following variables for Docker Compose to use:
            ```
            DB_USER=your_db_user_for_container
            DB_PASSWORD=your_db_password_for_container
            DB_NAME=your_db_name_for_container
            DB_PORT=5432
            ```
            (These can be the same as in `server/.env` for simplicity in local dev).
        *   From the *project root* directory, start the PostgreSQL container:
            ```bash
            docker-compose up -d postgres_db
            ```
            (If `docker-compose` is not found, try `docker compose up -d postgres_db`).
    *   **Run Database Migrations:**
        *   After the database container is running and `server/.env` is configured, navigate to the `server` directory and run:
            ```bash
            npx sequelize-cli db:migrate
            ```

## Running the Server

*   **Development Mode (with Nodemon for auto-restarts):**
    ```bash
    npm run dev
    ```
*   **Production Mode:**
    ```bash
    npm start
    ```
The server will typically run on the port specified in `PORT` (e.g., `http://localhost:3001`).

## API Endpoints

The server exposes the following API endpoints under the `/api` prefix:

*   **Team Members:**
    *   `GET /api/team-members`: Lists all team members. (Public)
    *   `GET /api/team-members/:id`: Gets a specific team member by ID. (Public)
    *   `POST /api/team-members`: Creates a new team member. (Protected)
    *   `PUT /api/team-members/:id`: Updates a team member. (Protected)
    *   `DELETE /api/team-members/:id`: Deletes a team member. (Protected)

*   **Practice Areas:**
    *   `GET /api/practice-areas`: Lists all practice areas. (Public)
    *   `GET /api/practice-areas/:id`: Gets a specific practice area by ID. (Public)
    *   `POST /api/practice-areas`: Creates a new practice area. (Protected)
    *   `PUT /api/practice-areas/:id`: Updates a practice area. (Protected)
    *   `DELETE /api/practice-areas/:id`: Deletes a practice area. (Protected)

*   **Testimonials:**
    *   `GET /api/testimonials`: Lists all testimonials. (Public)
    *   `GET /api/testimonials/:id`: Gets a specific testimonial by ID. (Public)
    *   `POST /api/testimonials`: Creates a new testimonial. (Protected)
    *   `PUT /api/testimonials/:id`: Updates a testimonial. (Protected)
    *   `DELETE /api/testimonials/:id`: Deletes a testimonial. (Protected)

**Authentication:**
POST, PUT, and DELETE requests to the protected endpoints require an `X-API-KEY` header containing the value set for `API_SECRET_KEY` in your `server/.env` file.

## Testing

*   To run the backend API tests:
    ```bash
    npm test
    ```
    This command uses `cross-env` to set `NODE_ENV=test` and runs Jest. Ensure your test database configuration in `server/src/config/config.cjs` (under the `test` environment) is correctly set up if using a separate database for tests. The current test setup uses the development database and truncates tables before each test.

## Content Management

Currently, content (Team Members, Practice Areas, Testimonials) is managed by making direct API calls (e.g., using Postman or curl with the API key) or by direct database manipulation. A user-friendly admin interface is a planned future enhancement.
