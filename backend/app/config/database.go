package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Database struct {
	Username string
	Password string
	Host     string
	Port     int16
	DB_Name  string
	SSL_Mode string
}

func (c *Database) Validate() error {
	if c.DB_Name == "" {
		return fmt.Errorf("invalid database name")
	}

	if c.Host == "" {
		return fmt.Errorf("invalid host name")
	}

	if c.Password == "" {
		return fmt.Errorf("invalid password")
	}

	if c.Port == 0 {
		return fmt.Errorf("invalid port number")
	}

	if c.SSL_Mode == "" {
		return fmt.Errorf("invalid SSL mode")
	}

	return nil
}

// Generates a database url from configuration fields
func (c *Database) URL() string {
	return fmt.Sprintf(
		"postgresql://%s:%s@%s:%d/%s?sslmode=%s",
		c.Username,
		c.Password,
		c.Host,
		c.Port,
		c.DB_Name,
		c.SSL_Mode,
	)
}

func load_password() (string, error) {
	password, ok := os.LookupEnv("PG_PASSWORD")
	if ok {
		return password, nil
	}

	password_file, ok := os.LookupEnv("PG_PASSWORD_FILE")
	if !ok {
		return "", fmt.Errorf("no PG_PASSWORD_FILE env var set")
	}

	data, err := os.ReadFile(password_file)
	if err != nil {
		return "", fmt.Errorf("failed to read from password file: %w", err)
	}

	return strings.TrimSpace(string(data)), nil
}

// Generates a new database configuration base on the env vars required.
// If any env vars are not sent or are invalid then this method will throw an error.
func NewDatabase() (*Database, error) {
	username, ok := os.LookupEnv("PG_USER")
	if !ok {
		return nil, fmt.Errorf("no PG_USER env var set")
	}

	password, err := load_password()
	if err != nil {
		return nil, fmt.Errorf("loading password: %w", err)
	}

	host, ok := os.LookupEnv("PG_HOST")
	if !ok {
		return nil, fmt.Errorf("no PG_HOST env var set")
	}

	port_string, ok := os.LookupEnv("PG_PORT")
	if !ok {
		return nil, fmt.Errorf("no PG_PORT env var set")
	}

	port, err := strconv.Atoi(port_string)
	if err != nil {
		return nil, fmt.Errorf("failed to convert port string to int: %w", err)
	}

	db_name, ok := os.LookupEnv("PG_DB_NAME")
	if !ok {
		return nil, fmt.Errorf("no PG_DB_NAME env var set")
	}

	ssl_mode, ok := os.LookupEnv("SSL_MODE")
	if !ok {
		return nil, fmt.Errorf("no SSL_MODE env vat set")
	}

	config := &Database{
		Username: username,
		Password: password,
		Host:     host,
		Port:     int16(port),
		DB_Name:  db_name,
		SSL_Mode: ssl_mode,
	}

	err = config.Validate()
	if err != nil {
		return nil, fmt.Errorf("failed to validate database config: %w", err)
	}

	return config, nil
}
