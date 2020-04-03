<template>
  <div>
    <home-nav-bar/>
    <home-swiper :banner="banner"/>
    <home-recommend :recommend="recommend"/>
    <home-feature/>
    <tab-control
    class="tab-control"
    :titles="titles"
    @tabClick = 'tabClick'/>
    
    <goods-list :goods="showGoods"/>
    

    <div>
      <ul>
        <li>这是内容1</li>
        <li>这是内容2</li>
        <li>这是内容3</li>
        <li>这是内容4</li>
        <li>这是内容5</li>
        <li>这是内容6</li>
        <li>这是内容7</li>
        <li>这是内容8</li>
        <li>这是内容9</li>
        <li>这是内容10</li>
        <li>这是内容11</li>
        <li>这是内容12</li>
        <li>这是内容13</li>
        <li>这是内容14</li>
        <li>这是内容15</li>
        <li>这是内容16</li>
        <li>这是内容17</li>
        <li>这是内容18</li>
        <li>这是内容19</li>
        <li>这是内容20</li>
        <li>这是内容21</li>
        <li>这是内容22</li>
        <li>这是内容23</li>
        <li>这是内容24</li>
        <li>这是内容25</li>
        <li>这是内容26</li>
        <li>这是内容27</li>
        <li>这是内容28</li>
        <li>这是内容29</li>
        <li>这是内容30</li>
        <li>这是内容31</li>
        <li>这是内容32</li>
        <li>这是内容33</li>
        <li>这是内容34</li>
        <li>这是内容35</li>
        <li>这是内容36</li>
        <li>这是内容37</li>
        <li>这是内容38</li>
        <li>这是内容39</li>
        <li>这是内容40</li>
        <li>这是内容41</li>
        <li>这是内容42</li>
        <li>这是内容43</li>
        <li>这是内容44</li>
        <li>这是内容45</li>
        <li>这是内容46</li>
        <li>这是内容47</li>
        <li>这是内容48</li>
        <li>这是内容49</li>
        <li>这是内容50</li>
        <li>这是内容51</li>
        <li>这是内容52</li>
        <li>这是内容53</li>
        <li>这是内容54</li>
        <li>这是内容55</li>
        <li>这是内容56</li>
        <li>这是内容57</li>
        <li>这是内容58</li>
        <li>这是内容59</li>
        <li>这是内容60</li>
        <li>这是内容61</li>
        <li>这是内容62</li>
        <li>这是内容63</li>
        <li>这是内容64</li>
        <li>这是内容65</li>
        <li>这是内容66</li>
        <li>这是内容67</li>
        <li>这是内容68</li>
        <li>这是内容69</li>
        <li>这是内容70</li>
        <li>这是内容71</li>
        <li>这是内容72</li>
        <li>这是内容73</li>
        <li>这是内容74</li>
        <li>这是内容75</li>
        <li>这是内容76</li>
        <li>这是内容77</li>
        <li>这是内容78</li>
        <li>这是内容79</li>
        <li>这是内容80</li>
        <li>这是内容81</li>
        <li>这是内容82</li>
        <li>这是内容83</li>
        <li>这是内容84</li>
        <li>这是内容85</li>
        <li>这是内容86</li>
        <li>这是内容87</li>
        <li>这是内容88</li>
        <li>这是内容89</li>
        <li>这是内容90</li>
        <li>这是内容91</li>
        <li>这是内容92</li>
        <li>这是内容93</li>
        <li>这是内容94</li>
        <li>这是内容95</li>
        <li>这是内容96</li>
        <li>这是内容97</li>
        <li>这是内容98</li>
        <li>这是内容99</li>
        <li>这是内容100</li>
      </ul>
    </div>
  </div>
</template>

<script>
import HomeNavBar from './childComps/HomeNavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomeFeature from './childComps/HomeFeature'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'


import { getHomeMultidata, getHomeGoods } from 'network/home'

export default {
  name: 'Home',
  components: {
    HomeNavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      titles: ['流行','新款','精选'],
      currentType: 'pop'
    }
  },
  created() {
    //请求banner和recommend数据
    this.HomeMultidata()
    //请求商品（goods）数据
    this.HomeGoods('pop')
    this.HomeGoods('new')
    this.HomeGoods('sell')
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /*数据请求部分
    ****
    ****/
    //首页轮播（banner）和recommend数据
    HomeMultidata() {
      getHomeMultidata()
        .then(res => {
          // console.log(res.success);
          // console.log(res.data);
          this.banner = res.data.banner.list
          this.recommend = res.data.recommend.list
        })
    },
    //首页商品数据
    HomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page)
        .then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
    },
    /***
    ****逻辑处理部分
    ****/
   tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
      }
      console.log(index);
    },
  }
}
</script>

<style scoped>
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>