# Shyft Dashboard

## Content

This template is build with the followings frameworks and libraries:

- Next.js: To manage SSG and SSR, Routing and i18n.
- styled-components: To write CSS in JS.
- Typescript
- @CaramelPoint/Contuxt
- Lingui.js: To manage the translations and extract the base text to implement i18n.

This repository was bootstrapped with next.js cli.

## Getting Started

First, run the development server:

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Extract

To extract the texts in the base language, first, use the Trans component on your texts, and the run
`npm run extract`.

The `--clean` parameter on the script, deletes all unused ids used in Trans that were changed.
