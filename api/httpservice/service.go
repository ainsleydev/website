package httpservice

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type Handler struct{}

func (h Handler) UserCreate(ctx echo.Context) error {
	return ctx.String(http.StatusOK, "OK")
}
