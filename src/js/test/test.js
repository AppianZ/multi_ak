/**
 * Created by appian on 2017/12/7.
 */
import io from 'socket.io-client';

new Vue({
  el: '#container',
  data: {
    roomGroupId: -1,
    id: -1,
    count: 0,
    timeout: '88:88',
    isWait: 4,
    socketClient: {},
    countIcon: ['&#xe691;', '&#xe68f;', '&#xe690;', '&#xe68b;', '&#xe68d;', '&#xe68a;',
              '&#xe68e;', '&#xe68c;', '&#xe689;', '&#xe692;'],
    timeIcon: ['&#xe627;', '&#xe600;', '&#xe698;', '&#xe624;', '&#xe625;', '&#xe626;',
      '&#xe62a;', '&#xe628;', '&#xe629;', '&#xe711;']
  },
  mounted: function () {
    var that = this;
    var isDev = window.location.origin.indexOf('localhost') > -1 || window.location.origin.indexOf('192') > -1;
    var ip = isDev ? 'http://localhost:1600': window.location.origin
    this.socketClient = io.connect(ip);

    var d = new Date();
    this.roomGroupId = this.query('room') || 10086;
    this.id = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    var obj = {
      roomGroupId: this.roomGroupId,
      user: {
        id: this.id,
        roomGroupId: this.roomGroupId,
        content: {count: 0}
      },
    };

    window.localStorage.setItem('socket-id-' + this.id, this.id);

    this.socketClient.emit('joinToRoom', obj);

    this.socketClient.emit('addUser', obj, function(data) {
      console.log('--- add user ----');
      console.log(data);
    });

    this.socketClient.on('timeDecrease', function (data) {
      console.log('--- on time count ----');
      console.log(data);
      if(data.isEnd) return;
      if(data.isWait) --that.isWait;
      else that.isWait = -1;
      that.timeout = that.formatTime(data.time);
    });
  },
  methods: {
    increaseCount() {
      var that = this;
      this.id = window.localStorage.getItem('socket-id-' + this.id);
      console.log(this.id, that.count);
      if (that.timeout == '00:00') return;
      this.socketClient.emit('increaseCount', {
        roomGroupId: that.roomGroupId,
        id: that.id,
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
    },
    formatTime: function (second) {
      return ('0' + Math.floor(second / 60)).substr(-2) + ':' + ('0' + (second % 60)).substr(-2);
    }
  },
  computed: {
    countArray: function() {
      return this.count.toString().split('');
    },
    timeArray: function () {
      return this.timeout.toString().split('');
    }
  },
})
