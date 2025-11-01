-- name: AddBookmark :one
INSERT INTO bookmarks (
user_id,
url,
title
) VALUES (
  ?,?,?
)
RETURNING *;

-- name: AddBookmarkWithDescription :one
INSERT INTO bookmarks (
user_id,
url,
title,
description
) VALUES (
  ?,?,?,?
)
RETURNING *;

-- name: GetAllUserBookmarks :many
SELECT * from bookmarks WHERE user_id = ?;
