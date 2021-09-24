---
title: "go plantuml"
date: 2021-09-23
draft: false
---

generate uml


#### install [plantuml](https://github.com/jfeliu007/goplantuml)

    go get github.com/jfeliu007/goplantuml/parser
    go get github.com/jfeliu007/goplantuml/cmd/goplantuml
    cd $GOPATH/src/github.com/jfeliu007/goplantuml
    go install ./...

#### Usage

    goplantuml [-recursive] path/to/gofiles path/to/gofiles2 > diagram_file_name.puml

#### view in chrome

install [PlantUML Visualizer](https://chrome.google.com/webstore/detail/plantuml-visualizer/ffaloebcmkogfdkemcekamlmfkkmgkcf/related)

should open Allow access to file address

#### view in vs code

install Plantuml in Extensions

open puml file in code

use ALT + D to preview

use CTRL + SHIFT + P choose Export Current Diagram to export

add plantuml config like this

      "plantuml.jarArgs": [
            "-DPLANTUML_LIMIT_SIZE=8129"
      ]
