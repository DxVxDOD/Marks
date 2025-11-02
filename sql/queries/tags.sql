-- name: AddTag :one
INSERT INTO tags (
user_id,
name
) VALUES (
?,?
)
RETURNING *;

-- name: GetAllUserTags :many
SELECT * FROM tags WHERE user_id = ?;
