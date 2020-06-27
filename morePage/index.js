

import {modleA} from './modleA'
import {modleB} from './modleB'
import $ from 'jquery'
// import './style/index.less';
// import './style/test.less';
console.log(11111);

window.onload = function () {
    const wrap = document.getElementById('#app');
    modleA();
    modleB();
    $(function() {
        $('div').append(wrap).on('click', function() {
            console.log(' my is  jquery create div dom in page A');
        })
    });
}

