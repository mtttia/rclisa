"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step = exports.StepNames = void 0;
exports.StepNames = {
    0: "Select IP",
    1: "Wait Connection",
    2: "Wait Data"
};
var Step;
(function (Step) {
    Step[Step["SelectIP"] = 0] = "SelectIP";
    Step[Step["WaitConnection"] = 1] = "WaitConnection";
    Step[Step["Connected"] = 2] = "Connected";
})(Step = exports.Step || (exports.Step = {}));
//# sourceMappingURL=Enums.js.map