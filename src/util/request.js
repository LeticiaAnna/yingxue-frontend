import axios from 'axios'

//创建默认实例
const instance = axios.create({
  baseURL:"http://localhost:9999/yingx",
  timeout:3000,

})

instance.interceptors.request.use(config=>{
  let token = localStorage.getItem("token");

  if (config.url.indexOf("/login")!=-1) // 是登录
    return config;

  if (config.url.indexOf("?")!=-1) // 访问网址中已有参数需要&连接参数
    config.url+="&token="+token
  else   // 访问网址中已有参数需要?连接参数
    config.url+="?token="+token
  return config;
})


//暴露实例
export default instance;
