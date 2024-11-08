-- name: Create_User :one
INSERT INTO users (id, created_at, updated_at, email, name, hash, salt)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;