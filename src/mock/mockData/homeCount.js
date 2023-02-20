export default {
  getHomeCount: () => {
    return {
      code: 200,
      data: [
        {
          name: '今日成交订单',
          value: 2871,
          icon: 'Select',
          color: '#60E7CA'
        },
        {
          name: '今日成交金额',
          value: '￥10535',
          icon: 'Wallet',
          color: '#47CEB1'
        },
        {
          name: '今日收藏订单',
          value: 351,
          icon: 'StarFilled',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 264,
          icon: 'GoodsFilled',
          color: '#5ab1ef'
        },
        {
          name: '本月成交订单',
          value: 3567,
          icon: 'Select',
          color: '#7EEFBB'
        },
        {
          name: '本月成交金额',
          value: '￥25674',
          icon: 'WalletFilled',
          color: '#22ABA8'
        },
        {
          name: '本月收藏订单',
          value: 503,
          icon: 'star',
          color: '#ED948D'
        },
        {
          name: '本月未支付订单',
          value: 356,
          icon: 'Goods',
          color: '#5ab1ef'
        }
      ]
    }
  }
}
