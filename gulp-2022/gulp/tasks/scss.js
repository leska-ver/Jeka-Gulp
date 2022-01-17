import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

// Прокачаем наши стили добавим 4шт. плагинов.
import cleanCss from 'gulp-clean-css';//Сжатие CSS файла
import webpcss from 'gulp-webpcss';//Вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer';//Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries';//Групировка медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })//true нужно только в режиме разработчика, а в режиме продакшн он не нужен (на видео 1:33:53)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SCSS",
        massage: "Error: <%= error.message %>"
      })))
      .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    // Прокачаем наши стили, добавим 4шт. плагинов.
    .pipe(
      app.plugins.if(//Добавил(на видео 1:33:32) плагин gulp-if
        app.isBuild,//Добавил(на видео 1:33:32) продакшн
        groupCssMediaQueries()//первый
      )  
    )
    //Поменял местами подключени autoprefixer с подключением webpcss
    .pipe(
      app.plugins.if(//Добавил(на видео 1:33:32) плагин gulp-if
        app.isBuild,//Добавил(на видео 1:33:32) продакшн
        autoprefixer({//третий
          grid: true,
          ovverrideBrowserslist: ["last 3 versions"],//Здесь указали количество версий браузера
          cascade: true
        })
      )  
    )
    .pipe(
      app.plugins.if(//Добавил(на видео 1:33:32) плагин gulp-if
        app.isBuild,//Добавил(на видео 1:33:32) продакшн
        webpcss(//второй
          {
            webpClass: ".webp",
            noWebpClass: ".no-webp"
          }
        )  
      )
    )
    //Раскоментировать если нужен не сжатый дубль файла стилей. Если оставим их обоих, то мы получим два файла. Первый style.css(не сжатый), а второй style.min.css  
    .pipe(app.gulp.dest(app.path.build.css))//1.
    .pipe(
      app.plugins.if(//Добавил(на видео 1:33:32) плагин gulp-if
        app.isBuild,//Добавил(на видео 1:33:32) продакшн
        cleanCss()//2.Сжатие пишем последним(четвёртым)
      )
    )  
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
}