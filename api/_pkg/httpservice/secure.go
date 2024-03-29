package httpservice

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// GetCredentials returns obtains credentials from ainsley.dev
func (h Handler) GetCredentials(ctx echo.Context) error {
	return ctx.String(http.StatusOK, h.Config.Credentials)
}
