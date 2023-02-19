export default {
  getHomeCount: () => {
    return {
      code: 200,
      data: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'Select',
          color: '#60E7CA'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'StarFilled',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 'GoodsFilled',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 7832,
          icon: 'SuccessFilled',
          color: '#7EEFBB'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star',
          color: '#ED948D'
        },
        {
          name: '本月未支付订单',
          value: 256,
          icon: 'Goods',
          color: '#5ab1ef'
        }
      ]
    }
  }
}
