// ==UserScript==
// @name         New Userscript
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      0.1.0
// @description  try to take over the world!
// @author       You
// @match        https://chat.openai.com/chat*
// ==/UserScript==

(function () {
    'use strict';


    let k = 0;

    function send_to_chatgpt(msg) {

        let input_eara = document.querySelector('textarea')
        input_eara.value = msg;

        input_eara.nextSibling.click();
        k = 0;
    }

    var ws = new WebSocket("ws://127.0.0.1:8010/server/server");

    ws.onmessage = function (event) {
        lt = JSON.parse(event.data)
        console.log(lt.msg)

        let sed_msg = lt.msg

        send_to_chatgpt(sed_msg)
    };


    let input_eara = document.querySelector('textarea')


    let btn = input_eara.nextSibling
    btn.addEventListener('DOMSubtreeModified', function () {
        k += 1
        console.log(k)
        if (k === 6) {
            let aiso = document.querySelectorAll('.markdown');
            let result = aiso[aiso.length - 1].innerText
            ws.send(JSON.stringify({msg: result}))

        }
    }, false);
})();




