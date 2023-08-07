package httpservice

import (
	"github.com/ainsleydev/website/api/_pkg/environment"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHandler_GetCredentials(t *testing.T) {
	server := httptest.NewServer(nil)
	defer server.Close()
	h := Handler{Config: &environment.Config{
		Credentials: "test-credentials",
	}}
	req := httptest.NewRequest(http.MethodGet, "/credentials/", nil)
	rec := httptest.NewRecorder()
	c := echo.New().NewContext(req, rec)
	err := h.GetCredentials(c)
	require.NoError(t, err)
	assert.Equal(t, "test-credentials", rec.Body.String())
}
