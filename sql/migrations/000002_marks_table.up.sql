CREATE TABLE marks (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    title TEXT NOT NULL UNIQUE,
    tag TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    favorites BOOLEAN NO NULL,
    user_id UUID REFERENCES users(id)
);