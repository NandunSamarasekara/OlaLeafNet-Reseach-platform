package shared

import (
	"os"
	"github.com/joho/godotenv"
	"github.com/rs/zerolog/log"
)

type Config struct {
	Port               string
	DatabaseURL        string
	RedisURL           string
	JWTSecret          string
	JWTRefreshSecret   string
	GoogleClientID     string
	GoogleClientSecret string
	GoogleRedirectURI  string
	ResendAPIKey       string
	EmailFrom          string
	AppURL             string
	APIURL             string
	FrontendOrigin     string
	Environment        string
}

func LoadConfig() *Config {
	_ = godotenv.Load()

	config := &Config{
		Port:               getEnv("PORT", "8080"),
		DatabaseURL:        getEnv("DATABASE_URL", "postgresql://postgres:123456@localhost:5432/postgres?sslmode=disable"),
		RedisURL:           getEnv("REDIS_URL", "redis://localhost:6379/0"),
		JWTSecret:          os.Getenv("JWT_SECRET"),
		JWTRefreshSecret:   os.Getenv("JWT_REFRESH_SECRET"),
		GoogleClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		GoogleClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		GoogleRedirectURI:  os.Getenv("GOOGLE_REDIRECT_URI"),
		ResendAPIKey:       os.Getenv("RESEND_API_KEY"),
		EmailFrom:          getEnv("EMAIL_FROM", "noreply@zosterix.com"),
		AppURL:             getEnv("APP_URL", "http://localhost:5173"),
		APIURL:             getEnv("API_URL", "http://localhost:8080"),
		FrontendOrigin:     getEnv("FRONTEND_ORIGIN", "http://localhost:5173"),
		Environment:        getEnv("GIN_MODE", "debug"),
	}

	if config.DatabaseURL == "" {
		log.Warn().Msg("DATABASE_URL is not set")
	}

	return config
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
