-- +goose Up
-- +goose StatementBegin
CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_tags_user_id ON tags(user_id);
CREATE INDEX idx_bookmark_tags_tag_id ON bookmark_tags(tag_id);
CREATE INDEX idx_bookmark_tags_bookmark_id ON bookmark_tags(bookmark_id);
CREATE INDEX idx_tags_user_name ON tags(user_id, name);
CREATE INDEX idx_bookmarks_user_created ON bookmarks(user_id, created_at DESC);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP INDEX IF EXISTS idx_bookmarks_user_id;
DROP INDEX IF EXISTS idx_tags_user_id;
DROP INDEX IF EXISTS idx_bookmark_tags_tag_id;
DROP INDEX IF EXISTS idx_bookmark_tags_bookmark_id;
DROP INDEX IF EXISTS idx_tags_user_name;
DROP INDEX IF EXISTS idx_bookmarks_user_created;
-- +goose StatementEnd
