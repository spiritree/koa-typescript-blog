<template>
  <div class="calendar-box">
    <!-- 年份 月份 -->
    <div class="months">
      <ul class="month-list">
        <li class="arrow prev" @click="pickPre(currentYear, currentMonth)">❮</li>
        <li class="year-month">
          <span class="choose-year">
            <span>{{ currentYear }}</span>
            <span>年</span>
            <span>{{ currentMonth }}</span>
            <span>月</span>
            <!-- <span>{{ currentDay }}</span>
            <span>日</span> -->
          </span>
        </li>
        <li class="arrow next" @click="pickNext(currentYear, currentMonth)">❯</li>
      </ul>
    </div>
    <!-- 星期 -->
    <ul class="weekdays clearfix">
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
      <li>日</li>
    </ul>

    <!-- 日期 -->
    <ul class="days clearfix">
      <li v-for="day in days" :key="day">
        <!--本月-->
        <span v-if="day.getMonth() + 1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
        <span v-else class="item" :class="{ 'active': day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate() }">
          <!--today-->
          <nuxt-link :to="`/date/${ formatDate(day.getFullYear(), day.getMonth() + 1, day.getDate())}`">{{ day.getDate() }}</nuxt-link>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'aside-calendar',

  data() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: []
    };
  },

  created() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const d = new Date(this.formatDate(year, month, 1));
    d.setDate(35);
    this.initData(this.formatDate(d.getFullYear(), d.getMonth(), 1));
  },

  methods: {
    initData(cur) {
      this.days = [];
      const date = cur ? new Date(cur) : new Date();
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      this.currentWeek = date.getDay();
      if (this.currentWeek == 0) this.currentWeek = 7;
      const str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      );
      // 今天是周日，放在第一行第7个位置，前面6个
      // 本周
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        const d = new Date(str);
        d.setDate(d.getDate() - i);
        // console.log("y:" + d.getDate())
        this.days.push(d);
      }
      // console.log(this.currentWeek)
      for (let i = 1; i <= 35 - this.currentWeek; i++) {
        const d = new Date(str);
        d.setDate(d.getDate() + i);
        this.days.push(d);
      }
    },

    pick(date) {
      alert(
        this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      );
    },

    pickPre(year, month) {
      //  setDate(0); 上月最后一天
      //  setDate(-1); 上月倒数第二天
      //  setDate(dx) 参数dx为 上月最后一天的前后dx天
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },

    pickNext(year, month) {
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },

    pickYear(year, month) {
      alert(year + ',' + month);
    },

    // 返回 类似 2016-01-02 格式的字符串
    formatDate(year, month, day) {
      const y = year;
      let m = month;
      if (m < 10) m = '0' + m;
      let d = day;
      if (d < 10) d = '0' + d;
      return y + '-' + m + '-' + d;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/variable.scss';

.calendar-box {
  padding: $normal-pad;

  .months {
    margin-bottom: 0.5rem;

    > .month-list {
      display: flex;
      justify-content: space-between;

      > li {
        height: 2rem;
        line-height: 2rem;
        text-align: center;

        &.year-month {
          width: 11.4rem;
        }

        &.arrow {
          width: 2rem;
          cursor: pointer;
          color: $disabled;

          &:hover {
            color: $black; // background-color: $module-hover-bg;
          }
        }
      }
    }
  }
  > .days,
  > .weekdays {
    margin-bottom: 0.5rem;

    > li {
      display: inline-block;
      float: left;
      width: calc(100% / 7);
      text-align: center;
    }
  }

  > .weekdays {
    height: 2rem;
    line-height: 2rem;
  }

  > .days {
    margin-bottom: 0;

    > li {
      line-height: 2.6rem;

      > .other-month {
        opacity: 0.3;
        cursor: initial;
      }

      > .item {
        display: block;
        border-radius: 100%;

        > a {
          display: block;
          color: $secondary;
        }

        &:hover {
          background-color: lighten($module-hover-bg, 30%);

          a {
            color: $black;
          }
        }

        &.active {
          background-color: $module-hover-bg;

          a {
            color: $black;
          }
        }
      }
    }
  }
}
</style>
