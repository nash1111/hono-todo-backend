```
docker compose up -d
bun install
bun x prisma generate
bun run dev
```

create user
```
❯ curl -X POST http://localhost:3000/user   -H "Content-Type: application/json"   -d '{"name": "Alice", "email": "alice@example.com", "password": "secret123"}'
```

get user
```
❯ curl -X GET http://localhost:3000/user
[{"id":1,"name":"Alice","email":"alice@example.com","password":"secret123","createdAt":"2024-12-27T13:50:01.670Z","updatedAt":"2024-12-27T13:50:01.670Z"}]
```

create post
```
❯ curl -X POST http://localhost:3000/todo   -H "Content-Type: application/json"   -d '{"title": "Buy some milk", "userId": 1}'
{"id":1,"title":"Buy some milk","completed":false,"userId":1,"createdAt":"2024-12-27T13:52:04.019Z","updatedAt":"2024-12-27T13:52:04.019Z"}
```

get post
```
❯ curl -X GET http://localhost:3000/todo
[{"id":1,"title":"Buy some milk","completed":false,"userId":1,"createdAt":"2024-12-27T13:52:04.019Z","updatedAt":"2024-12-27T13:52:04.019Z"}]
```