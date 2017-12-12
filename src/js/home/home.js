// const state = INIT_STATE;
import { getInitList, getToken } from './../../apis/home.api';

document.getElementById('btn').onclick = function () {
  console.log('点击btn');
  getInitList().then(response => {
    console.log('---- response is here! ---- ');
    console.log(response);
  });
}

document.getElementById('btn2').onclick = function () {
  console.log('点击btn2');
  getToken().then(response => {
    console.log('---- response2 is here! ---- ');
    console.log(response);
  });
}