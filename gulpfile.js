const { spawn } = require('child_process');
const { src, series, dest, watch } = require('gulp');
const ts = require('gulp-typescript');
const fs = require('fs');
const path = require('path');

// gulp.task('server:compile', function () {
//   return gulp.
// });

// gulp.task('server:asset:views', function() {
//   return gulp.src('./server/views/*.liquid')
//     .pipe(gulp.dest('./dist/views'));
// });

// gulp.task('server:build', gulp.series('server:compile', 'server:asset:views', function(cb) {
//   cb();
// }));

function serverCompile() {
  return src('server/**/*.ts')
    .pipe(ts({
      noImplicitAny: true,
      esModuleInterop: true
    }))
    .pipe(dest('dist'));
}

function serverAssetsCopy() {
  return src('./server/views/*.liquid')
    .pipe(dest('./dist/views'));
}

let devServerProcess = null;
function serverStart(cb) {
  if (fs.existsSync(`${path.join(__dirname, './dist/index.js')}`)) {
    if (devServerProcess && !devServerProcess.killed) {
      devServerProcess.kill('SIGHUP');
    }
    devServerProcess = spawn(`node`, [`${path.join(__dirname, './dist/index.js')}`], { stdio: 'inherit' });
    cb();
  }
}

function nextBuild(cb) {
  const command = spawn('npx', ['next', 'build'], { stdio: 'inherit' })
  command.on('close', () => {
    cb();
  })
}

function prismaGenerate(cb) {
  const command = spawn('npx', ['prisma', 'generate', `--schema=${path.join(__dirname, 'server/prisma/schema.prisma')}`], { stdio: 'inherit' })
  command.on('close', () => {
    cb();
  })
}

exports['dev'] = function() {
  watch('server/**/*', { ignoreInitial: false }, series(serverCompile, serverAssetsCopy, serverStart));  
}
exports['server:compile'] = serverCompile;
exports['server:assets:copy'] = serverAssetsCopy;
exports['server:build'] = series(serverCompile, serverAssetsCopy);
exports['server:start'] = serverStart;
exports['server:test'] = function(cb) {
  const command = spawn('npx', ['jest', `${path.join(__dirname, 'server')}`], { stdio: 'inherit' })
  command.on('close', () => {
    cb();
  })
}
exports['next:build'] = nextBuild;
exports['prisma:generate'] = prismaGenerate;
exports['prisma:migrate:dev'] = function(cb) {
  const command = spawn('npx', ['prisma', 'migrate', 'dev', `--schema=${path.join(__dirname, 'server/prisma/schema.prisma')}`, '--name', 'migration'], { stdio: 'inherit' })
  command.on('close', () => {
    cb();
  })
}
exports['prisma:migrate:deploy'] = function(cb) {
  const command = spawn('npx', ['prisma', 'migrate', 'deploy', `--schema=${path.join(__dirname, 'server/prisma/schema.prisma')}`], { stdio: 'inherit' })
  command.on('close', () => {
    cb();
  })
}
exports['storybook'] = function(cb) {
  const command = spawn('npx', ['start-storybook', '-p', '6006'], { stdio: 'inherit' })
  command.on('close', () => {
    cb();
  })
}
exports['storybook:build'] = function(cb) {
  const command = spawn('npx', ['build-storybook'], { stdio: 'inherit' })
  command.on('close', () => {
    cb();
  })
}
exports['build'] = series(nextBuild, prismaGenerate, serverCompile, serverAssetsCopy)