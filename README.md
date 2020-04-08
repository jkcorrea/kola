# Kola

Design and generate backends with little-to-no code!

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Roadmap](#roadmap)
- [Development](#development)
  - [Setup](#setup)
  - [Contributing](#contributing)
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

### Contributing

**Server**: This is statically rendered React app built with Next.js. So if you haven't worked with Next yet, go ahead and familiarize yourself with their [official docs](https://nextjs.org/docs/getting-started). It's not too different than a normal create-react-app style project.

**State management**: I'm trying to keep things simple and use React Context+Hooks for state management (via [unstated-next](https://github.com/jamiebuilds/unstated-next/)). We might have to "upgrade" to Apollo if/when we add a real backend.

**Project Structure**:

- `public/` - static assets to be served alongside the app (e.g. logo, fonts)
- `src/`
  - `components/` - traditional react components. the "UI" of the app
  - `containers` - `unstated-next` containers, defining/holding the state of the app
  - `lib/` - miscelaneous helper modules
  - `models/` - common place to define the structure & types of the app's data
  - `pages` - Next.js uses this as the entry point. Files here become literal HTML pages in the app (see their [docs](https://nextjs.org/docs/basic-features/pages))

## License

Kola is BSL 1.1 licensed
