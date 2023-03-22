"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8940;
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const RCLisa_1 = require("./RCLisa");
function createServer(rclisa) {
    const server = app.listen(port, () => {
        console.log(`listening at http://localhost:${port}`);
    });
    const io = new socket_io_1.Server(server);
    const DEBUG = true;
    app.use("/", express_1.default.static(path_1.default.join(__dirname, './../server/build')));
    io.on('connection', (socket) => {
        if (rclisa.isConnected) {
            console.log('device already connected');
            socket.emit("error", "Device already connected");
            socket.disconnect();
            return;
        }
        else {
            console.log('connection accepted');
            let device = new RCLisa_1.DeviceConnected('Device', socket.handshake.address);
            rclisa.connect(device);
            socket.on('move', (arg) => {
                console.log('move');
            });
            socket.on('DRAG', (arg) => {
                let a = JSON.parse(arg);
                rclisa.drag(a.deltaX, a.deltaY);
            });
            socket.on('TAP', (arg) => {
                rclisa.click();
            });
            socket.on('TEXT', (arg) => {
                rclisa.type(JSON.parse(arg));
            });
            socket.on('KEY', (arg) => {
                rclisa.key(JSON.parse(arg));
            });
            socket.on('RIGHT_TAP', (arg) => {
                rclisa.rightClick();
            });
            socket.on('SCROLL', (arg) => {
                let obj = JSON.parse(arg);
                rclisa.scroll(obj.deltaX, obj.deltaY);
            });
            socket.on('SEND_VIDEO', (arg) => {
                socket.emit('VIDEO', rclisa.screenShot());
            });
            socket.on('hello', (arg) => {
                console.log(arg);
            });
            //GT_START, GT_STOP, GT_MOVE      
            socket.on('GT_START', (arg) => {
                let { x, y } = JSON.parse(arg);
                rclisa.gtStart(x, y);
            });
            socket.on('GT_STOP', (arg) => {
                rclisa.gtStop();
            });
            socket.on('GT_MOVE', (arg) => {
                let { x, y } = JSON.parse(arg);
                rclisa.gtMove(x, y);
            });
            socket.on('disconnect', () => {
                console.log('disconnected');
                rclisa.disconnect();
            });
        }
    });
}
exports.createServer = createServer;
//# sourceMappingURL=server.js.map