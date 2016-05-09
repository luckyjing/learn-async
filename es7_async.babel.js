function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

let { log, readFile } = require('./util');
let read_series = (() => {
    var ref = _asyncToGenerator(function* () {
        let data1 = yield readFile('./data/a.json');
        let data2 = yield readFile('./data/b.json');
        log(data1);
        log(data2);
    });

    return function read_series() {
        return ref.apply(this, arguments);
    };
})();
// read_series();

let read_parallel = (() => {
    var ref = _asyncToGenerator(function* () {
        let read = ['./data/a.json', './data/b.json'];
        read = read.map(function (fileName) {
            return readFile(fileName);
        });
        let data = yield Promise.all(read);
        log(data);
    });

    return function read_parallel() {
        return ref.apply(this, arguments);
    };
})();
read_parallel();

let read_waterfall = (() => {
    var ref = _asyncToGenerator(function* () {
        let data = yield readFile('./data/a.json');
        let data2 = yield readFile('./data/b.json').then(function (_data) {
            return Object.assign({}, { first: data }, { second: _data });
        });
        log(data2);
    });

    return function read_waterfall() {
        return ref.apply(this, arguments);
    };
})();
// read_waterfall();
let hasError = (() => {
    var ref = _asyncToGenerator(function* () {
        try {
            let data = yield readFile('./data/c.json');
            return data;
        } catch (e) {
            log(e);
        }
    });

    return function hasError() {
        return ref.apply(this, arguments);
    };
})();
// hasError();
let hasError_catch = (() => {
    var ref = _asyncToGenerator(function* () {
        let data = yield readFile('./data/c.json').catch(function (err) {
            return err;
        });
        log(data);
    });

    return function hasError_catch() {
        return ref.apply(this, arguments);
    };
})();
// hasError_catch();
