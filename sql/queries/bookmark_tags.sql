-- name: AddBookmarkTag :one
INSERT INTO bookmark_tags (
bookmark_id,
tag_id
) VALUES (
?,?
)
RETURNING *;

-- name: GetAllBookmarkTags :many
SELECT * FROM bookmark_tags WHERE tag_id = ?;
