import {defineConfig} from 'unlighthouse'

export default defineConfig({
  site: 'https://www.educative.io',
  scanner: {
    maxRoutes: 20000,
  },
  ci:{
    buildStatic: true,
  },
  debug: false,
})