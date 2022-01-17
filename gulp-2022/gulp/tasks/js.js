import webpack from "webpack-stream";

export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })//true нужно только в режиме разработчика, а в режиме продакшн он не нужен (на видео 1:34:13)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      }))
    )
    .pipe(webpack({
      mode: app.isBuild ? 'production' : 'development',//Если мы в режиме продакшн(isBuild) указываем production, если нет то указываем development(Режим разработчика)(на видео 1:34:25)
      output: {
        filename: 'app.min.js',//Файл результат
      }
    }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
}