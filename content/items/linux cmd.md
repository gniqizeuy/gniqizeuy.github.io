---
title: "linux command"
date: 2021-09-24
draft: false
---

### grep

#### -e <span style="color:green">pattern_list</span>

        Specify one or more patterns to be used during the
        search for input.  The application shall ensure that
        patterns in pattern_list are separated by a <newline>.
        A null pattern can be specified by two adjacent
        <newline> characters in pattern_list.  Unless the -E or
        -F option is also specified, each pattern shall be
        treated as a BRE, as described in the Base Definitions
        volume of POSIX.1‐2017, Section 9.3, Basic Regular
        Expressions.  Multiple -e and -f options shall be
        accepted by the grep utility. All of the specified
        patterns shall be used when matching lines, but the
        order of evaluation is unspecified.> 

#### -v        
        Select lines not matching any of the specified
        patterns. If the -v option is not specified, selected
        lines shall be those that match any of the specified
        patterns.