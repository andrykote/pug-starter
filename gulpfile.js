const { src, dest, watch, series } = require('gulp');

const pug        = require('gulp-pug');
const plumber    = require('gulp-plumber');
const livereload = require('gulp-livereload');
const del      = require('del');
const svgSymbols = require('gulp-svg-symbols');
const postCss = require('gulp-postcss');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const addSrc = require('gulp-add-src');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const minify = require('gulp-minify')
const sass = require('gulp-sass')

const paths = {
	html: 'src/pages/*.pug',
	css: [
		'src/assets/styles/global.css',
		'src/components/**/*.css',
		'src/styles/*.css',
		'!src/styles/m.*.css',
		'!src/components/**/m.*.css'

	],
	mCss: [
		'src/components/**/m.*.css',
		'src/assets/styles/m.global.css',
		'src/styles/m.*.css'
	],
	sass: [
		'src/components/**/*.scss',
		'!src/components/**/m.*.scss'
	] ,
	mSass: 'src/components/**/m.*.scss',
	js: 'src/components/**/*.js',
	svg: 'src/assets/icons/*.svg',
	img: 'src/assets/images/*.*'

	
};

livereload({ start: true });

function cleanBuild() {
	return del(['./build/**/*'])
}

function html(cb) {
	src(paths.html)
		.pipe(plumber())
		.pipe(pug({ pretty: true }))
		.pipe(dest('build'))
		.pipe(livereload());

	cb();
}

function sassFunc(cb) {
	src (paths.sass)
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style-post_css.css'))
		.pipe(dest('./src/styles'))
		.pipe(livereload());

	src (paths.mSass)
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('m.style-post_css.css'))
		.pipe(dest('./src/styles'))
		.pipe(livereload());
	cb();
}

function css(cb) {
	src(paths.css)
		.pipe(plumber())
		.pipe(postCss([autoprefixer()]))
		.pipe(concat('style.css'))
		.pipe(dest('build/css'))
		.pipe(rename('style.min.css'))
		.pipe(csso())
		.pipe(dest('build/css'))
		.pipe(livereload());

	src(paths.mCss)
		.pipe(plumber())
		.pipe(postCss([autoprefixer()]))
		.pipe(concat('m.style.css'))
		.pipe(dest('build/css'))
		.pipe(rename('m.style.min.css'))
		.pipe(csso())
		.pipe(dest('build/css'))
		.pipe(livereload());

	cb();
}

function js(cb) {
	src(paths.js)
		.pipe(plumber())
		.pipe(concat('script.js'))
		.pipe(babel({presets: ['@babel/env']}))
		.pipe(minify({
			ext: {
				src: '.js',
				min: '.min.js'
			}
		}))
		.pipe(dest('build/js'))
		.pipe(livereload());

	cb();
}

function svgIcons(cb) {
	src(paths.svg)
		.pipe(svgSymbols())
		.pipe(dest('build/assets/icons'))
		.pipe(livereload());

	cb();
}

function images(cb) {
	src(paths.img)
		.pipe(plumber())
		.pipe(dest('build/assets/images'))
		.pipe(livereload());

	cb();
}

function watchFiles() {
	livereload.listen({ basePath: 'build' });

	watch([paths.html, './src/components/**/*.pug'], { ignoreInitial: false }, html);
	watch(paths.sass, { ignoreInitial: false }, sassFunc);
	watch(['./src/**/*.css' ], { ignoreInitial: false }, css);
	watch(paths.js, { ignoreInitial: false }, js);
	watch(paths.svg, { ignoreInitial: false}, svgIcons);
	watch(paths.img, { ignoreInitial: false}, images);
}


exports.default = series(cleanBuild, watchFiles);
