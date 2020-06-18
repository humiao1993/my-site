<template>
  <div id="home-page">
    <div id="banner">
      <div id="banner-info">
        <div class="title">
          四点
        </div>
        <div class="description">
          一个人静静坐在电脑面前
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-content">
        <a-row>
          <a-col>
            <router-link to="#"><span class="article-title">文章标题</span></router-link>
            <span class="abstract">摘要：安装YII有两种方式安装：我这里是用Composer安装，这样只需要执行一条命令就可以安装新的扩展或更新Yii。 一、安装composer 可以用命令composer 检查自己是否安装了composer，如果没有安装执行以下命令安装。 如果您之前已安装 Composer，请确保使用最新版本。 您可以</span>
            <span class="article-info">posted@2020-06-26 四点</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <router-link to="#"><span class="article-title">文章标题</span></router-link>
            <span class="abstract">摘要：摘要：数据结构可视化：https://www.cs.usfca.edu/~galles/visualization/Algorithms.html 十大经典算法：https://www.cnblogs.com/onepixel/articles/7674659.html</span>
            <span class="article-info">posted@2020-06-26 四点</span>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data: function () {
      return {
        article: false
      }
    },
    methods: {
      loadArticle () {
        this.axios.get('/api/article')
          .then(response => {
            this.article = response
          })
      }
    },
    beforeMount () {
      this.loadArticle()
    }
  }
</script>

<style lang="less" scoped>
  #home-page {
    div#banner {
      background: url("../assets/image/welcome-background.jpg") no-repeat top;
      background-size: cover;
      height: 400px;

      #banner-info {
        position: relative;
        text-align: left;
        max-width: 700px;
        margin: 0 auto;
        color: #ffffff;
        top: 120pt;
        padding: 10px;

        .title {
          font-weight: 500;
          font-size: 50px;
        }

        .description {
          padding: 5px 0 15px 0;
          font-size: 20px;
        }
      }
    }

    div.main {
      max-width: 65%;
      margin: 0 auto;
      padding: 0 50px;

      .main-content {
        margin-top: 3.5rem;

        .ant-row {
          margin-bottom: 50px;

          .ant-col {
            text-align: left;

            a {
              color: rgb(74, 74, 74);
              font-family: "Open Sans", "Microsoft Jhenghei", "Microsoft Yahei", sans-serif;
              font-size: 3rem;
              font-weight: bold;
              text-decoration: none;

              > * {
                vertical-align: middle;
              }

              .article-title {
                display: block;
              }
            }

            .abstract {
              font-size: 20px;
              font-family: "宋体";
              word-break: break-all;
              overflow: hidden;
              line-height: 1;
            }

            .article-info {
              display: block;
              margin-top: 10px;
              color: #c0c0c0;
            }
          }
        }
      }
    }
  }

</style>
