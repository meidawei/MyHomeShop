<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box"></div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <div class="el-input-number el-input-number--small">
                          <el-input-number
                            v-model="num"
                            @change="handleChange"
                            :min="1"
                            :max="goodsinfo.stock_quantity"
                          ></el-input-number>
                        </div>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button @click="addGoods" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <Affix :offset-top="40">
                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                  <ul>
                    <li>
                      <a href="javascript:;" @click="tabIndex=0" :class="{selected:tabIndex==0}">商品介绍</a>
                    </li>
                    <li>
                      <a href="javascript:;" @click="tabIndex=1" :class="{selected:tabIndex==1}">商品评论</a>
                    </li>
                  </ul>
                </div>
              </Affix>
              <div
                class="tab-content entry"
                style="display: block;"
                v-show="tabIndex==0"
                v-html="goodsinfo.content"
              ></div>
              <div class="tab-content" style="display: block;" v-show="tabIndex==1">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <img style="width:55px;height:55px;border-radius:50%;" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1166873964,2490248725&fm=26&gp=0.jpg" />
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          v-model.trim="comment"
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                          @keyup.enter="commitComment"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                          @click="commitComment"
                        />
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p v-show="totalcount==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center;">暂无评论，快来抢沙发吧！</p>
                    <li v-for="item in comments" :key="item.id">
                      <div class="avatar-box">
                        <img style="width:55px;height:55px;border-radius:50%;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584525662369&di=3d9c414c446aceff067de6c9d164f890&imgtype=0&src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F07%2F14%2F316522bb395b8856%2521324x324_big.jpg" />
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.add_time | currentTime}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="  " style="margin: 5px 0px 0px 62px;">
                    <Page :total="totalcount" show-sizer show-elevator placement="top" :page-size="pageSize" :page-size-opts="[6,10,12]" @on-page-size-change="changeComment" @on-change="pageComment" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="item in hotgoodslist" :key="item.id">
                    <router-link :to="'/detail/'+item.id">
                      <div class="img-box">
                        <a href="#/site/goodsinfo/90" class>
                          <img :src="item.img_url | imgUrl" />
                        </a>
                      </div>
                      <div class="txt-box">
                        <a href="#/site/goodsinfo/90" class>{{item.title}}</a>
                        <span>{{item.add_time | shortTime}}</span>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 返回顶部 -->
    <BackTop></BackTop>
  </div>
</template>
<script>
export default {
  name: "detail",
  data() {
    return {
      goodsinfo: {}, //商品具体数据
      imglist: [], //图片信息
      hotgoodslist: [], //推荐商品
      num: 1, //商品数量
      tabIndex: 0, //tab栏索引
      pageIndex: 1, //页码
      pageSize:6,//页容量
      comments: [], //评论内容
      totalcount: 0, //总评论数
      comment:'',//输入的评论内容
    };
  },
  created() {
    console.log(this.$route.params);
    this.initData();
  },
  // 事件
  methods: {
    // 初始化数据
    initData() {
      this.num = 1;
      this.tabIndex = 0;
      this.getComments();
      this.$axios
        .get(`${this.$baseUrl}site/goods/getgoodsinfo/${this.$route.params.id}`)
        .then(res => {
          this.goodsinfo = res.data.message.goodsinfo;
          this.imglist = res.data.message.imglist;
          this.hotgoodslist = res.data.message.hotgoodslist;
        });
    },
    // 获取商品评论数据
    getComments(){
      this.$axios
        .get(`${this.$baseUrl}site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
        .then(res => {
          this.comments = res.data.message;
          this.totalcount = res.data.totalcount;
        });
    },
    pageComment(value){
      this.pageIndex = value
      this.getComments()
    },
    changeComment(value){
      this.pageSize = value
      this.getComments()
    },
    handleChange(value) {
      console.log(value);
    },
    // 提交评论
    commitComment(){
      if(this.comment!=''){
        this.$axios.post(`${this.$baseUrl}site/validate/comment/post/goods/${this.$route.params.id}`,{
          "commenttxt":this.comment
        }).then(res=>{
          if(res.data.status==0){
            this.$Message.success(res.data.message);
            this.pageIndex = 1
            this.getComments()
            this.comment = ''
          }else{
            this.$Message.warning('评论失败');
          }
        })
      }else{
        this.$Message.warning('请输入内容啊大佬');
      }
    },
    // 加入购物车 使用 vuex 管理数据
    addGoods(){
      this.$store.commit('increment',{
        goodId:this.$route.params.id,
        goodNum:this.num
      })
      this.num = 1
    }
  },
  // 侦听器
  watch: {
    $route() {
      this.initData();
      this.getComments()
    }
  }
};
</script>
<style>
.tab-content img {
  display: block;
  max-width: 100%;
}
</style>