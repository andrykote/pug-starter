const { src, dest, watch } = require('gulp');

const pug        = require('gulp-pug');
const plumber    = require('gulp-plumber');
const livereload = require('gulp-livereload');
const clean      = require('gulp-clean');

const paths = {
	html: 'src/pages/*.pug'
};

livereload({ start: true });

function cleanBuild() {
	src('build/**/*.*', { read: false })
		.pipe(clean());
}

function html(cb) {
	src(paths.html)
		.pipe(plumber())
		.pipe(pug({ pretty: true }))
		.pipe(dest('build'))
		.pipe(livereload());

	cb();
}

exports.default = function () {
    livereload.listen({ basePath: 'build' });
    
    cleanBuild();

	watch(paths.html, { ignoreInitial: false }, html);
};
