import {modleC} from './modleC'
import {modleB} from './modleB'
import $ from 'jquery'
import _ from 'lodash';
// import './style/test.less'
console.log('2222');

window.onload = function () {
    const wrap = document.getElementById('#app');
    modleC();
    modleB();
    console.log(_.cloneDeep({a: 'lodash clone obj deeply'}), 'clone a obj');
     
    $(function() {
        $('div').append(wrap).on('click', function() {
            console.log(' my is  jquery create div dom in page B');
        })
    });

}
