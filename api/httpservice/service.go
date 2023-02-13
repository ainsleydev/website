package httpservice

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

type Handler struct {
}

func (h Handler) UserCreate(ctx echo.Context) error {
	return ctx.String(http.StatusOK, "OK")
}
