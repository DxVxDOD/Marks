-- name: GetUserByUsername :one
SELECT * FROM users
WHERE username = ?;

-- name: AddUser :one
INSERT INTO users (
  username,
  password_hash,
  email
) VALUES ( ?,?,? )
RETURNING *;
