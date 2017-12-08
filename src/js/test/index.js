// const state = INIT_STATE;
import { getTestSocket, addUser } from './../../apis/test.api';
import io from 'socket.io-client';

 new Vue({
    el: '#container',
    data: {
      roomGroupId: -1,
      list: [],
      socketClient: {},
    },
    mounted: function () {
      var isDev = window.location.origin.indexOf('localhost') > -1 || window.location.origin.indexOf('192') > -1;
      var ip = isDev ? 'http://localhost:1600': window.location.origin
      this.socketClient = io.connect(ip);

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

      this.socketClient.emit('joinToRoom', obj);
      this.socketClient.on('showUser', function (data) {
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
