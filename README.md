# Backend A

A simple Express backend service with CORS enabled for all origins and automatic `"backend": "Backend A"` identification in every JSON response and header.

## Features

- **Backend Identifier**: Every JSON response automatically includes `"backend": "Backend A"`, plus the `X-Backend-Name: Backend A` header.
- **CORS**: Configured with `cors` middleware to allow any origin (`*`) and standard HTTP methods.
- **Auto-reloading dev mode**: Uses Node's built-in `--watch` flag.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server

Production mode:
```bash
npm start
```

Development mode (auto-reload on change):
```bash
npm run dev
```

The server listens on `http://localhost:3000` (or `PORT` environment variable).

## Example Endpoints

- `GET /`
  Returns status and includes the list of 20 employees, automatically stamped with `"backend": "Backend A"`.

- `GET /employees` (or `GET /api/employees`)
  ```json
  {
    "backend": "Backend A",
    "total": 20,
    "employees": [
      {
        "id": 1,
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "department": "Engineering",
        "role": "Senior Software Engineer",
        "salary": 125000,
        "status": "Active",
        "location": "New York, USA",
        "joinDate": "2021-03-15"
      },
      ...
    ]
  }
  ```

- `GET /employees/:id`
  Returns single employee data with `"backend": "Backend A"`.

- `GET /api/ping`
  ```json
  {
    "backend": "Backend A",
    "pong": true
  }
  ```
# cn_project
