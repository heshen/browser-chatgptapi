# browser-chatgptapi

将网页版ChatGPT做成API，

**真实模型，不限字数，支持记忆，无限查询量**


### 实现思路：
一个web服务器，chatgpt网页利用注入脚本与服务器通信，接收查询语句并返回,利用sowebscoekt 协议与服务器进行通信。






- ./ChatGptPagesScripts.js :导入浏览器脚本管理器
- ./run.py web服务
- ./index.html 一个简单的测试页面


### 演示：
![image](https://user-images.githubusercontent.com/71559822/220007238-2b040e5e-1be7-404e-9cc6-3605f862660d.png)





代码比较简单，还有可以完善之处，
