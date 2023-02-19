from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(
    docs_url='/'
)

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

socket_manager = dict()

wait = False


async def sendto_server(data):
    global wait
    if not wait:
        wait = True
        await socket_manager['server'].send_json(data)
    else:
        return True


async def sendto_user(data):
    global wait
    await socket_manager['user'].send_json(data)
    wait = False


@app.websocket("/server/{server}")
async def websocket_endpoint(websocket: WebSocket, server: str):
    ws = websocket
    await ws.accept()

    socket_manager['server'] = ws
    # if not websocket.headers.get('x-user-type') == 'server':
    #     await ws.send_json({"message": "这个接口只供服务端连接"})
    #     await ws.close(code=882)

    if socket_manager.get('user'):
        await sendto_user({'msg': '服务端加入成功'})

    try:
        while True:
            data = await websocket.receive_json()

            print(data)
            if not socket_manager.get('user'):
                await ws.send_json({'msg': '客户端未加入'})
            else:
                await sendto_user(data)

    except WebSocketDisconnect:
        await ws.close()
        socket_manager['server'] = None


@app.websocket("/user/{user}")
async def websocket_endpoint(websocket: WebSocket, user: str):
    ws = websocket
    await ws.accept()
    socket_manager['user'] = ws
    await ws.send_json({'msg': '连接成功'})

    try:
        while True:
            data = await ws.receive_json()
            print(data)
            if not socket_manager.get('server'):
                await ws.send_json({'msg': '服务端未加入'})
            else:
                result = await sendto_server(data)
                if result:
                    await ws.send_json({'msg': '请等待上一条消息返回'})

    except WebSocketDisconnect:
        await ws.close()


if __name__ == "__main__":
    import uvicorn

    # 官方推荐是用命令后启动 uvicorn main:app --host=127.0.0.1 --port=8010 --reload
    uvicorn.run('run:app', host='127.0.0.1', port=8010, reload=True, debug=True)
