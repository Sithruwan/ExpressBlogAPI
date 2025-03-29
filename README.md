

```markdown
# Blog API Project

This is a simple Blog API built with Node.js, MySQL, and JWT authentication. Follow the instructions below to set up and run the project locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone <repository_url>
cd <repository_directory>
```

### 2. Install Dependencies

Install all necessary dependencies using npm or yarn:

```bash
npm install
```



### 3. Set up the `.env` File

Create a `.env` file in the root of your project directory to store environment variables. Here's an example of what the file should look like:

```env
APP_PORT=your-port

JWT_SECRET_KEY=your_key


DB_NAME=your_db_name
DB_USER=your_db_username
DB_PASSWORD=your_db_password_here
DB_DIALECT=mysql
DB_HOST=localhost
```

- **`APP_PORT`**: The port on which the server will run (default: `3000`).
- **`JWT_SECRET_KEY`**: The secret key used to sign JWT tokens (change to a secure value).
- **`DB_NAME`**: The name of your MySQL database (you will need to create this database manually, see the next step).
- **`DB_USER`**: The MySQL user to access the database (usually `root` or your custom MySQL user).
- **`DB_PASSWORD`**: The password for the MySQL user (if any).
- **`DB_DIALECT`**: The database dialect, which should be `mysql`.
- **`DB_HOST`**: The hostname or IP address of your MySQL server (use `localhost` if running locally).

### 4. Create the MySQL Database

Before running the project, you'll need to create the database in MySQL manually. Open your MySQL shell or use a MySQL client and run the following command:

```sql
CREATE DATABASE your_db_name;
```

Make sure the database name matches the value of `DB_NAME` in your `.env` file.


### 5. Run the Project

Now you're ready to run the project! Start the server using the following command:

```bash
npm start
```



The server will start and listen on the port defined in your `.env` file (`3000` by default). You should see a message confirming that the server is running.

### 6. Testing the API

Once the server is running, you can test the endpoints using tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

Here’s a more user-friendly README format that clearly explains your API endpoints and Socket.io integration. You can use this format directly in your README file:

---


## API Endpoints

### User Endpoints

1. **User Registration**

   **POST** `/api/v1/user/register`

   **Description:** Registers a new user.

   **Request Body:**
   ```json
   {
     "username": "user1",
     "password": "password123",
      "email" : "test@mail.com"
   }
   ```

2. **User Login**

   **POST** `/api/v1/user/login`

   **Description:** Logs in a user.

   **Request Body:**
   ```json
   {
     "username": "user1",
     "password": "password123"
   }
   ```

---

### Post Endpoints

1. **Create a New Post**

   **POST** `/api/v1/posts`

   **Description:** Creates a new post.

   **Request Body:**
   ```json
   {
     "title": "Angular setup post",
     "content": "lorem ipsum bla bla blaaa..."
   }
   ```

2. **Get All Posts**

   **GET** `/api/v1/posts`

   **Description:** Fetches all posts. You can optionally filter posts by `userId`.

   **Query Parameters:**
   - `userId` (optional): Filter posts by user ID.

   **Example Request:**
   ```
   /api/v1/posts?userId=1
   ```

3. **Get a Single Post by ID**

   **GET** `/api/v1/posts/{postId}`

   **Description:** Fetches a single post by its ID.

   **Example Request:**
   ```
   /api/v1/posts/1
   ```

4. **Update a Post by ID**

   **PUT** `/api/v1/posts/{postId}`

   **Description:** Updates an existing post by its ID.

   **Request Body:**
   ```json
   {
     "title": "React Updated",
     "content": "lorem ipsum bla bla blaaa... updated"
   }
   ```

5. **Delete a Post by ID**

   **DELETE** `/api/v1/posts/{postId}`

   **Description:** Deletes a post by its ID.

---

## Socket.io Real-Time Notifications

The API integrates **Socket.io** for real-time notifications when a post is created, updated, or deleted. The server listens for the following events:

1. **postCreated**: A new post has been created.
2. **postUpdated**: A post has been updated.
3. **postDeleted**: A post has been deleted.

### Socket.io Server Address

- **Server Address:** `http://localhost:3000`

### Event Listeners

Make sure your client-side application listens for these events:

- **postCreated**
- **postUpdated**
- **postDeleted**

---


### 7. Environment Variable Notes

- **Security Consideration**: Do not commit your `.env` file to source control. Add `.env` to your `.gitignore` file to avoid pushing it to your repository.
  
  Example `.gitignore` file:

  ```bash
  # Ignore .env file
  .env
  ```




## Troubleshooting

If you run into any issues, make sure to check the following:

- Double-check that the MySQL database exists and is accessible.
- Verify that your `.env` file is correctly set up.
- Ensure the port defined in `.env` (default `3000`) is not in use.

If the issue persists, check the server logs for specific error messages.
```

---
