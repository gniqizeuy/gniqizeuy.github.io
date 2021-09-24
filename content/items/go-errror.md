---
title: "go error"
date: 2021-07-25
draft: false
tags: ["go"]
---

#### error 接口
go中 error 只是一个接口类型，不包含返回错误消息的方法

```go
type error interface {
    Error() string
}
```

#### errors package
errors 包中 errors.go 源码如下

```go
package errors

// New returns an error that formats as the given text.
// Each call to New returns a distinct error value even if the text is identical.
func New(text string) error {
	return &errorString{text}
}

// errorString is a trivial implementation of error.
type errorString struct {
	s string
}

func (e *errorString) Error() string {
	return e.s
}
```

底层的 `errorString` 类型是一个结构体，并没有直接使用字符串，是为了避免将来可能的布局变更。
满足 error 接口的是 `*errorString` 指针，主要是为了让 New 分配的 error 实例互不相等。
像 `io.EOF` 这样的重要错误，不可与仅仅包含同样错误消息的 

```go
fmt.Println(errors.New("EOF") == errors.New("EOF")) // false
```

`fmt.Errorf` 函数提供了字符串格式化功能

```go
package fmt

import "errors"

// Errorf formats according to a format specifier and returns the string as a
// value that satisfies error.
//
// If the format specifier includes a %w verb with an error operand,
// the returned error will implement an Unwrap method returning the operand. It is
// invalid to include more than one %w verb or to supply it with an operand
// that does not implement the error interface. The %w verb is otherwise
// a synonym for %v.
func Errorf(format string, a ...interface{}) error {
	p := newPrinter()
	p.wrapErrs = true
	p.doPrintf(format, a)
	s := string(p.buf)
	var err error
	if p.wrappedErr == nil {
		err = errors.New(s)
	} else {
		err = &wrapError{s, p.wrappedErr}
	}
	p.free()
	return err
}

type wrapError struct {
	msg string
	err error
}

func (e *wrapError) Error() string {
	return e.msg
}

func (e *wrapError) Unwrap() error {
	return e.err
}
```