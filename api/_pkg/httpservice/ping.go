package httpservice

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// Ping is a handler function for the '/ping' endpoint.
// It responds with a simple text message "PONG"
// to assert service health.
func (h Handler) Ping(ctx echo.Context) error {
	return ctx.String(http.StatusOK, "PONG")
}
