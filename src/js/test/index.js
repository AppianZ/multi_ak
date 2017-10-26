// const state = INIT_STATE;
import { getInitList } from './../../apis/test.api';

document.getElementById('btn').onclick = function () {
  getInitList().then(response => {
    console.log('----response is here!');
    console.log(response);
  });
}

