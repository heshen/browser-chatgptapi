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

    console.log(k)

    var ws = new WebSocket("ws://localhost:8010/server/server");

    let input_eara = document.querySelector('textarea')
    let btn = input_eara.nextSibling

    btn.addEventListener('DOMSubtreeModified', function () {
        k += 1
        console.log(k)
        if (k === 6) {
            let aiso = document.querySelectorAll('.markdown');
            let result = aiso[aiso.length - 1].innerText

            console.log(result)
            ws.send(JSON.stringify({msg: result}))

        }
    }, false);


    function send_to_chatgpt(msg) {


        input_eara.value = msg;
        input_eara.nextSibling.click();
        k = 0;
    }


    ws.onmessage = function (event) {
        let lt = JSON.parse(event.data)
        console.log(lt.msg)
        let sed_msg = lt.msg
        send_to_chatgpt(sed_msg)
    };


})();




