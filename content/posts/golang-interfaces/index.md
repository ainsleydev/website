---
title: What are GoLang interfaces?
date:
draft: true
---

https://medium.com/rungo/interfaces-in-go-ab1601159b3a
https://go.dev/doc/effective_go#interfaces
https://go.dev/tour/methods/10
https://go.dev/tour/methods/9

**Interfaces are a tricky subject to grasp in GoLang, let's demystify when and how they should be used.**

Interfaces are a difficult subject to grasp in GoLang, a lot of people find understanding what an interface
In Go, is, and when and how they should be used effectively. They can however, be extremely powerful
when used correctly and aid with unit testing your code.

## What's polymorphism?
Put simply, polymorphism in programming means many types can perform the same tasks (functions).
For example, a

## What's an interface?
An interface is a collection of method signatures that any type can implement. It defines the behaviour of a particular type and if a type replicates these methods signatures, they are said to **implement**
the interface.

An interface is only there to describe the behaviour of the type. The method signatures should provide the **method name**, **input arguments** and **return types**. A type (struct, string, or any other type) needs to provide the same method declaration in order to implement the interface.

**TODO** Implicitly Implemented


```go
type Stringer interface {

}

```

- Something about implements keyword (Go is doing it's magic thing)
-


## Overview


## A hypothetical example


## A real world example


## Standard library
- Stringer
- io.Reader


- Wood
- Egg
- Cake
- Brewer is an Interface
- A brewer can be a cup of tea, cup of coffee, cu
