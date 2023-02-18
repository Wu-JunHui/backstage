import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
//这里可以把 mock 文件夹下的所有文件都引入
// import homeMock from './api/mockData/home'
// import permissionMock from './api/mockData/permission'
// import userMock from './api/mockData/user'
// export const mockModules = [...homeMock, ...permissionMock, ...userMock]
import homeModule from './mock/index'
export function setupProdMockServer() {
  createProdMockServer([...homeModule])
}
