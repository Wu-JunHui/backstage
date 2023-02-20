export default {
  getHomeTable: () => {
    return {
      code: 200,
      data: [
        {
          name: 'Apple',
          todayBuy: 354,
          montuBuy: 361,
          totalBuy: 8000
        },
        {
          name: 'HUAWEI',
          todayBuy: 432,
          montuBuy: 354,
          totalBuy: 7800
        },
        {
          name: 'vivo',
          todayBuy: 564,
          montuBuy: 212,
          totalBuy: 6800
        },
        {
          name: 'XiaoMi',
          todayBuy: 254,
          montuBuy: 564,
          totalBuy: 6500
        },
        {
          name: 'SAMSUNG',
          todayBuy: 354,
          montuBuy: 315,
          totalBuy: 4000
        }
      ]
    }
  }
}
