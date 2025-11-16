-- +goose Up
-- +goose StatementBegin
CREATE TRIGGER IF NOT EXISTS delete_orphaned_tags
AFTER DELETE ON bookmark_tags
FOR EACH ROW
BEGIN
  DELETE FROM tags 
  WHERE id = OLD.tag_id 
    AND NOT EXISTS (
      SELECT 1 FROM bookmark_tags WHERE tag_id = OLD.tag_id
    );
END;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TRIGGER IF EXISTS delete_orphaned_tags;
-- +goose StatementEnd
