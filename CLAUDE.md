# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev       # Vite dev server at http://localhost:5173
npm run build     # production build
npm run preview   # serve the production build
npm run lint      # ESLint (flat config in eslint.config.js)
```

There is no test framework configured.

## Architecture

A small React 19 + Vite app (plain JavaScript/JSX, no TypeScript, no router, no backend). The starter project for a Claude Code course; it intentionally contains a bug, poor UI, and messy code that are meant to be fixed and refactored.

Nearly everything lives in one component, `src/App.jsx`:
- All state is local `useState` in `App`: the `transactions` array (seeded with hardcoded sample data, not persisted), the add-form fields, and the two filters.
- Income, expense and balance totals plus the filtered list are derived on every render, not stored.
- Transaction `amount` must be a number: `handleSubmit` uses `parseFloat`, and the seed data uses numeric literals. Totals use `reduce` with `+`, so a string amount concatenates instead of adding.
- The category list is a hardcoded array inside `App`. The add form and the filter dropdown both use it.
- Styling is plain CSS in `src/App.css` and `src/index.css`.
