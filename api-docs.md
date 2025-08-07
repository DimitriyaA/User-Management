# 📚 API Документация

## Base URL
```
/api/users
```

## Endpoints

### ✅ POST `/`
Създаване на нов потребител.
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
Връща всички потребители.

**Query params (по избор):**
- `sortBy=lastName` или `sortBy=dateOfBirth`
- `search=ivan`
- `page=1&limit=10`

---

### 🔎 GET `/:id`
Връща потребител по ID.

---

### ✏️ PUT `/:id`
Обновява потребител по ID.

---

### ❌ DELETE `/:id`
Изтрива потребител по ID.