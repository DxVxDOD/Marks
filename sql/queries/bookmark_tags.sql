-- name: AddBookmarkTag :one
INSERT INTO bookmark_tags (
bookmark_id,
tag_id
) VALUES (
?,?
)
RETURNING *;
