# Kola

Design and generate backends with little-to-no code!

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Roadmap](#roadmap)
- [Development](#development)
  - [Setup](#setup)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---

## Roadmap

MVP

- [x] Simple static app
- [ ] Create tables
- [ ] Support default datatypes (Postgres?), foreign keys, indices
- [ ] Generate either SQL or Rails migrations (or rails migration generator command)
- [ ] Save state as hash urls:
  - [ ] Admin (editable) hash
  - [ ] Read-only hash

v1.0

- [ ] Tests
- [ ] Backend
- [ ] User accounts
- [ ] Drafts
- [ ] Version locks (tag a version)
- [ ] Support more frameworks/languages
- [ ] Support non-standard PG/other rdb featues

v2.0

- [ ] Teams
- [ ] Spreadsheet upload?

## Development

### Setup

Install dependencies:

```bash
npm i
# or
yarn
```

Setup envioronment variables locally:

```bash
cp .env.example .env
# edit .env according to its instructions/your liking
```

Off to the races!

```bash
npm run dev
# or
yarn dev
# app is now running at http://localhost:3000
```

## License

Kola is BSL 1.1 licensed
