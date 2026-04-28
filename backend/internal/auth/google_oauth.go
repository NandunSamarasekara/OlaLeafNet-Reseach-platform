package auth

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"

	"zosterix-backend/internal/shared"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type GoogleUser struct {
	ID            string `json:"sub"`
	Email         string `json:"email"`
	Name          string `json:"name"`
	VerifiedEmail bool   `json:"email_verified"`
	Picture       string `json:"picture"`
}

func (h *Handler) getGoogleConfig(config *shared.Config) *oauth2.Config {
	return &oauth2.Config{
		ClientID:     config.GoogleClientID,
		ClientSecret: config.GoogleClientSecret,
		RedirectURL:  config.GoogleRedirectURI,
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
			"openid",
		},
		Endpoint: google.Endpoint,
	}
}

func (h *Handler) GoogleRedirect(c *gin.Context) {
	config := shared.LoadConfig() // Should pass this in instead of loading every time
	oauthConfig := h.getGoogleConfig(config)

	state := generateState(32)
	c.SetCookie("oauth_state", state, 600, "/api/v1/auth/google", "", true, true)

	url := oauthConfig.AuthCodeURL(state)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

func (h *Handler) GoogleCallback(c *gin.Context) {
	config := shared.LoadConfig()
	oauthConfig := h.getGoogleConfig(config)

	// Verify state
	state, err := c.Cookie("oauth_state")
	if err != nil || state != c.Query("state") {
		shared.Err(c, http.StatusBadRequest, "invalid_state", "CSRF detected")
		return
	}

	code := c.Query("code")
	token, err := oauthConfig.Exchange(c.Request.Context(), code)
	if err != nil {
		shared.Err(c, http.StatusInternalServerError, "exchange_error", "Failed to exchange token")
		return
	}

	client := oauthConfig.Client(c.Request.Context(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v3/userinfo")
	if err != nil {
		shared.Err(c, http.StatusInternalServerError, "fetch_error", "Failed to fetch user info")
		return
	}
	defer resp.Body.Close()

	var gUser GoogleUser
	if err := json.NewDecoder(resp.Body).Decode(&gUser); err != nil {
		shared.Err(c, http.StatusInternalServerError, "decode_error", "Failed to decode user info")
		return
	}

	if !gUser.VerifiedEmail {
		shared.Err(c, http.StatusBadRequest, "unverified_email", "Google email not verified")
		return
	}

	// Logic to find or create user
	accessToken, refreshToken, profileComplete, err := h.handleGoogleAuth(c.Request.Context(), gUser)
	if err != nil {
		shared.Err(c, http.StatusInternalServerError, "auth_error", err.Error())
		return
	}

	h.setRefreshCookie(c, refreshToken)

	// Redirect to frontend
	redirectURL := fmt.Sprintf("%s/auth/callback?token=%s&profile_complete=%t", config.AppURL, accessToken, profileComplete)
	c.Redirect(http.StatusTemporaryRedirect, redirectURL)
}

func (h *Handler) handleGoogleAuth(ctx context.Context, gUser GoogleUser) (string, string, bool, error) {
	return h.service.HandleGoogleAuth(ctx, gUser)
}

func generateState(n int) string {
	b := make([]byte, n)
	rand.Read(b)
	return base64.URLEncoding.EncodeToString(b)
}
