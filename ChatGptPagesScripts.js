// ==UserScript==
// @name         ChatGptPagesScripts
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      0.1.0
// @description  try to take over the world!
// @author       You
// @match        https://chat.openai.com/chat*
// ==/UserScript==


(function () {
    'use strict';

    let k = 0;
    console.log(k)


    // 服务器地址
    let server_url = "ws://localhost:8010/server/server"
    //  如果web服务器与脚本运行的客户端不在一个机器上，需要在chrome
    //  中关闭安全检查允许Https+ws这种允许方式
    // 可参考：https://blog.csdn.net/qq_36657291/article/details/111947175


    var ws = new WebSocket(server_url);
    let input_eara = document.querySelector('textarea')
    // 文本框
    let btn = input_eara.nextSibling
    // 发送按钮


    btn.addEventListener('DOMSubtreeModified', function () {
        // 对发送按钮进行监听，可获取一个轮回完成事件
        k += 1
        console.log(k)
        if (k === 6) {
            let aiso = document.querySelectorAll('.markdown');
            let result = aiso[aiso.length - 1].innerText
            console.log(result)
            ws.send(JSON.stringify({msg: result}))
        }
    }, false);


    ws.onmessage = function (event) {
        let lt = JSON.parse(event.data)
        console.log(lt.msg)

        // 向chatgpt发送消息
        input_eara.value = lt.msg;
        input_eara.nextSibling.click();
        k = 0;
    };


})();




