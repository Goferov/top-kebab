# TopKebab Application

Welcome to **TopKebab**, a modern web application designed for food enthusiasts who love exploring and reviewing restaurants. This platform enables users to browse restaurants, leave reviews, and manage their profiles seamlessly. Administrators can manage restaurant details, ensuring that the platform remains up-to-date and accurate. With its clean design, responsive interface, and robust backend, TopKebab is built to deliver an excellent user experience.

The application adopts a microservice-friendly architecture by separating the frontend and backend, enabling independent scaling and maintenance. Laravel's robust features like middleware and caching with Redis provide a secure and performant backend. React ensures a dynamic and responsive user interface that adapts to various devices. Together, they create a reliable, scalable, and user-friendly system designed for modern web applications.

---

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Database Design and Structure](#database-design-and-structure)
- [Installation](#installation)
    - [Backend](#backend)
    - [Frontend](#frontend)
- [Endpoints](#endpoints)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features

- **Restaurant Management  (admin only)**:
    - Add, update, and delete restaurants.
    - Toggle restaurant publication status.

- **Restaurant Browsing**:
    - List all available restaurants with detailed information.
    - Filter restaurants by city, name, and publication status.
    - Sort restaurants by creation date, name, and average rating.

- **User Reviews**:
    - Submit and manage reviews for restaurants.
    - Calculate and display average ratings for each restaurant.

- **Authentication and Authorization**:
    - Secure registration, login, and logout features.
    - Role-based access control for users and administrators.
    - Password management, including secure change functionality.

- **Responsive Design**:
    - Fully responsive user interface, optimized for mobile, tablet, and desktop devices.

- **Interactive API Documentation**:
    - Swagger UI available at [http://127.0.0.1:8000/swagger](http://127.0.0.1:8000/swagger) for testing and exploring APIs.

- **Caching**:
    - Efficient Redis caching for faster API responses and reduced server load.


---

## Technologies

### Backend
- **Framework**: Laravel 11
- **Authentication**: Sanctum
- **Caching**: Redis
- **API Documentation**: Swagger
- **Database**: Postgresql

### Frontend
- **Framework**: React 19
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

### Infrastructure
- **Containerization**: Docker for consistent development and deployment environments.

---

## Database Design and Structure

- **addresses**: Stores detailed address information for restaurants, including street, city, and postal code.
- **cache**: Manages key-value pairs for cached data, used to improve application performance.
- **cache_locks**: Ensures safe and synchronized access to cache data when multiple processes are involved.
- **failed_jobs**: Logs any failed queued jobs to allow troubleshooting and debugging.
- **jobs**: Handles background tasks processed by Laravel's queue system.
- **job_batches**: Tracks and manages batches of queued jobs for efficient execution and monitoring.
- **migrations**: Keeps track of database migrations applied to the system.
- **password_reset_tokens**: Stores tokens used for password reset functionality.
- **personal_access_tokens**: Manages personal access tokens for API authentication, linked to user accounts.
- **restaurants**: Contains information about restaurants, such as name, contact details, and publication status.
- **reviews**: Manages user reviews for restaurants, including ratings and review content.
- **roles**: Defines user roles, such as admin or standard user, to manage permissions.
- **sessions**: Tracks user session data for authentication and activity monitoring.
- **users**: Stores user information, including personal details, authentication credentials, and roles.

This relational structure ensures scalability and efficient querying for large datasets.

![ERD](ERD.png)

---

## Installation

### Backend

1. Clone the repository and navigate to the `backend` directory:
   ```bash
   git clone https://github.com/your-repository/topkebab.git
   cd topkebab/backend
   ```
   
2. Install dependencies using Composer:

   ```bash
   composer install
   ```
   
3. Configure the .env file:
   - Copy .env.example to .env.
   - Set database credentials and other environment variables.

4. Start Docker containers:
   ```bash
   docker-compose up -d
   ```
5. Run migrations and seeders:

   ```bash
   php artisan migrate --seed
   ```
6. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

The backend API will now be available at `http://127.0.0.1:8000`.


### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend application will now be available at `http://localhost:3000`.



# API Endpoints Overview

## Authentication

- **POST** `/login`: Log in and obtain an API token.
- **POST** `/register`: Register a new user.
- **POST** `/logout`: Log out and invalidate the token.
- **POST** `/change-password`: Change the current user's password.
- **GET** `/user`: Retrieve the authenticated user's details.

## Restaurants

- **GET** `/restaurants`: Retrieve a list of all restaurants.
- **GET** `/restaurants/{id}`: Retrieve details of a specific restaurant.
- **POST** `/restaurants`: Add a new restaurant (admin only).
- **PUT** `/restaurants/{id}`: Update an existing restaurant (admin only).
- **DELETE** `/restaurants/{id}`: Delete a restaurant (admin only).
- **PUT** `/restaurants/{id}/toggle-publish`: Toggle a restaurant's publication status (admin only).

## Reviews

- **GET** `/restaurants/{restaurant}/reviews`: Retrieve reviews for a specific restaurant.
- **POST** `/restaurants/{restaurant}/reviews`: Add a new review for a restaurant.
- **DELETE** `/restaurants/{restaurant}/reviews/{id}`: Delete a review.

---

For detailed API documentation, visit `http://127.0.0.1:8000/swagger`


## Screenshots
Below are screenshots from various parts of the Top Kebab application, showcasing the interface for desktop and mobile devices:



## License

This project is licensed under the [MIT License](LICENSE.md) - see the file for details.