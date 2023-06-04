TL;DR
This Repo generates lighthouse report of educative.io.
Report: https://unlighthouse-depl.vercel.app/

<img width="1680" alt="Screenshot 2023-05-31 at 5 14 18 PM" src="https://github.com/SharjeelAbbas014/unlighthouse/assets/53342674/fb1f46c1-fa72-458a-bfe2-0b220b0eb913">

### What's Unlighthouse?
Unlighthouse is an open CLI tool that scan's through whole website and run lighthouse on each page it finds and create a UI dashboard to present the results.

### Current Implementation:
Currently we are using unlighthouse-ci with following config:

``` 
import {defineConfig} from 'unlighthouse'

export default defineConfig({
  site: 'https://www.educative.io',
  scanner: {
    maxRoutes: 20000,
    ignoreI18nPages: false,
    skipJavascript: false,
    sitemap: ['sitemaps/general/sitemap.xml']
  },
  ci:{
    buildStatic: true,
  },
  debug: true,
})
```

With buildStatic `true` and `sitemap` given, unlighthouse will crawl through all the urls in the sitemap and run lighthouse on those pages and will generate a static site at the end which we can deploy anywhere.

### The flow:
We are using github workflows to trigger a weekly action to run unlighthouse-ci with the above configuration, once the static site is generated we are pushing that site to another repo which is connected to vercel which automagically deploy that site and send an alert to slack channel

### Here's the github workflow:
```
name: Trigger Site unlighthouse on a CRON Schedule

on:
  schedule:
    - cron: "0 0 * * WED"

jobs:
  unlighthouse:
    name: Run unlighthouse
    runs-on: ubuntu-latest
    env:
      CI_COMMIT_MESSAGE: Continuous Integration Build Artifacts
      CI_COMMIT_AUTHOR: Continuous Integration
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Install Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Run Lighthouse CI
        run: npx unlighthouse-ci
```
