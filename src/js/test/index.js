// const state = INIT_STATE;
import io from 'socket.io-client';

 new Vue({
    el: '#container',
    data: {
      roomGroupId: -1,
      time: -1,
      isStart: -1, // -1未开始, 0,等待, 1 开始, 2 结束
      list: [],
      socketClient: {},
      qrCodeUrl: '',
      interval: null,
    },
    mounted: function () {
      console.log(this.interval);
s      var that = this;
      this.roomGroupId = this.query('room') || 10086;
      this.time = (that.query('time') ? (Number(that.query('time')) + 4) : 34);
      this.qrCodeUrl = 'http://mobile.qq.com/qrcode?url=' + window.location.href.replace('/test', '/test/test');

      var isDev = window.location.origin.indexOf('localhost') > -1 || window.location.origin.indexOf('192') > -1;
      var ip = isDev ? 'http://localhost:1600': window.location.origin
      this.socketClient = io.connect(ip);

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
        console.log('--- show user ----');
        console.log(data);
        that.list = data;
      });
    },
    methods: {
      query: function(name) {
        var reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      startGame: function () {
        var that = this;
        if(this.interval) return;
        event.preventDefault();
        that.isStart = 0;
        this.interval = setInterval(function () {
          that.socketClient.emit('onTimeCount', {
            roomGroupId: that.roomGroupId,
            time: --that.time,
            isStart: that.isStart
          }, function (res) {
            if ((that.query('time') ? (Number(that.query('time'))) : 30) == res.time) that.isStart = 1;
            if(that.time <= 0) that.isStart = 2;
            if(that.time < 0) clearInterval(that.interval);
          });
        }, 1000);
      }
    },
 })
