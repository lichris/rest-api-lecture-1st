import gulp from 'gulp'
import replace from 'gulp-replace'
import gulpLoadPlugins from 'gulp-load-plugins'
import path from 'path'
import del from 'del'

const plugins = gulpLoadPlugins()

const envPath = './.env'

const paths = {
  js: [
    './**/*.js',
    '!node_modules/**'
  ],
  nonJs: [
    './package-lock.json',
    './package.json'
  ]
  //tests: './tests/*.js',
}

// Clean up dist and coverage directory
gulp.task(
  'clean',
  async () => await del.sync(
    [
      '../dist/bin',
      '../dist/config',
      '../dist/controllers',
      '../dist/emails',
      '../dist/messages',
      '../dist/middlewares',
      '../dist/migrations',
      '../dist/models',
      '../dist/routes',
      '../dist/tests',
      '../dist/utils',
      '../dist/*.*',
      '../dist/.*',
      '!../dist',
      '!coverage'
    ],
    { force: true }
  )
)

// Copy .env with production setting
gulp.task('copy-env', () => {
  return gulp
    .src(envPath)
    .pipe(replace('development', 'production'))
    .pipe(gulp.dest('../dist'))
})

// Copy .env with development setting
gulp.task('copy-env-dev', () => {
  return gulp.src(envPath).pipe(gulp.dest('../dist'))
})

// Copy non-js files to dist
gulp.task('copy', () => {
  return gulp
    .src(paths.nonJs)
    .pipe(plugins.newer('../dist'))
    .pipe(gulp.dest('../dist'))
})

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', () => {
  return gulp
    .src([
      ...paths.js,
      '!gulpfile.js'
    ], { base: '.' })
    .pipe(plugins.newer('../dist'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(
      plugins.sourcemaps.write('.', {
        includeContent: false,
        sourceRoot (file) {
          return path.relative(file.path, __dirname)
        }
      })
    )
    .pipe(gulp.dest('../dist'))
})
