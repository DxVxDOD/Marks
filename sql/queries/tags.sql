-- name: AddTag :one
INSERT INTO tags (
user_id,
name
) VALUES (
?,?
)
RETURNING *;
