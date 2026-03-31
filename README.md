# Brane Code

> A lightweight, model-agnostic AI coding runtime.
> Inspired by recent Claude Code architecture discussions.

---

## What is Brane Code?

Brane Code is a simple CLI-based AI coding runtime that:

* works with **OpenRouter and OpenAI models**
* runs locally
* executes multi-step coding tasks
* provides a clean alternative to existing agent-based coding tools

---

## Why this exists

Recently, Claude Code’s architecture became widely visible through a source map exposure.

Most responses have been:

* direct forks
* minimal changes
* same workflows

Brane Code takes a different approach.

> Instead of copying, it rebuilds the core ideas into a cleaner, model-agnostic system.

---

## What it does today

* Accepts natural language instructions
* Plans and executes coding tasks
* Reads, writes, and edits files
* Runs commands and tools
* Works across multiple LLM providers

All inside a simple terminal interface.

---

## Key properties

### 1. Model-agnostic

No lock-in.

* OpenAI
* OpenRouter
* (extensible to others)

---

### 2. Lightweight runtime

Designed to be:

* fast
* local-first
* minimal overhead

---

### 3. Agent-based execution

Instead of single prompts, Brane Code:

* breaks problems into steps
* uses tools
* iterates toward a solution

---

## Example

```bash
brane fix "auth token bug"
```

Brane Code will:

* inspect relevant files
* plan the fix
* apply changes
* return a diff + explanation

---

## Current status

Early version.

Right now, Brane Code is a:

> **clean, working alternative to Claude Code-style runtimes**

---

## What’s next

This is just the starting point.

The direction is clear:

* persistent memory across sessions
* replayable AI coding workflows
* structured, inspectable agent runs
* systems that improve over time

---

## Philosophy

Most AI coding tools today are:

* stateless
* non-reproducible
* hard to inspect

Brane Code is moving toward:

> **AI development that is persistent, structured, and compounding**

---

## Disclaimer

Brane Code is an independent project inspired by publicly discussed architectures.
It is not affiliated with or endorsed by Anthropic.

---

## Summary

Brane Code starts as a simple alternative.

It is being built toward something much larger:

> **a system where AI coding work doesn’t disappear — it accumulates.**
