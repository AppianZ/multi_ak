/**
 * Created by appian on 2017/12/7.
 */
import io from 'socket.io-client';

new Vue({
  el: '#container',
  data: {
    roomGroupId: -1,
    id: -1,
    count: 100,
    socketClient: {},
  },
  mounted: function () {
    var isDev = window.location.origin.indexOf('localhost') > -1 || window.location.origin.indexOf('192') > -1;
    var ip = isDev ? 'http://localhost:1600': window.location.origin
    this.socketClient = io.connect(ip);

    console.log('ip2 --- ' + ip);
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

    this.socketClient.emit('addUser', obj, function(data) {
      console.log('--- add user ----');
      console.log(data);
    });
  },
  methods: {
    increaseCount() {
      var id = window.localStorage.getItem('socket-id-' + this.id);
      var that = this;
      this.socketClient.emit('increaseCount', {
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
