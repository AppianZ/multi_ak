/**
 * Created by appian on 2017/12/7.
 */
// const state = INIT_STATE;
import { getTestSocket, addUser } from './../../apis/test.api';
import io from 'socket.io-client';
var socket = io.connect('http://localhost:1600');


new Vue({
  el: '#container',
  data: {
    roomGroupId: -1,
    id: -1,
    count: 100,
  },
  mounted: function () {
    var d = new Date();
    this.roomGroupId = this.query('room') || 10086;
    this.id = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    var obj = {
      roomGroupId: this.roomGroupId,
      user: {
        id: this.id,
        roomGroupId: this.roomGroupId,
        content: {count: 100}
      },
    };

    window.localStorage.setItem('socket-id-' + this.id, this.id);

    socket.emit('addUser', obj, function(data) {
      console.log('--- add user ----');
      console.log(data);
    });
  },
  methods: {
    increaseCount() {
      var id = window.localStorage.getItem('socket-id-' + this.id);
      var that = this;
      socket.emit('increaseCount', {
        roomGroupId: that.roomGroupId,
        id,
        content: {
          count:  ++ that.count
        }
      });
    },
    query: function(name) {
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
      const r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  },
})
