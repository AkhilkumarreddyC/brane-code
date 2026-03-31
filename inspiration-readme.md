Rewriting Project Clawd Code

Clawd

Better Harness Tools, not merely storing the archive of leaked Claude Code

Sponsor on GitHub

If you find this work useful, consider sponsoring @instructkr on GitHub to support continued open-source harness engineering research.
Backstory

At 4 AM on March 31, 2026, I woke up to my phone blowing up with notifications. The Claude Code source had been exposed, and the entire dev community was in a frenzy. My girlfriend in Korea was genuinely worried I might face legal action from Anthropic just for having the code on my machine — so I did what any engineer would do under pressure: I sat down, ported the core features to Python from scratch, and pushed it before the sun came up.

The whole thing was orchestrated end-to-end using oh-my-codex (OmX) by @bellman_ych — a workflow layer built on top of OpenAI's Codex (@OpenAIDevs). I used $team mode for parallel code review and $ralph mode for persistent execution loops with architect-level verification. The entire porting session — from reading the original harness structure to producing a working Python tree with tests — was driven through OmX orchestration.

The result is a clean-room Python rewrite that captures the architectural patterns of Claude Code's agent harness without copying any proprietary source. I'm now actively collaborating with @bellman_ych — the creator of OmX himself — to push this further. The basic Python foundation is already in place and functional, but we're just getting started. Stay tuned — a much more capable version is on the way.

https://github.com/instructkr/claude-code

Tweet screenshot

The Creators Featured in Wall Street Journal For Avid Claude Code Fans

I've been deeply interested in harness engineering — studying how agent systems wire tools, orchestrate tasks, and manage runtime context. This isn't a sudden thing. The Wall Street Journal featured my work earlier this month, documenting how I've been one of the most active power users exploring these systems:

AI startup worker Sigrid Jin, who attended the Seoul dinner, single-handedly used 25 billion of Claude Code tokens last year. At the time, usage limits were looser, allowing early enthusiasts to reach tens of billions of tokens at a very low cost.

Despite his countless hours with Claude Code, Jin isn't faithful to any one AI lab. The tools available have different strengths and weaknesses, he said. Codex is better at reasoning, while Claude Code generates cleaner, more shareable code.

Jin flew to San Francisco in February for Claude Code's first birthday party, where attendees waited in line to compare notes with Cherny. The crowd included a practicing cardiologist from Belgium who had built an app to help patients navigate care, and a California lawyer who made a tool for automating building permit approvals using Claude Code.

"It was basically like a sharing party," Jin said. "There were lawyers, there were doctors, there were dentists. They did not have software engineering backgrounds."

— The Wall Street Journal, March 21, 2026, "The Trillion Dollar Race to Automate Our Entire Lives"
WSJ Feature

Porting Status

The main source tree is now Python-first.

src/ contains the active Python porting workspace
tests/ verifies the current Python workspace
the exposed snapshot is no longer part of the tracked repository state
The current Python workspace is not yet a complete one-to-one replacement for the original system, but the primary implementation surface is now Python.

Why this rewrite exists

I originally studied the exposed codebase to understand its harness, tool wiring, and agent workflow. After spending more time with the legal and ethical questions—and after reading the essay linked below—I did not want the exposed snapshot itself to remain the main tracked source tree.

This repository now focuses on Python porting work instead.

Repository Layout

.
├── src/                                # Python porting workspace
│   ├── __init__.py
│   ├── commands.py
│   ├── main.py
│   ├── models.py
│   ├── port_manifest.py
│   ├── query_engine.py
│   ├── task.py
│   └── tools.py
├── tests/                              # Python verification
├── assets/omx/                         # OmX workflow screenshots
├── 2026-03-09-is-legal-the-same-as-legitimate-ai-reimplementation-and-the-erosion-of-copyleft.md
└── README.md
Python Workspace Overview

The new Python src/ tree currently provides:

port_manifest.py — summarizes the current Python workspace structure
models.py — dataclasses for subsystems, modules, and backlog state
commands.py — Python-side command port metadata
tools.py — Python-side tool port metadata
query_engine.py — renders a Python porting summary from the active workspace
main.py — a CLI entrypoint for manifest and summary output
Quickstart

Render the Python porting summary:

python3 -m src.main summary
Print the current Python workspace manifest:

python3 -m src.main manifest
List the current Python modules:

python3 -m src.main subsystems --limit 16
Run verification:

python3 -m unittest discover -s tests -v
Run the parity audit against the local ignored archive (when present):

python3 -m src.main parity-audit
Inspect mirrored command/tool inventories:

python3 -m src.main commands --limit 10
python3 -m src.main tools --limit 10
Current Parity Checkpoint

The port now mirrors the archived root-entry file surface, top-level subsystem names, and command/tool inventories much more closely than before. However, it is not yet a full runtime-equivalent replacement for the original TypeScript system; the Python tree still contains fewer executable runtime slices than the archived source.

Related Essay

Is legal the same as legitimate: AI reimplementation and the erosion of copyleft
The essay is dated March 9, 2026, so it should be read as companion analysis that predates the March 31, 2026 source exposure that motivated this rewrite direction.

Built with oh-my-codex

The restructuring and documentation work on this repository was AI-assisted and orchestrated with Yeachan Heo's oh-my-codex (OmX), layered on top of Codex.

$team mode: used for coordinated parallel review and architectural feedback
$ralph mode: used for persistent execution, verification, and completion discipline
Codex-driven workflow: used to turn the main src/ tree into a Python-first porting workspace
OmX workflow screenshots

OmX workflow screenshot 1

Ralph/team orchestration view while the README and essay context were being reviewed in terminal panes.

OmX workflow screenshot 2

Split-pane review and verification flow during the final README wording pass.

Community

instructkr

Join the instructkr Discord — the best Korean language model community. Come chat about LLMs, harness engineering, agent workflows, and everything in between.

Discord

Ownership / Affiliation Disclaimer

This repository does not claim ownership of the original Claude Code source material.
This repository is not affiliated with, endorsed by, or maintained by Anthropic.