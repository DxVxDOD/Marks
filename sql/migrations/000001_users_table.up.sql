CREATE TABLE users (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    email CITEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    hash bytea NOT NULL,
    salt bytea NOT NULL
);