---
title: "golang mail"
date: 2021-06-28
draft: false
---

package: `net/mail`


验证邮箱格式

```go
package main

import (
	"fmt"
	"net/mail"
)

func main() {
	for _, email := range []string{
		"good@exmaple.com",
		"bad-example",
	} {
		fmt.Printf("%18s valid: %t\n", email, valid(email))
	}
}

func valid(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}
```