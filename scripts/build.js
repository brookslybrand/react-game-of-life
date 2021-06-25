const { build } = require('esbuild')

;(() => {
  build({
    bundle: true,
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    },
    entryPoints: ['src/index.tsx'],
    minify: process.env.NODE_ENV === 'production',
    outdir: 'public/build',
  }).catch(err => {
    if (err) {
      throw err
    }
  })
})()
