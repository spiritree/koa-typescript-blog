<template>
  <section  class="clearfix main">
    <div class="article">
      <div v-if="loading" v-for="n in 4" :key="n" style="margin: 10%;">
        <content-placeholders>
          <content-placeholders-heading :img="true" />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
        <hr style="margin: 40px; 0; 40px; 0;">
      </div>
      <articleView
        v-if="!loading"
        :articleList = "list"
        :haveMoreArt="haveMoreArt"
        @loadMore="loadMore">
      </articleView>
    </div>
  </section>
</template>
<script>
const components = {
  articleView: () => import('~/components/common/article.vue'),
  ContentPlaceholders: () => import('~/components/placeholder/ContentPlaceholders.vue'),
  ContentPlaceholdersHeading: () => import('~/components/placeholder/ContentPlaceholdersHeading.vue'),
  ContentPlaceholdersText: () => import('~/components/placeholder/ContentPlaceholdersText.vue')
}

export default {
  components,

  scrollToTop: true,

  transition: 'fade',

  data() {
    return {};
  },

  // 不用fetch就没有SSR效果了
  fetch ({ store }) {
    return store.dispatch('getArtList')
  },

  // created() {
  //   this.$store.dispatch('getArtList');
  // },

  computed: {
    mobileLayout() {
      return this.$store.state.options.mobileLayout;
    },

    article() {
      return this.$store.state.article;
    },

    list() {
      return this.$store.state.article.art.list;
    },

    banners() {
      return this.list.slice(0, 9);
    },

    haveMoreArt() {
      return (
        this.$store.state.article.art.pagination.current_page !==
        this.$store.state.article.art.pagination.total_page
      );
    },

    loading() {
      return this.$store.state.article.fetch;
    }
  },

  methods: {
    loadMore() {
      this.$store.dispatch('getArtList', {
        current_page: this.$store.state.article.art.pagination.current_page + 1
      });
    }
  },
};
</script>


<style lang="scss">
@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.article-line {
  position: absolute;
  left: -$mlg-pad;
  bottom: -$mlg-pad;
  width: $xlg-pad * 2;
  height: 1px;
  background: $border-color;
}

.main {
  > .title {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0rem;
    line-height: 1.5rem;
    color: $black;
    font-size: 1rem;
    font-weight: normal;

    > .title-name {
      position: relative;
      padding-right: $lg-pad;
      background: $white;
      z-index: 99;
    }

    > .line {
      top: 50%;
    }
  }
}
</style>
