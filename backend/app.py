import aiohttp
from aiohttp import web
import socketio

sio = socketio.AsyncServer(
    cors_allowed_origins="*", async_mode="aiohttp", async_handlers=True
)
app = web.Application()
sio.attach(app, socketio_path="api/socket.io")


async def index(request):
    return web.Response(
        body=aiohttp.JsonPayload({}), content_type="application/json"
    )


@sio.on("join")
async def join(sid, data):
    print("join", data)
    room_id = data["roomId"]
    sio.enter_room(sid, room_id)
    sockets = sio.manager.rooms["/"].get(room_id, [])
    if len(sockets) == 1:
        await sio.emit("init", to=sid)
    elif len(sockets) == 2:
        await sio.emit("ready", room=room_id)
    else:
        await sio.emit("full", to=sid)


@sio.on("signal")
async def handle_signal(sid, data):
    room_id = data["roomId"]

    await sio.emit("signal", data["signal"], room=room_id)


@sio.on("kick")
async def handle_kick(sid, data):
    room_id = data["roomId"]
    await sio.emit("kick", room=room_id, skip_sid=sid)


@sio.on("disconnect")
async def disconnect(sid):
    rooms = sio.rooms(sid)
    for room in rooms:
        sio.leave_room(sid, room)
        await sio.emit("disconnected", room=room)


if __name__ == "__main__":
    web.run_app(app, host="0.0.0.0", port=5000)
