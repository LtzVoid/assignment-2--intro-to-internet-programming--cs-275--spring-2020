const { src, dest, watch, series } = require(`gulp`);
const htmlCompressor = require(`gulp-htmlmin`);
const htmlValidator = require(`gulp-html`);
const cssValidator = require(`gulp-stylelint`);
const sass = require(`gulp-sass`);
const jsLinter = require(`gulp-eslint`);
const babel = require(`gulp-babel`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;


let compressHTML = () => {
    return src (`html/*.html`)
        .pipe(htmlCompressor({collapesWhitespace:true}))
        .pipe(dest(`prod/html`));
};

let validateHTML = () => {
    return src(`html/*.html`)
        .pipe(htmlValidator());
};

let validateCSS = () => {
    return src(`css/*.css`)
        .pipe(cssValidator());
};

let compileCSSForDev  = () => {
    return src(`css/*.css`)
        .pipe(sass({
            outputStyle: `expanded`,
            precision: 10
        }))
        .pipe(dest(`temp/css`));
};

let lintJS = () => {
    return src(`js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};

let compileCSSForProd = () => {
    return src(`css/*.css`)
        .pipe(sass({
            outputStyle: `compressed`,
            precision: 10
        }))
        .pipe(dest(`prod/css`));
};

let transpileJSForDev = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`prod/js`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        server: {
            baseDir: [
                `html`,
                `temp`
            ]
        }
    });

    watch(`html/**/*.html`, validateHTML).on(`change`, reload);
    watch(`css/*.css`, compileCSSForDev).on(`change`, reload);
    watch(`js/*.js`, transpileJSForDev).on(`change`, reload);
};

exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
exports.validateCSS = validateCSS;
exports.compileCSSForDev = compileCSSForDev;
exports.lintJS = lintJS;
exports.compileCSSForProd = compileCSSForProd;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.serve = series(
    compileCSSForDev,
    lintJS,
    transpileJSForDev,
    validateHTML,
    serve
);
exports.build = series(
    compressHTML,
    compileCSSForProd,
    transpileJSForProd
);
