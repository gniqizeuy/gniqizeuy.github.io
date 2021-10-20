---
title: "windows command"
date: 2021-09-24
draft: false
---

### Explorer

open explorer

    explorer .

    start .

### where

`where` is a direct equivalent

Note that in PowerShell where itself is an alias for Where-Object, thus you need to usewhere.exe in PowerShell.

In PowerShell you have Get-Command and its alias gcm which does the same if you pass an argument (but also works for aliases, cmdlets and functions in PowerShell):


### start

    start /b XXX

> 后台启动xxx