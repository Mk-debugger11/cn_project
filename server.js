import express from 'express';
import cors from 'cors';
import { employees } from './data/employees.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request bodies
app.use(express.json());

// Middleware to inject "Backend A" into every JSON response and header
app.use((req, res, next) => {
  res.setHeader('X-Backend-Name', 'Backend A');

  const originalJson = res.json;
  res.json = function (body) {
    if (body && typeof body === 'object' && !Array.isArray(body)) {
      return originalJson.call(this, {
        backend: 'Backend A',
        ...body
      });
    }

    return originalJson.call(this, {
      backend: 'Backend A',
      data: body
    });
  };

  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Backend A!',
    status: 'online',
    totalEmployees: employees.length,
    employees,
    timestamp: new Date().toISOString()
  });
});

// Endpoint specifically for employees list
app.get(['/employees', '/api/employees'], (req, res) => {
  res.json({
    total: employees.length,
    employees
  });
});

// Endpoint for single employee lookup
app.get('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const employee = employees.find(emp => emp.id === employeeId);

  if (!employee) {
    return res.status(404).json({
      error: `Employee with id ${req.params.id} not found`
    });
  }

  res.json({
    employee
  });
});

// Example API endpoint
app.get('/api/ping', (req, res) => {
  res.json({
    pong: true
  });
});

// Catch-all 404 handler returning JSON with Backend A identification
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    details: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Backend A server is running on http://localhost:${PORT}`);
});
