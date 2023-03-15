// Code generated by mockery v2.22.1. DO NOT EDIT.

package mocks

import (
	context "context"

	mock "github.com/stretchr/testify/mock"

	slack "github.com/slack-go/slack"
)

// SlackSendFn is an autogenerated mock type for the slackSendFn type
type SlackSendFn struct {
	mock.Mock
}

// Execute provides a mock function with given fields: ctx, channelID, options
func (_m *SlackSendFn) Execute(ctx context.Context, channelID string, options ...slack.MsgOption) (string, string, error) {
	_va := make([]interface{}, len(options))
	for _i := range options {
		_va[_i] = options[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, channelID)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 string
	var r1 string
	var r2 error
	if rf, ok := ret.Get(0).(func(context.Context, string, ...slack.MsgOption) (string, string, error)); ok {
		return rf(ctx, channelID, options...)
	}
	if rf, ok := ret.Get(0).(func(context.Context, string, ...slack.MsgOption) string); ok {
		r0 = rf(ctx, channelID, options...)
	} else {
		r0 = ret.Get(0).(string)
	}

	if rf, ok := ret.Get(1).(func(context.Context, string, ...slack.MsgOption) string); ok {
		r1 = rf(ctx, channelID, options...)
	} else {
		r1 = ret.Get(1).(string)
	}

	if rf, ok := ret.Get(2).(func(context.Context, string, ...slack.MsgOption) error); ok {
		r2 = rf(ctx, channelID, options...)
	} else {
		r2 = ret.Error(2)
	}

	return r0, r1, r2
}

type mockConstructorTestingTNewSlackSendFn interface {
	mock.TestingT
	Cleanup(func())
}

// NewSlackSendFn creates a new instance of SlackSendFn. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
func NewSlackSendFn(t mockConstructorTestingTNewSlackSendFn) *SlackSendFn {
	mock := &SlackSendFn{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}