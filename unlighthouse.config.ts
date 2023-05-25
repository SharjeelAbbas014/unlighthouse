import {defineConfig} from 'unlighthouse'

export default defineConfig({
  site: 'https://www.educative.io',
  scanner: {
    maxRoutes: 20000,
    ignoreI18nPages: false,
    skipJavascript: false,
  },
  ci:{
    buildStatic: true,
  },
  debug: true,
})