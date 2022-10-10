This is an [Express](https://expressjs.com/) and [Prisma](https://www.prisma.io/) project. It is a microservice for CRUD operations on people and events. All data is persisted in a [PostgreSQL](https://www.postgresql.org/) database.

# Usage Instructions

### Setup environment file and database

- Make a copy of `.env.example` file and name it `.env`
- Setup a PostgreSQL database and update the connection string in `.env` file. The connection string is defined at `"POSTGRESQL_DATABASE_URL"` variable.

### Install Dependencies

```bash
npm install
```

### Migrate and Seed Database

```bash
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
```

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run prod
```

### Resetting Database

- If you want to reset the database, simply run the following command

  ```bash
  npm run reset-db
  ```

  It will drop the database, create it again and seed it from scratch.

# Endpoints

- **GET** /people<br>
  Returns all people.

  ```
  Example: GET /people
  Response: 200 (success)
  [
    {
        "id": 1,
        "name": "João",
        "created_at": "2022-10-10T17:31:31.019Z",
        "updated_at": "2022-10-10T17:31:31.019Z"
    },
        ...
        ...
        ...
    {
        "id": 4,
        "name": "Bruna",
        "created_at": "2022-10-10T17:31:31.019Z",
        "updated_at": "2022-10-10T17:31:31.019Z"
    }
  ]
  ```

- **GET** /people/{id}<br>
  Returns a specific person by its id.
  ```
  Example: GET /people/2
  Response: 200 (success)
  {
    "id": 2,
    "name": "Pedro",
    "created_at": "2022-10-10T17:31:31.019Z",
    "updated_at": "2022-10-10T17:31:31.019Z"
  }
  ```
- **POST** /people/<br>
  Creates a new user with the provided **name** string.

  ```
  Example: POST /people/
  Body:
  {
    "name": "Bob Martin"
  }

  Response: 201 (created)
  {
    "id": 5,
    "name": "Bob Martin",
    "created_at": "2022-10-10T17:35:24.686Z",
    "updated_at": "2022-10-10T17:35:24.686Z"
  }
  ```

- **PUT** /people/{id}/<br>
  Updates a specific person's name by its id.

  ```
  Example: PUT /people/2
  Body:
  {
      "name": "Marilene"
  }

  Response: 200 (success)
  Body:
  {
      "id": 2,
      "name": "Marilene",
      "created_at": "2022-10-10T17:31:31.019Z",
      "updated_at": "2022-10-10T17:43:01.019Z"
  }
  ```

- **DELETE** /people/{id}<br>
  Deletes a specific person by its id.

  ```
  Example: DELETE /people/2
  Response: 204 (no content)
  ```

- **GET** /people/{id}/events<br>
  Returns all events for a specific person by its id.

  ```
  Example: GET /people/4/events
  Response: 200 (success)
  [
    {
        "id": 2,
        "title": "Festa de casamento",
        "date": "2022-08-02T14:00:00.000Z",
        "created_at": "2022-10-10T17:31:31.024Z",
        "updated_at": "2022-10-10T17:31:31.024Z"
    },
        ...
        ...
        ...
    {
        "id": 4,
        "title": "Festa de 15 anos",
        "date": "2022-08-04T14:00:00.000Z",
        "created_at": "2022-10-10T17:31:31.024Z",
        "updated_at": "2022-10-10T17:31:31.024Z"
    }
  ]

  ```

- **PATCH** /people/{id}/events/{eventId}<br>
  Adds a specific event to a specific person by their ids.

  ```
  Example: PATCH /people/4/events/4
  Response: 204 (no content)
  ```

- **DELETE** /people/{id}/events/{eventId}<br>
  Removes a specific event from a specific person by their ids.

  ```
  Example: DELETE /people/4/events/4
  Response: 204 (no content)
  ```

**Similar routes related to Events:**

- **GET** /events - Returns all events.
- **GET** /events/{id} - Returns a specific event by its id.
- **POST** /events/ - Creates a new event with the provided **title** and **datetime** string.
  ```
    {
        "title": "Festa de 15 anos",
        "date": "2022-08-04T14:00:00.000Z"
    }
  ```
- **PUT** /events/{id} - Updates a specific event's name by its id.
- **DELETE** /events/{id} - Deletes a specific event by its id.
- **GET** /events/{id}/people - Returns all people related to an event by its id.
