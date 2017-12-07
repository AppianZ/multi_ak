// const state = INIT_STATE;
import { getTestSocket, addUser } from './../../apis/test.api';
import io from 'socket.io-client';
var socket = io.connect('http://localhost:1600');


 new Vue({
    el: '#container',
    data: {
      roomGroupId: -1,
      list: [],
    },
    mounted: function () {
      var that = this;
      this.roomGroupId = this.query('room') || 10086;
      var d = new Date();
      var id = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      var obj = {
        roomGroupId: this.roomGroupId,
        user: {
          id,
          roomGroupId: this.roomGroupId,
          content: {count: 0}
        },
      };
      window.localStorage.setItem('socket-id-' + id, id);

      socket.emit('joinToRoom', obj);
      socket.on('showUser', function (data) {
        that.list = data;
      });
    },
    methods: {
      query: function(name) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
        const r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      }
    },
 })
