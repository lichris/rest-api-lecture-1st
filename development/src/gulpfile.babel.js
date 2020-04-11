import gulp from 'gulp'
import replace from 'gulp-replace'
import gulpLoadPlugins from 'gulp-load-plugins'
import path from 'path'
import del from 'del'

const plugins = gulpLoadPlugins()

const envPath = './.env'

const paths = {
  js: [
    'bin/www',
    './**/*.js',
    '!node_modules/**',
    '!coverage/**'
  ],
  nonJs: [
    './package-lock.json',
    './package.json',
    './.sequelizerc',
    './**/*.ejs'
  ]
}

// Clean up dist and coverage directory
gulp.task(
  'clean',
  async () => await del.sync(
    [
      '../../production/bin',
      '../../production/config',
      '../../production/controllers',
      '../../production/coverage',
      '../../production/middlewares',
      '../../production/migrations',
      '../../production/models',
      '../../production/repos',
      '../../production/routes',
      '../../production/tests',
      '../../production/utils',
      '../../production/validations',
      '../../production/*.*',
      '../../production/.*',
      '!../../production',
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
    .pipe(gulp.dest('../../production'))
})

// Copy .env with development setting
gulp.task('copy-env-dev', () => {
  return gulp.src(envPath).pipe(gulp.dest('../../production'))
})

// Copy non-js files to dist
gulp.task('copy', () => {
  return gulp
    .src(paths.nonJs)
    .pipe(plugins.newer('../../production'))
    .pipe(gulp.dest('../../production'))
})

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', () => {
  return gulp
    .src([
      ...paths.js,
      '!gulpfile.js'
    ], { base: '.' })
    .pipe(plugins.newer('../../production'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(
      plugins.sourcemaps.write('.', {
        includeContent: false,
        // eslint-disable-next-line space-before-function-paren
        sourceRoot(file) {
          return path.relative(file.path, __dirname)
        }
      })
    )
    .pipe(gulp.dest('../../production'))
})
