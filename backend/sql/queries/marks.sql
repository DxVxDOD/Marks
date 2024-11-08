-- name: Create_Marks :one
INSERT INTO marks (id, created_at, updated_at, title, tag, url, user_id)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;