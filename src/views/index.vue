<template>
  <div class="page">
    <div class="user-fix fix-top">
      <el-text class="mx-1" type="success">
        已发送次数：{{ sendCount }}
        剩余次数：{{ totalCount - sendCount }}
      </el-text>
      <el-button class="user-head-btn" type="primary" :icon="Refresh" @click="handlerResetConv">
        重置会话</el-button>
    </div>
    <!-- 页面消息列表 -->
    <div id="myList">

      <div v-show="item.text" :class="item.role === 'user' ? 'problemList' : 'answerList'" v-for="item in list">
        <img class="listImg" :src="item.avatar" alt="" />
        <div v-html="item.text" class="listText"></div>
        <div class="opt">
          <el-button :icon="CopyDocument" circle @click="hanlderCopy(item)" />
        </div>
      </div>
      <div v-show="loading" class="answerList">
        <img class="listImg" src="@/assets/img/logo.png" alt="" />
        <img class="addin" src="@/assets/img/loading.gif" alt="" />
      </div>
    </div>
    <!-- ------------------------------------------------------ -->
    <!-- 输入框 -->
    <div class="inputbox user-fix">
      <el-input v-model="question" v-bind:readonly="loading" maxlength="1000" tabindex="0"
        :autosize="{ minRows: 1, maxRows: 5 }" type="textarea" :placeholder="placeholder" @keypress="handleEnter" />
      <!-- 发送按钮小飞机 -->
      <div class="btn-send" @click="send">
        <div class="send-view" style="display: flex">
          <svg v-if="question" t="1680762028888" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="1575" width="100" height="100">
            <path
              d="M925.558 97.72c-0.292-0.154-1.582-0.719-4.739-0.719-2.941 0-8.151 0.521-16.343 2.979-36.058 12.923-754.37 270.362-773.606 276.872-0.939 0.318-1.934 0.651-2.974 0.999-6.376 2.134-14.312 4.789-21.199 7.962-4.428 2.04-7.167 3.719-8.829 4.928 17.832 15.715 119.575 97.983 147.656 120.663l564.222-327.071-432.705 429.86 50.076 61.687-0.298 0.242c71.737 87.846 178.502 218.056 196.953 239.206 3.79-4.609 9.658-15.269 13.893-31.349l0.32-1.068c4.197-12.448 271.564-726.894 284.955-762.677 5.193-16.388 2.925-21.894 2.618-22.514z"
              fill="#53AFFD" p-id="1576"></path>
            <path d="M360.942 646.668l-23.209 58.122 1.062-0.53 22.366-57.321z" fill="#53AFFD" p-id="1577"></path>
            <path
              d="M952.158 78.229c-4.725-6.476-13.998-14.195-31.339-14.195-7.7 0-16.304 1.478-26.303 4.516l-0.769 0.254c-7.542 2.703-754.41 270.378-773.445 276.821-0.906 0.307-1.865 0.628-2.868 0.962-20.672 6.918-48.985 16.392-53.687 38.008-1.601 7.358-0.929 18.539 11.361 30.017l0.284 0.257c17.603 15.689 128.736 105.481 152.37 124.56l59.231 227.524 31.165-15.563 0.833 0.333 0.373-0.935 89.425-44.655c39.865 48.793 184.043 225.075 193.933 234.965l0.122 0.056c7.568 7.413 15.352 8.846 20.552 8.846h0.007c12.054 0 22.763-7.486 31.827-22.486 5.649-9.349 10.661-21.497 14.14-34.496 7.164-20.075 188.713-505.43 284.587-761.613l0.259-0.747c7.436-23.193 6.761-40.343-2.058-52.429z m-314.493 805.75c-4.234 16.08-10.103 26.74-13.893 31.349-18.451-21.149-125.216-151.36-196.953-239.206l0.298-0.242-50.076-61.687 432.705-429.86-564.222 327.071c-28.08-22.68-129.823-104.948-147.656-120.663 1.661-1.209 4.401-2.889 8.829-4.928 6.886-3.173 14.823-5.828 21.199-7.962 1.04-0.348 2.035-0.681 2.974-0.999 19.236-6.51 737.548-263.949 773.606-276.872 8.192-2.458 13.402-2.979 16.343-2.979 3.157 0 4.447 0.565 4.739 0.719 0.307 0.62 2.575 6.125-2.617 22.513-13.391 35.783-280.759 750.229-284.955 762.677l-0.321 1.069zM337.733 704.79l23.208-58.122 0.22 0.27 30.678 37.792-58.245 32.857 5.2-13.328-1.061 0.531z m267.594-363.852l-259.134 257.43-2.423 2.408-40.964 102.585-41.809-162.821 344.33-199.602z"
              fill="" p-id="1578"></path>
            <path d="M343.769 600.777l2.423-2.408 259.135-257.431-344.331 199.603 41.808 162.821z" fill="#FFFFFF"
              p-id="1579"></path>
            <path d="M391.84 684.731l-30.679-37.792-22.366 57.321-5.201 13.328z" fill="#1083EA" p-id="1580"></path>
          </svg>

          <svg v-else t="1680762028888" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="1575" width="100" height="100">
            <path
              d="M925.558 97.72c-0.292-0.154-1.582-0.719-4.739-0.719-2.941 0-8.151 0.521-16.343 2.979-36.058 12.923-754.37 270.362-773.606 276.872-0.939 0.318-1.934 0.651-2.974 0.999-6.376 2.134-14.312 4.789-21.199 7.962-4.428 2.04-7.167 3.719-8.829 4.928 17.832 15.715 119.575 97.983 147.656 120.663l564.222-327.071-432.705 429.86 50.076 61.687-0.298 0.242c71.737 87.846 178.502 218.056 196.953 239.206 3.79-4.609 9.658-15.269 13.893-31.349l0.32-1.068c4.197-12.448 271.564-726.894 284.955-762.677 5.193-16.388 2.925-21.894 2.618-22.514z"
              fill="#bfbfbf" p-id="1576"></path>
            <path d="M360.942 646.668l-23.209 58.122 1.062-0.53 22.366-57.321z" fill="#bfbfbf" p-id="1577"></path>
            <path
              d="M952.158 78.229c-4.725-6.476-13.998-14.195-31.339-14.195-7.7 0-16.304 1.478-26.303 4.516l-0.769 0.254c-7.542 2.703-754.41 270.378-773.445 276.821-0.906 0.307-1.865 0.628-2.868 0.962-20.672 6.918-48.985 16.392-53.687 38.008-1.601 7.358-0.929 18.539 11.361 30.017l0.284 0.257c17.603 15.689 128.736 105.481 152.37 124.56l59.231 227.524 31.165-15.563 0.833 0.333 0.373-0.935 89.425-44.655c39.865 48.793 184.043 225.075 193.933 234.965l0.122 0.056c7.568 7.413 15.352 8.846 20.552 8.846h0.007c12.054 0 22.763-7.486 31.827-22.486 5.649-9.349 10.661-21.497 14.14-34.496 7.164-20.075 188.713-505.43 284.587-761.613l0.259-0.747c7.436-23.193 6.761-40.343-2.058-52.429z m-314.493 805.75c-4.234 16.08-10.103 26.74-13.893 31.349-18.451-21.149-125.216-151.36-196.953-239.206l0.298-0.242-50.076-61.687 432.705-429.86-564.222 327.071c-28.08-22.68-129.823-104.948-147.656-120.663 1.661-1.209 4.401-2.889 8.829-4.928 6.886-3.173 14.823-5.828 21.199-7.962 1.04-0.348 2.035-0.681 2.974-0.999 19.236-6.51 737.548-263.949 773.606-276.872 8.192-2.458 13.402-2.979 16.343-2.979 3.157 0 4.447 0.565 4.739 0.719 0.307 0.62 2.575 6.125-2.617 22.513-13.391 35.783-280.759 750.229-284.955 762.677l-0.321 1.069zM337.733 704.79l23.208-58.122 0.22 0.27 30.678 37.792-58.245 32.857 5.2-13.328-1.061 0.531z m267.594-363.852l-259.134 257.43-2.423 2.408-40.964 102.585-41.809-162.821 344.33-199.602z"
              fill="#bfbfbf" p-id="1578"></path>
            <path d="M343.769 600.777l2.423-2.408 259.135-257.431-344.331 199.603 41.808 162.821z" fill="#bfbfbf"
              p-id="1579"></path>
            <path d="M391.84 684.731l-30.679-37.792-22.366 57.321-5.201 13.328z" fill="#bfbfbf" p-id="1580"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script  setup>
import { ref, watch } from "vue";
import { Cloud } from "laf-client-sdk";
import { ElMessage } from "element-plus";
import { CopyDocument, Refresh } from "@element-plus/icons-vue";
// 将marked 引入
import axios from "axios";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import userIcon from "@/assets/img/avatar.png";
import chatIcon from "@/assets/img/logo.png";

const URLMAPS = {
  send: `https://j6cbnp.laf.dev/send`,
}

const cloud = new Cloud({
  baseUrl: "https://j6cbnp.laf.dev",
  timeout: 60000,
});


//========================== data =================================
//消息列表
const list = ref([
]);
//输入框绑定消息
const question = ref("");
//判断消息是否为空
const parentMessageId = ref("");
//获取消息loading
const loading = ref(false);
//判断设备
const isMobile = ref(false);
//输入框提示
const placeholder = ref("输入你的指令");
// 消息发送次数
const totalCount = ref(0);
const sendCount = ref(0);

// ======================= create =============================
// 判断是否为移动设备
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  isMobile.value = true;
} else {
  placeholder.value = "输入你的指令（Shift + Enter = 换行,Enter = 发送）";
}

// ======================= function =============================

// 获取剩余次数 以及 总次数
async function getUserCount() {
  // 读取缓存手机号
  const userPhone = localStorage.getItem('C-USER_PHONE')
  const devicePoint = localStorage.getItem('C-USER_FINGER')
  const res = await cloud.invoke("get-count", { phone: userPhone, deviceid: devicePoint });
  // 手机号需要后台手动添加到数据库 并且和第一次绑定的设备一致 设备指纹
  totalCount.value = res.total
  sendCount.value = res.send
}

//发送消息
async function send() {
  if (sendCount.value == totalCount.value) {
    ElMessage({
      message: '次数已经用完！',
      offset: 240,
      type: 'warning',
    })
    return;
  }
  //判断是否回复
  if (loading.value) return;
  const message = question.value;
  if (message == "") {
    ElMessage({
      message: '问题不能为空！',
      offset: 240,
      type: 'warning',
    })
    return;
  }
  list.value.push({
    text: question.value,
    avatar: userIcon,
    role: "user"
  });
  //定位页面位置
  setScreen();

  question.value = "";
  loading.value = true;
  let res;
  try {
    const md = new MarkdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              "</code></pre>"
            );
          } catch (__) { }
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>";
      },
    });

    list.value.push({
      text: "",
      avatar: chatIcon,
      role: "assistant"
    });

    const obj = { message };
    if (parentMessageId.value) obj.parentMessageId = parentMessageId.value;

    axios({
      url: URLMAPS.send,
      method: "post",
      data: obj,
      responseType: "text",
      headers: {
      },
      onDownloadProgress: function (progressEvent) {
        const xhr = progressEvent.event.target;
        const { responseText } = xhr;
        const parts = JSON.parse(responseText)
        parentMessageId.value = parts.parentMessageId;
        list.value[list.value.length - 1].text = md.render(parts.text);
        loading.value = false;
        setScreen();
      },
    }).then(() => {
      sendCount.value++
    }).catch((err) => {
      loading.value = false;
      list.value.push({
        text: "出错了，请重试！",
        avatar: chatIcon,
      });
      setScreen();
    })
    // 返回 id 并保存
  } catch (error) {
    loading.value = false;
    list.value.push({
      text: "出错了，请重试！",
      avatar: chatIcon,
    });
    setScreen();
    return;
  }
}

//定位页面位置
function setScreen() {
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 0);
}

//发送消息适配PC或phone
function handleEnter(e) {
  if (e.key === "Enter" && !isMobile.value && !e.shiftKey) {
    send();
  }
}

// 重置会话
function handlerResetConv() {
  list.value = []
  parentMessageId.value = ''
}

// copy 复制
function hanlderCopy(evt) {
  const plainText = evt.text.replace(/<[^>]+>/g, '');
  // 创建一个临时textarea元素
  const temp = document.createElement('textarea');
  // 将要复制的文本设置为textarea的值
  temp.value = plainText;
  // 将textarea添加到DOM中
  document.body.appendChild(temp);
  // 选择textarea，并执行复制命令
  temp.select();
  document.execCommand('copy');
  // 删除临时textarea元素
  document.body.removeChild(temp);
  ElMessage({
    message: '复制成功',
    offset: 240,
    type: 'success',
  })
}


</script>
<style scoped>
.page {
  position: relative;
  height: 100vh;
  overflow-y: auto;
  padding: 40px 0;
}

.user-head-btn {
  margin-left: 40px;
}

.icon {
  width: 32px;
  height: 32px;
}

.defbut {
  position: fixed;
  right: 2px;
  bottom: 152px;
}

.btn-send {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;

}

.btn-send:hover {
  cursor: pointer;
  opacity: 0.85;
}

.text {
  position: absolute;
  top: 50px;
  border: 1px solid #e5e5e5;
  height: 60px;
  padding: 15px 10px;
  width: 90%;
}

#myList {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0px 0 60px 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.problemList {
  display: flex;
  padding: 20px 18px;
}

.problemList .listText {
  background: #c1d4b8;
}

.answerList {
  position: relative;
  padding: 20px 18px;
  font-size: 15px;
  display: flex;
  overflow-x: auto;
  white-space: pre-wrap;
}

.answerList .listText {
  background: #89D961;
}

.opt {
  margin-left: 10px;
}


.listImg {
  margin-top: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.listText {
  margin-left: 20px;
  max-width: 100%;
  white-space: pre-wrap;
  padding: 10px;
  border-radius: 10px;
}

.inputbox {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  margin: auto;
  width: 90%;
  min-height: 80px;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
}

.pre {
  white-space: pre-wrap;
  text-indent: 2em;
  word-wrap: break-word;
  padding: 0 0 10% 0;
}

.inputbox button {
  margin-left: 15px;
  width: 56px;
  height: 82%;
  border-radius: 6px;
  border: 0;
  background: silver;
  color: #333;
  font-size: 14px;
  outline: none;
}

.inputbox button:hover {
  cursor: pointer;
  opacity: 0.8;
}

.addin {
  margin: 10px 20px;
  width: 30px;
  height: 30px;
}

.steppingstone {
  width: 100%;
  height: 160px;
}

.user-fix {
  position: fixed;
  z-index: 100;
  background-color: #fff;
  width: 100%;
  padding: 10px;
}

.fix-top {
  top: 0;
}

.fix-bottom {
  bottom: 0;
}
</style>