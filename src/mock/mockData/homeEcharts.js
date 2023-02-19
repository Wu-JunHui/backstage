import Mock from 'mockjs'
export default {
  getHomeEcharts: () => {
    return {
      code: 200,
      data: {
        ordersData: {
          date: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07'],
          data: [
            {
              苹果: Mock.Random.integer(1000, 5000),
              小米: Mock.Random.integer(1000, 5000),
              华为: Mock.Random.integer(1000, 5000),
              oppo: Mock.Random.integer(1000, 5000),
              vivo: Mock.Random.integer(1000, 5000),
              一加: Mock.Random.integer(1000, 5000),
              三星: Mock.Random.integer(1000, 5000)
            },
            {
              苹果: Mock.Random.integer(1000, 5000),
              小米: Mock.Random.integer(1000, 5000),
              华为: Mock.Random.integer(1000, 5000),
              oppo: Mock.Random.integer(1000, 5000),
              vivo: Mock.Random.integer(1000, 5000),
              一加: Mock.Random.integer(1000, 5000),
              三星: Mock.Random.integer(1000, 5000)
            },
            {
              苹果: Mock.Random.integer(1000, 5000),
              小米: Mock.Random.integer(1000, 5000),
              华为: Mock.Random.integer(1000, 5000),
              oppo: Mock.Random.integer(1000, 5000),
              vivo: Mock.Random.integer(1000, 5000),
              一加: Mock.Random.integer(1000, 5000),
              三星: Mock.Random.integer(1000, 5000)
            },
            {
              苹果: Mock.Random.integer(1000, 5000),
              小米: Mock.Random.integer(1000, 5000),
              华为: Mock.Random.integer(1000, 5000),
              oppo: Mock.Random.integer(1000, 5000),
              vivo: Mock.Random.integer(1000, 5000),
              一加: Mock.Random.integer(1000, 5000),
              三星: Mock.Random.integer(1000, 5000)
            },
            {
              苹果: Mock.Random.integer(1000, 5000),
              小米: Mock.Random.integer(1000, 5000),
              华为: Mock.Random.integer(1000, 5000),
              oppo: Mock.Random.integer(1000, 5000),
              vivo: Mock.Random.integer(1000, 5000),
              一加: Mock.Random.integer(1000, 5000),
              三星: Mock.Random.integer(1000, 5000)
            },
            {
              苹果: Mock.Random.integer(1000, 5000),
              小米: Mock.Random.integer(1000, 5000),
              华为: Mock.Random.integer(1000, 5000),
              oppo: Mock.Random.integer(1000, 5000),
              vivo: Mock.Random.integer(1000, 5000),
              一加: Mock.Random.integer(1000, 5000),
              三星: Mock.Random.integer(1000, 5000)
            },
            {
              苹果: Mock.Random.integer(1000, 5000),
              小米: Mock.Random.integer(1000, 5000),
              华为: Mock.Random.integer(1000, 5000),
              oppo: Mock.Random.integer(1000, 5000),
              vivo: Mock.Random.integer(1000, 5000),
              一加: Mock.Random.integer(1000, 5000),
              三星: Mock.Random.integer(1000, 5000)
            }
          ]
        },
        videoData: [
          {
            name: '小米',
            value: 2999
          },
          {
            name: '华为',
            value: 5999
          },
          {
            name: '苹果',
            value: 6999
          },
          {
            name: 'vivo',
            value: 2999
          },
          {
            name: '魅族',
            value: 1999
          },
          {
            name: '三星',
            value: 4999
          },
          {
            name: 'oppo',
            value: 2999
          }
        ],
        userData: [
          {
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 8,
            active: 150
          },
          {
            date: '周三',
            new: 6,
            active: 330
          },
          {
            date: '周四',
            new: 10,
            active: 180
          },
          {
            date: '周五',
            new: 9,
            active: 120
          },
          {
            date: '周六',
            new: 20,
            active: 350
          },
          {
            date: '周日',
            new: 21,
            active: 310
          }
        ]
      }
    }
  }
}
