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
    {
    "email": "saif2023@gmail.com",
    "password": "123123123",
    "name": "Saif"
    }

### Login

-   **Endpoint:** `/users/login`
-   **Method:** `POST`
-   **Request Body:**
    {
    "email": "saif2023@gmail.com",
    "password": "123123123"
    }

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
    {
    "title": "the waffle",
    "content": "this waffe is my favourite banana ever!"
    }
-   **Response:** (No specific response provided in the collection)

### Update a Post

-   **Endpoint:** `/posts/10` (Replace 10 with the actual post ID)
-   **Method:** `PATCH`
-   **Request Body:**
    {
    "title": "the greatest waffle everrrr!!",
    "content": "That's a good waffle!",
    "id": 15
    }
-   **Response:** (No specific response provided in the collection)

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
-   **Response:** (No specific response provided in the collection)

### Get User Posts

-   **Endpoint:** `/posts/mine`
-   **Method:** `GET`
-   **Query Parameters:**
    -   `limit` (disabled)
    -   `offset` (disabled)
    -   `search` (disabled)
-   **Response:** (No specific response provided in the collection)

### Get Single Post

-   **Endpoint:** `/posts/10` (Replace 10 with the actual post ID)
-   **Method:** `GET`
-   **Response:** (No specific response provided in the collection)

## Events

The collection includes two events, one for the prerequest and another for the test phase. Currently, no scripts are provided for these events.

## Variables

-   `endPoint`: Base URL of the API (http://localhost:5000/api/v1)

## Notes

-   Make sure to replace placeholders (such as post IDs) with actual values when making requests.
-   Refer to the Postman documentation for more information on using collections.
