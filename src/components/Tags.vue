<template>
  <div class="tag-container">
    <el-tag v-for="(tag, index) in tags" :key="tag.name" :closable="tag.name !== 'home'" :effect="$route.name === tag.name ? 'dark' : 'plain'" @click="changeMenu(tag)" @close="closeTag(tag, index)">{{ tag.label }} </el-tag>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    // 获取vuex中的tag数组
    const tags = store.state.tagList

    // 定义tag点击事件
    const changeMenu = tag => {
      router.push({
        name: tag.name
      })
    }

    // 定义tag关闭事件
    const closeTag = (tag, index) => {
      // 获取tagLIst数组最后一项索引
      const lastIndex = tags.length - 1
      // 提交mutation删除tag
      store.commit('closeTag', tag)
      //  删除标签后需确保标签路由功能正确
      // 若所删除tag不是当前页面路由，则不作任何处理
      if (tag.name !== route.name) return
      // 若删除tag为当前页面路由，即其索引为最后一个，则让页面路由先前一个tag跳转
      // 注意此时数组已删除完毕，长度已改变，因此需提前保存数组长度
      if (index === lastIndex) {
        router.push({
          name: tags[index - 1].name
        })
      } else {
        // 若不为最后一个tag，则跳转至它的下一个
        router.push({
          name: tags[index].name
        })
      }
    }
    return {
      tags,
      changeMenu,
      closeTag
    }
  }
}
</script>

<style lang="scss">
.tag-container {
  margin-bottom: 15px;

  cursor: pointer;
  .el-tag {
    margin-right: 10px;
  }
}
</style>
