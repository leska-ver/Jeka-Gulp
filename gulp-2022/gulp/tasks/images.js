import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
  return app.gulp.src(app.path.src.images)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "IMAGES",
        message: "Error: <%= error.message %>"
      }))
      )
      .pipe(app.plugins.newer(app.path.build.images))
      //Переделали всё по видео(1:33:09)
      .pipe(
        app.plugins.if(//Добавил(на видео 1:33:09) плагин gulp-if
          app.isBuild,//Добавил(на видео 1:33:09) продакшн
          webp()
        )  
      )
      .pipe(
        app.plugins.if(//Добавил(на видео 1:33:09) плагин gulp-if
          app.isBuild,//Добавил(на видео 1:33:09) продакшн
            (app.gulp.dest(app.path.build.images))//После того как изображения созданы, мы их выгружаем в папку с результатами(build)
        ) 
      )     
      .pipe(
        app.plugins.if(//Добавил(на видео 1:33:09) плагин gulp-if
          app.isBuild,//Добавил(на видео 1:33:09) продакшн      
            (app.gulp.src(app.path.src.images))//Снова получаем доступ к изображениям папки исходников(src)
        )
      )      
      .pipe(
        app.plugins.if(//Добавил(на видео 1:33:09) плагин gulp-if
          app.isBuild,//Добавил(на видео 1:33:09) продакшн
            (app.plugins.newer(app.path.build.images))//Снова проверяем изображения на обновления(newer)
        )
      )  
      .pipe(
        app.plugins.if(//Добавил(на видео 1:33:09) плагин gulp-if
          app.isBuild,//Добавил(на видео 1:33:09) продакшн
          imagemin({//Создали задачу которая эти картинки будет сжимать
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 //0 to 7 //Указали на сколько сильно нам нужно сжимать изображения
          })
        )
      )  
      .pipe(app.gulp.dest(app.path.build.images))//Выгружаем оптимизированые картинки в папку результатов
      .pipe(app.gulp.src(app.path.src.svg))//Получили доступ к svg изображение
      .pipe(app.gulp.dest(app.path.build.images))//Скопировали svg изображение в папку результатов
      .pipe(app.plugins.browsersync.stream());//Отправили изображение в браузер
}