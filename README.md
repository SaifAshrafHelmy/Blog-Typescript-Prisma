# Blog API Documentation

## Introduction

This documentation provides details on the endpoints and functionalities of the Blog API. The API allows users to perform actions related to authentication and blog post management.

## Base URL

All API endpoints are relative to the base URL:
http://localhost:5000/api/v1

## Authentication

### Register

-   **Endpoint:** `/users/register`
-   **Method:** `POST`
-   **Request Body:**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "SecurePassword123",
        "name": "John Doe"
    }
    ```

### Login

-   **Endpoint:** `/users/login`
-   **Method:** `POST`
-   **Request Body:**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "SecurePassword123"
    }
    ```

### Logout

-   **Endpoint:** `/users/logout`
-   **Method:** `POST`
-   **Request Body:** (Empty)

## Posts

### Create a Post

-   **Endpoint:** `/posts`
-   **Method:** `POST`
-   **Authentication:** No authentication required
-   **Request Body:**
    ```json
    {
        "title": "Best Practices in Software Development",
        "content": "Explore the latest trends and best practices in software development."
    }
    ```

### Update a Post

-   **Endpoint:** `/posts/10` (Replace 10 with the actual post ID)
-   **Method:** `PATCH`
-   **Request Body:**
    ```json
    {
        "title": "Effective Project Management Strategies",
        "content": "Learn about proven project management strategies for successful outcomes."
    }
    ```

### Delete a Post

-   **Endpoint:** `/posts/10` (Replace 10 with the actual post ID)
-   **Method:** `DELETE`
-   **Request Body:** (Empty)
-   **Response:** (No specific response provided in the collection)

### Get All Posts

-   **Endpoint:** `/posts`
-   **Method:** `GET`
-   **Query Parameters:**
    -   `limit` (disabled)
    -   `offset` (disabled)
    -   `search` (disabled)

### Get Current User Posts

-   **Endpoint:** `/posts/mine`
-   **Method:** `GET`
-   **Query Parameters:**
    -   `limit` (disabled)
    -   `offset` (disabled)
    -   `search` (disabled)

### Get Single Post

-   **Endpoint:** `/posts/10` (Replace 10 with the actual post ID)
-   **Method:** `GET`

## Variables

-   `endPoint`: Base URL of the API (http://localhost:5000/api/v1)

## Notes

-   Make sure to replace placeholders (such as post IDs) with actual values when making requests.
-   Refer to the Postman documentation for more information on using collections.
