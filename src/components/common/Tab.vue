<template>
  <div id="bottomTab">
    <ul>
      <li class="bottomTab-item"
          v-for="(el,index) in tab"
          :class="{'on' : current == index}"
          :key="el.to">
        <a :href="el.to">
          <i class="icon-fonts" v-html="el.html"></i>
          <span v-text="el.text"></span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        tab1: [{
          to: 'index.html',
          text: '首页',
          html: '&#xe600;',
        }, {
          to: 'userlist.html',
          text: '客户',
          html: '&#xe666;',
        }, {
          to: 'secondlist.html',
          text: '代理商',
          html: '&#xe60b;',
        }, {
          to: 'mine.html',
          text: '我的',
          html: '&#xe671;',
        }],
        tab2: [{
          to: 'index.html',
          text: '首页',
          html: '&#xe600;',
        }, {
          to: 'userlist.html',
          text: '客户',
          html: '&#xe666;',
        }, {
          to: 'mine.html',
          text: '我的',
          html: '&#xe671;',
        }],
      };
    },
    props: ['current', 'level'],
    computed: {
      tab() {
        return this[`tab${this.level}`];
      }
    },
  };
</script>
