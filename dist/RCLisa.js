"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyManager = exports.SecretHash = exports.ServerData = exports.DeviceConnected = exports.RCLisa = void 0;
const NetUtils_1 = require("./NetUtils");
const crypto_1 = require("crypto");
const Enums_1 = require("./Enums");
const robotjs_1 = __importDefault(require("robotjs"));
class RCLisa {
    constructor() {
        /**
         * @type DeviceConnected
         */
        this.device = null;
        /**
         * @type ServerData
         */
        this.server = null;
        this.onDataReceived = () => { };
        this.isConnected = false;
        this.step = 0;
    }
    getStepTitle() {
        switch (this.step) {
            case Enums_1.Step.SelectIP:
                return Enums_1.StepNames[Enums_1.Step.SelectIP];
            case Enums_1.Step.WaitConnection:
                return Enums_1.StepNames[Enums_1.Step.WaitConnection];
            case Enums_1.Step.Connected:
                return Enums_1.StepNames[Enums_1.Step.Connected];
        }
    }
    getStepData() {
        switch (this.step) {
            case Enums_1.Step.SelectIP:
                return this.getAvailableIPs();
            case Enums_1.Step.WaitConnection:
                return this.getQRCodeData();
            case Enums_1.Step.Connected:
                return this.device;
        }
    }
    getAvailableIPs() {
        return (0, NetUtils_1.getNetworkInterfaces)();
    }
    getQRCodeData() {
        let secretHash = new SecretHash(this.server.ip + this.server.port, KeyManager.hashPassword).generate();
        return `http://${this.server.ip}:${this.server.port}/?hash=${secretHash}`;
    }
    setIp(ip) {
        this.server = new ServerData(ip, 8940);
        this.step = Enums_1.Step.WaitConnection;
    }
    disconnect() {
        this.device = null;
        this.isConnected = false;
    }
    /**
     *
     * @param {DeviceConnected} deviceConnected
     */
    connect(deviceConnected) {
        if (this.checkConnection(deviceConnected)) {
            this.device = deviceConnected;
            this.isConnected = true;
        }
    }
    drag(deltaX, deltaY) {
        //get current mouse position
        let mouse = robotjs_1.default.getMousePos();
        //move mouse
        let x = mouse.x + deltaX;
        let y = mouse.y + deltaY;
        console.log(x, y);
        robotjs_1.default.moveMouse(x, y);
    }
    click() {
        robotjs_1.default.mouseClick();
    }
    type(text) {
        robotjs_1.default.typeString(text);
    }
    key(key) {
        try {
            robotjs_1.default.keyTap(key);
        }
        catch (e) { }
    }
    rightClick() {
        robotjs_1.default.mouseClick('right');
    }
    screenShot() {
        let img = robotjs_1.default.screen.capture(0, 0, 20, 20);
        return img.image;
    }
    scroll(deltaX, deltaY) {
        //use page up and page down
        if (deltaY > 0) {
            robotjs_1.default.keyTap('pageup');
        }
        else {
            robotjs_1.default.keyTap('pagedown');
        }
    }
    gtStart(x, y) {
        //x and y are in percentage
        let screenSize = robotjs_1.default.getScreenSize();
        x = screenSize.width * x;
        y = screenSize.height * y;
        robotjs_1.default.moveMouse(x, y);
        robotjs_1.default.mouseToggle('down');
    }
    gtMove(x, y) {
        //x and y are in percentage
        let screenSize = robotjs_1.default.getScreenSize();
        x = screenSize.width * x;
        y = screenSize.height * y;
        robotjs_1.default.moveMouse(x, y);
    }
    gtStop() {
        robotjs_1.default.mouseToggle('up');
    }
    /**
     *
     * @param {DeviceConnected} deviceConnected
     * @param {string} data
     * @returns {boolean}
     * */
    checkConnection(deviceConnected) {
        return true;
    }
}
exports.RCLisa = RCLisa;
class DeviceConnected {
    constructor(name, ip) {
        this.name = name;
        this.ip = ip;
    }
    static FromRowData(rowData) {
        rowData = JSON.parse(rowData);
        return new DeviceConnected(rowData.name, rowData.ip);
    }
}
exports.DeviceConnected = DeviceConnected;
class ServerData {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
    }
}
exports.ServerData = ServerData;
class SecretHash {
    constructor(data, password) {
        this.data = data;
        this.password = password;
    }
    generate() {
        //hash with hmac
        let hmac = (0, crypto_1.createHmac)('sha256', this.password);
        //now use hmac to hash the data
        hmac.update(this.data);
        return hmac.digest('hex');
    }
    check(data) {
        return this.generate() === data;
    }
}
exports.SecretHash = SecretHash;
class KeyManager {
}
exports.KeyManager = KeyManager;
KeyManager.hashPassword = 'vndkhsfbSFNDSJ_@àààò44243243';
//# sourceMappingURL=RCLisa.js.map