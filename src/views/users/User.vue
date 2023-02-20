<template>
  <!-- 操作栏 -->
  <div class="action-contaienr">
    <!-- 左侧新增按钮 -->
    <el-button type="primary" @click="addHandler" color="#2cb2c2">+ 新增</el-button>
    <!-- 右侧搜索功能 -->
    <el-form :inline="true" :model="formInline">
      <el-form-item>
        <el-input v-model="formInline.keyword" placeholder="请输入用户名" @keyup.enter="searchHandler" />
      </el-form-item>
      <!-- 搜索按钮 -->
      <el-form-item>
        <el-button type="primary" @click="searchHandler" color="#2cb2c2">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>

  <!-- 用户数据列表 -->
  <div class="table-container">
    <el-table :data="userData" style="width: 100%" height="75vh" align="center" stripe :header-row-style="{ color: '#2cb2c2', fontSize: 16 + 'px' }">
      <!-- 数据区 -->
      <el-table-column v-for="item in tableHead" :key="item.prop" :label="item.label" :prop="item.prop" :width="item.width ? item.width : 125" align="center" />
      <!-- 操作区 -->
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default="scope">
          <el-button size="small" @click="editHandler(scope.row)" title="编辑用户信息"
            ><el-icon><Edit /></el-icon
          ></el-button>
          <el-button type="danger" size="small" @click="deleteHandler(scope.row)" title="删除用户"
            ><el-icon><Delete /></el-icon
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination small background layout="prev, pager, next" :total="paramConfig.total" class="mt-4" @current-change="changePage" />
  </div>

  <!-- 模态框 -->
  <el-dialog v-model="dialogVisible" :title="occupy === 'add' ? '新增用户' : '编辑用户'" width="35%" :before-close="dialogClose">
    <!-- 新增用户表单 -->
    <el-form :inline="true" :model="formUser" ref="userFormRef" label-width="80px">
      <!-- 第一行 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '请输入姓名' }]"> <el-input v-model="formUser.name" placeholder="请输入姓名" /> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item
            label="年龄"
            prop="age"
            :rules="[
              { required: true, message: '请输入年龄' },
              { type: 'number', message: '请输入数字' }
            ]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" /> </el-form-item
        ></el-col>
      </el-row>
      <!-- 第二行 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex" :rules="[{ required: true, message: '请选择性别' }]">
            <el-select v-model="formUser.sex" placeholder="请选择">
              <el-option label="女" value="1" />
              <el-option label="男" value="0" />
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth" :rules="[{ required: true, message: '请选择出生日期' }]"> <el-date-picker v-model="formUser.birth" type="date" label="出生日期" placeholder="请选择" style="width: 100%" value-format="YYYY-MM-DD" /> </el-form-item
        ></el-col>
      </el-row>
      <!-- 第三行 -->
      <!-- <el-row> -->
      <el-form-item label="地址" prop="addr" :rules="[{ required: true, message: '请输入地址' }]" style="width: 60%"> <el-input v-model="formUser.addr" type="textarea" placeholder="请输入地址" resize="none" rows="3"  /> </el-form-item>
      <!-- </el-row> -->
      <!-- 第四行 -->
      <el-row style="justify-content: flex-end" class="buttons-container">
        <el-form-item>
          <el-button type="primary" color="#2cb2c2" @click="resetHandler">重置</el-button>
          <el-button type="primary" color="#2cb2c2" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, markRaw } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Warning } from '@element-plus/icons-vue'

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()

    // 定义表头循环数组
    const tableHead = reactive([
      {
        prop: 'name',
        label: '姓名'
      },
      {
        prop: 'age',
        label: '年龄'
      },
      {
        prop: 'gender',
        label: '性别'
      },
      {
        prop: 'birth',
        label: '出生日期',
        width: 200
      },
      {
        prop: 'addr',
        label: '地址',
        width: 320
      }
    ])

    // 定义接收用户数据的数组
    let userData = ref([])

    // 定义请求参数对象，用于分页器、搜索
    const paramConfig = reactive({
      total: 0, // 总条目数
      page: 1, // 当前页,
      name: ''
    })

    // 定义分页按钮切换事件，形参可接收所点击页数
    const changePage = page => {
      // 将当前页页数传入分页配置对象，该对象将作为参数发起请求，返回由后端处理好的分页数据
      paramConfig.page = page
      // 必须在点击分页后再次发起请求
      getUserData(paramConfig)
    }

    // 请求用户数据
    const getUserData = async paramConfig => {
      let res = await proxy.$api.getUserData(paramConfig)
      // 处理请求返回的性别数据
      userData.value = res.list.map(item => {
        item.gender = item.sex === 0 ? '女' : '男'
        return item
      })
      // 获取分页的总条数
      paramConfig.total = res.count
    }

    // 定义表单v-model变量
    const formInline = reactive({
      keyword: ''
    })

    // 定义搜索按钮点击事件
    const searchHandler = () => {
      // 点击按钮后，将文本框value作为参数发起请求，由后端返回数据
      // 必须通过参数配置对象发起请求，不能单独传入keyword，否则分页器不对应
      paramConfig.name = formInline.keyword
      getUserData(paramConfig)
    }

    // 控制新增用户模态框的显示
    const dialogVisible = ref(false)

    // 定义模态框关闭事件回调
    const dialogClose = done => {
      let formFilled = Object.values(formUser).every(item => item === '')
      if (formFilled)
        return done(
          // 表格为空，通过el-form提供的方法重置验证提示信息
          proxy.$refs.userFormRef.resetFields()
        )
      // 表格不为空
      ElMessageBox.confirm('关闭窗口将不会保存所编辑信息，确认关闭吗?', '提示', {
        type: 'warning',
        icon: markRaw(Warning),
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        confirmButtonClass: 'el-messageBox-confirm',
        cancelButtonClass: 'el-messageBox-cancel'
      })
        .then(() => {
          done()
          // 通过el-form提供的方法重置表单，同时也会重置验证提示信息
          proxy.$refs.userFormRef.resetFields()
        })
        .catch(() => {
          // catch error
        })
    }

    // 定义添加新用户的form数据
    const formUser = reactive({
      name: '',
      age: '',
      sex: '',
      birth: '',
      addr: ''
    })

    // 定义添加新用户提交表单事件
    const onSubmit = () => {
      // 通过element提供的方法校验表单后才可提交表单
      proxy.$refs.userFormRef.validate(async valid => {
        if (valid) {
          // 需判断是新增还是编辑所提交的表单
          if (occupy.value === 'add') {
            // 新增用户正在提交表单
            let res = await proxy.$api.addUser(formUser)
            if (res) {
              // 通过el-form提供的方法重置表单，同时要为每个el-form表单添加prop
              proxy.$refs.userFormRef.resetFields()
              // 关闭模态框
              dialogVisible.value = false
              // 重新发起请求以更新列表
              getUserData(paramConfig)
            }
          } else {
            // 编辑用户正在提交表单，依据通过浅拷贝rowData（插槽获取的数据）获取的formUser发起post请求（后端根据其携带id进行处理）
            // 先处理性别的数据转换
            formUser.sex = formUser.sex === '男' ? 0 : 1
            let res = await proxy.$api.editUser(formUser)
            if (res) {
              // 通过el-form提供的方法重置表单，同时要为每个el-form表单添加prop
              proxy.$refs.userFormRef.resetFields()
              // 关闭模态框
              dialogVisible.value = false
              // 重新发起请求以更新列表
              getUserData(paramConfig)
            }
          }
        } else {
          // 用于编辑按钮时，未正确填写信息进行提示
          ElMessage({
            showClose: true,
            message: '请输入正确的内容',
            type: 'error'
          })
        }
      })
    }

    // 定义表单重置按钮点击事件回调
    const resetHandler = () => {
      // 获取当前表单对象的键值，判断是否为空
      let formFilled = Object.values(formUser).every(item => item === '')
      if (formFilled) return
      // 否则重置表单信息
      for (let key in formUser) {
        formUser[key] = ''
      }
    }

    // 定义区分模态框使用者的变量（新增、编辑）
    const occupy = ref('add')

    // 定义编辑用户按钮点击事件回调
    const editHandler = rowData => {
      // 打开模态框
      occupy.value = 'edit'
      dialogVisible.value = true
      // 通过作用域插槽获取所在行的数据scope.row
      rowData.sex = rowData.sex === 1 ? '男' : '女'
      // 由于编辑时点击取消后未更新视图，再次点击新增会看到之前赋值的数据，因此需让取消的复位逻辑生效后，在DOM更新（异步任务）之后马上调用
      proxy.$nextTick(() => {
        // 通过浅拷贝赋值数据到模态框中
        Object.assign(formUser, rowData)
      })
    }

    // 定义新增按钮点击事件回调
    const addHandler = () => {
      // 打开模态框
      occupy.value = 'add'
      dialogVisible.value = true
    }

    // 定义删除按钮点击事件回调
    const deleteHandler = rowData => {
      // 使用所删除用户id发起专门删除用户的get请求
      ElMessageBox.confirm('确认永久删除该用户吗', '提示', {
        type: 'warning',
        icon: markRaw(Warning),
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        confirmButtonClass: 'el-messageBox-confirm',
        cancelButtonClass: 'el-messageBox-cancel'
      })
        .then(async () => {
          await proxy.$api.deleteUser({
            id: rowData.id
          })
          ElMessage({
            showClose: true,
            message: '删除成功！',
            type: 'success'
          })
          // 重新请求数据以更新列表
          getUserData(paramConfig)
        })
        .catch(() => {
          // catch error
        })
    }

    onMounted(() => {
      getUserData(paramConfig)
    })

    return {
      userData,
      tableHead,
      paramConfig,
      changePage,
      formInline,
      searchHandler,
      dialogVisible,
      dialogClose,
      formUser,
      onSubmit,
      resetHandler,
      editHandler,
      addHandler,
      occupy,
      deleteHandler
    }
  }
})
</script>

<style lang="scss">
// 操作栏
.action-contaienr {
  display: flex;
  justify-content: space-between;
  .el-button {
    color: #fff;
  }
}

// 分页器
.el-pagination {
  margin-top: 15px;
  justify-content: center;
  li.is-active {
    background-color: #2cb2c2 !important;
  }
}
.buttons-container {
  .el-button {
    color: #fff;
  }
}
</style>
