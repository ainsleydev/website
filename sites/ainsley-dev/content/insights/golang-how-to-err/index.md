---
title: How to implement custom errors in GoLang
heading: Effective error handling in GoLang; how to Error()
description: Learn how to implement custom errors in GoLang and implement meaningful error messages that can save hours of debugging time.
slug: golang-how-to-err
publishdate: 2022-03-14
lastmod: 2022-03-14
draft: false
tags:
  - GoLang
  - Errors
  - Coding
author: Ainsley Clark
---

{{< lead >}}
Failure is your domain. Effective error handling in any GoLang package or application is crucial to understand how and
where errors are formulated. Errors used in combination with effective logging can save hours of debugging time.
{{< /lead >}}

{{< lead >}}
See the supporting repository - [github.com/ainsleyclark/errors](https://github.com/ainsleyclark/errors)
{{< /lead >}}

## Why should we err?

Errors are as important in your domain and application as entities such as a User or Database. They should be
treated as individual types. Not only do they give a clear meaning to the users of the application if something goes
wrong, but they can save hours of debugging time when used effectively.

Coupled with consistent and effective use of a logging package, we are able to tell if something goes wrong, where it
went wrong and how it went wrong.

## Go errors

I think we are blessed with the nature of Go’s simplistic style of error handling. It's certainly caught the attention
of users of other programming languages. All we have to do is check if the error is not nil, and that’s it.

```go
file, err := os.Open("gopher.jpg")
if err != nil {
	return err
}
```

Coming from Java or PHP you may be wondering where the `try`/`catch`/`finally` blocks are. But with this simple idiom it
makes for smaller functions and having no throws flags shortens method signatures.

### What is an error?

An error is anything that implements the singular method interface `error` in the standard library interface. An
error **_type _** must implement a method that returns a string.

```go
// The error built-in interface type is the conventional interface for
// representing an error condition, with the nil value representing no error.
type error interface {
	Error() string
}
```

Digging deeper into the stdlib library, there is only one implementation of this interface called `errorString`, which
gets constructed when `errors.New()` is called.

```go
// errorString is a trivial implementation of error.
type errorString struct {
	s string
}
```

This simply returns `s` when `.Error()` is called. Indeed `fmt.Errorf` also constructs an `errorString` when called
with additional formatting.

### Implementing custom errors

What the authors of Go are saying to you here is that they want you to implement the `error` interface, and by doing so,
you can transform any type into an error of your own.

```go
type CustomError struct {
	Err  error
}

func (c *CustomError) Error() string {
	if c.Err != nil {
		return c.Err.Error()
	}
	return "An error has occurred"
}
```

Here we are creating a `CustomError` type and implementing the single method interface `Error()` which means we can now
return an `error`. To use it, we just simply return a pointer to `CustomError`.

```go
func SomethingBroken() error {
	// Something went wrong...
	return &CustomError{
		Err: errors.New("broken"),
	}
}
```

## Digging deeper

This is an ok approach, but we haven’t improved, much if at all on the standard `errorString`. Taking a look
at [Ben Johnson’s](https://www.gobeyond.dev/failure-is-your-domain/) approach we can do a lot better in terms of being
more verbose. How can we tell where the error occurred in our application? There is also no formatted message for the
end user. What do they care about application error messages?

```go
// Error defines a standard application error.
type Error struct {
	// The application error code.
	Code string `json:"code"`
	// A human-readable message to send back to the end user.
	Message string `json:"message"`
	// Defines what operation is currently being run.
	Op string `json:"operation"`
	// The error that was returned from the caller.
	Err error `json:"error"`
}
```

Enter our new `Error` type, already looking better. Here we are explicitly defining the code, message and operation of
the errors that occur in application.

## Implementing Error()

To make our error type conform with the standard library interface, we need to implement `Error()`. Below we are
implementing the `Error` interface and returning a formatted error to a byte buffer.

* Print the code if there is one attached.
* Print the file line and operation, if any.
* If there is an error, print the wrapping Error().
* Continue to print the message and clean up.

```go
// Error returns the string representation of the error
// message by implementing the error interface.
func (e *Error) Error() string {
	var buf bytes.Buffer

	// Print the error code if there is one.
	if e.Code != "" {
		buf.WriteString("<" + e.Code + "> ")
	}

	// Print the file-line, if any.
	if e.fileLine != "" {
		buf.WriteString(e.fileLine + " - ")
	}

	// Print the current operation in our stack, if any.
	if e.Operation != "" {
		buf.WriteString(e.Operation + ": ")
	}

	// Print the original error message, if any.
	if e.Err != nil {
		buf.WriteString(e.Err.Error() + ", ")
	}

	// Print the message, if any.
	if e.Message != "" {
		buf.WriteString(e.Message)
	}

	return strings.TrimSuffix(strings.TrimSpace(buf.String()), ",")
}
```

This will print something similar to below:

```go
<internal> /Users/me/project/store/users.go:27 - UserStore.Find: syntax error near SELECT, Error executing SQL query
```

## Constructors

An idiomatic way for developers to create the Error type would be to create a variety of utility functions that allows
for the creation of errors by code. Below are a few examples taken
from [github.com/ainsleyclark/errors](https://github.com/ainsleyclark/errors).

```go
// NewInternal returns an Error with a INTERNAL error code.
func NewInternal(err error, message, op string) *Error {
	return newError(err, message, INTERNAL, op)
}

// NewConflict returns an Error with a CONFLICT error code.
func NewConflict(err error, message, op string) *Error {
	return newError(err, message, CONFLICT, op)
}

// NewInvalid returns an Error with a INVALID error code.
func NewInvalid(err error, message, op string) *Error {
	return newError(err, message, INVALID, op)
}
```

The `newError` utility function constructs a new `*Error` with the file, line and program counters to obtain stack
traces from the error.

```go
// newError is an alias for New by creating the pcs
// file line and constructing the error message.
func newError(err error, message, code, op string) *Error {
	_, file, line, _ := runtime.Caller(2)
	pcs := make([]uintptr, 100)
	_ = runtime.Callers(3, pcs)
	return &Error{
		Code:  	code,
		Message:   message,
		Operation: op,
		Err:   	err,
		fileLine:  file + ":" + strconv.Itoa(line),
		pcs:   	pcs,
	}
}
```

## Codes

The API needs to determine what type of error occurred. For example, if a http request was made to an external service,
this could be an `INTERNAL` error. Similarly if an entity wasn’t found from a datastore, it should return a `NOT_FOUND`
error.

The error code could of course be an int or a string depending on your needs. We could get even fancier here and
abstract `Code` to be a custom type, with a map of what each error code describes. But for now we can establish error
codes to something similar to below.

```go
const (
	// CONFLICT - An action cannot be performed.
	CONFLICT = "conflict"
	// INTERNAL - Error within the application
	INTERNAL = "internal"
	// INVALID - Validation failed
	INVALID = "invalid"
	// NOTFOUND - Entity does not exist
	NOTFOUND = "not_found"
	// TEMPLATE - Templating error
	TEMPLATE = "template"
)
```

As the interface `Error` only returns a string, we need a way to establish what error code it is, if any. The function
below takes in any error and retrieves its relevant code.

* Returns an empty string for `nil` errors.
* Searches the chain of `Error.Err` until a code is found.
* Return `INTERNAL` if no code is found.

```go
// Code returns the code of the root error, if available.
// Otherwise returns INTERNAL.
func Code(err error) string {
	if err == nil {
		return ""
	} else if e, ok := err.(*Error); ok && e.Code != "" {
		return e.Code
	} else if ok && e.Err != nil {
		return Code(e.Err)
	}
	return INTERNAL
}
```

### HTTP & gRPC

This methodology lends itself greatly to generic systems that define codes in a simple way to reason about, such as HTTP
& gRPC.

* [HTTP/1.1: Status Code Definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
* [gRPC Canonical Error Codes](https://github.com/grpc/grpc-go/blob/v1.12.0/codes/codes.go)

Transforming the error codes into HTTP & gRPC codes means we can easily send the correct response codes to different
services. The function below returns an `int` representing a HTTP status code, defaulting
to `http.StatusInternalServerError`.


```go
// HTTPStatusCode is a convenience method used to get the appropriate
// HTTP response status code for the respective error type.
func (e *Error) HTTPStatusCode() int {
	status := http.StatusInternalServerError
	switch e.Code {
		case CONFLICT:
			return http.StatusConflict
		case INVALID:
			return http.StatusBadRequest
		case NOTFOUND:
			return http.StatusNotFound
		case EXPIRED:
			return http.StatusPaymentRequired
		case MAXIMUMATTEMPTS:
			return http.StatusTooManyRequests
	}
	return status
}
```

### Handlers

Now we utilise this extra functionality in our handlers, by sending the correct HTTP response according to the error
code we instantiated in our service or datastore.

```go
func (h *Handler) Find() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")

		item, err := h.service.Find(r.Context(), id)
		if err != nil {
			api.Error(r, errors.ToError(err).HTTPStatusCode(), err)
			return
		}

		api.Respond(r, 200, item, "Successfully obtained User with ID: "+ id)
	}
}
```

## Messages

If you are an end user digesting an application, a user friendly error message is critical to include to any
application. 9 times out 10, the end user does not have any developer experience, and receiving something similar
to: `SQL error near JOIN` won’t make any sense.

When a new `Error` is created, we can attach a user-friendly message. However we need a utility function to extract
messages from `error` values.

* Returns an empty string for `nil` errors.
* Searches the chain of `Error.Err` until a code is found.
* Returns a predefined error message in the case that no message is found.

```go
// GlobalError is a general message when no error message
// has been found.
const GlobalError = "An error has occurred."

// Message returns the human-readable message of the error,
// if available. Otherwise returns a generic error
// message.
func Message(err error) string {
	if err == nil {
		return ""
	} else if e, ok := err.(*Error); ok && e.Message != "" {
		return e.Message
	} else if ok && e.Err != nil {
		return Message(e.Err)
	}
	return GlobalError
}
```

## Operation

Operations define where the error occurred. When used effectively in combination with file lines, it can save hours of
debugging time and searching through hundreds of files and lines.

The following format is preferred:

*ServiceName.FunctionName*

The service name is the name of the struct or type that's implementing a function or package. And the function
name is the name of the function that produced the error.

Below is an example of returning a formatted Error type in a database call for obtaining a singular user. If no rows are
found, we return a NOTFOUND code. Likewise, if there was an error executing the SQL query, we return a NOTFOUND code with
user-friendly messages.

**Notice:** We are defining `op` at the top of the method, which when used consistently, can help you to easily find
where errors occurred extremely quickly.

```go
func (s *UserStore) Find(ctx context.Context, id int64) (core.User, error) {
    const op = "UserStore.Find"

    q := "SELECT from users WHERE ID = ? LIMIT 1"

    var out core.User
    err := s.DB().GetContext(ctx, &out, q.Build(), id)
    if err == sql.ErrNoRows {
		return core.User{}, errors.NewNotFound(err, fmt.Sprintf("Error obtaining User with the ID: %d", id), op)
    } else if err != nil {
		return core.User{}, errors.NewInternal(err, "Error executing SQL query", op)
    }

    return out, nil
}
```

## Stack traces

[Stack traces](https://en.wikipedia.org/wiki/Stack_trace) report the active frames at a certain time during the
execution of an application. They are very effective for debugging as developers can see the steps that led up to an
error.

In the case of the custom `Error`, we can implement a `StackTrace()` method that returns a string slice of the stack by
traversing the frame lines.

```go
// StackTraceSlice returns a string slice of the errors
// stacktrace.
func (e *Error) StackTraceSlice() []string {
    trace := make([]string, 0, 100)
    rFrames := e.RuntimeFrames()
    frame, ok := rFrames.Next()
    line := strconv.Itoa(frame.Line)
    trace = append(trace, frame.Function+"(): "+e.Message)

    for ok {
		trace = append(trace, frame.File+":"+line)
		frame, ok = rFrames.Next()
    }

    return trace
}
```

## Wrapping up

By using a package similar to [github.com/ainsleyclark/errors](https://github.com/ainsleyclark/errors) or by
implementing your own errors package, you can be sure that hours of traversing directory trees are a thing of the past.
Not only does proper and effective error handling save time for a developer, it makes things simpler and easier to
understand for your end users. By using them consistently and correctly, you are able to speed up workflow and make
things easier to reason about.

## Useful links

* [ainsleyclark/errors - Error handling in Go made easy with codes, messages and more.](https://github.com/ainsleyclark/errors)
* [Errors package in the standard library](https://pkg.go.dev/errors)
* [Error handling and Go by Andrew Gerrand](https://go.dev/blog/error-handling-and-go)
* [Failure is your domain by Ben Johnson](https://middlemost.com/failure-is-your-domain/)
* [Creating Domain Specific Error Helpers in Go With errors.As](https://blog.carlmjohnson.net/post/2020/working-with-errors-as/)
* [Error handling in GoLang by Gabriel Tanner](https://gabrieltanner.org/blog/golang-error-handling-definitive-guide)


