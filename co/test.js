let {readFile, log} = require('../util');


function* generator() {
    yield readFile('data/a.json');
}
// 会发现立即返回一个`pending`状态的Promise对象
let gen = generator();
log(gen.next());
