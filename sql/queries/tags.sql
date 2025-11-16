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

-- name: GetTagsForBookmarkAndUserID :many
SELECT t.name, t.id FROM tags t
JOIN bookmark_tags bt ON t.id = bt.tag_id
WHERE bt.bookmark_id = ? AND t.user_id = ?;
