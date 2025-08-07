# 📚 API Documentation

## Base URL
```
/api/users
```

## Endpoints

### ✅ POST `/`
Creates a new user.  
**Body:**
```json
{
  "firstName": "Ivan",
  "lastName": "Petrov",
  "dateOfBirth": "1990-01-01",
  "phoneNumber": "+359888123456",
  "email": "ivan@example.com"
}
```

---

### 🔍 GET `/`
Returns all users.

**Optional query params:**
- `sortBy=lastName` or `sortBy=dateOfBirth`
- `search=ivan`
- `page=1&limit=10`

---

### 🔎 GET `/:id`
Returns a user by ID.

---

### ✏️ PUT `/:id`
Updates a user by ID.

---

### ❌ DELETE `/:id`
Deletes a user by ID.