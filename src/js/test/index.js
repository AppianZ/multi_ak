// const state = INIT_STATE;
import { getInitList } from './../../apis/test.api';

document.getElementById('btn').onclick = function () {
  console.log('点击btn');
  getInitList({
    grant_type: 'password',
    username: 17601471739,
    password: 176014717392017
  }).then(response => {
    console.log('---- response is here! ---- ');
    console.log(response);
  });
}
