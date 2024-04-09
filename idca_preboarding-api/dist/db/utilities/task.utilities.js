"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareTasksBasicDetails = exports.compareTaskFieldBasicDetails = void 0;
const _ = __importStar(require("lodash"));
exports.compareTaskFieldBasicDetails = (field1, field2) => {
    return (_.isEqual(field1.fieldID, field2.fieldID) &&
        _.isEqual(field1.fieldType, field2.fieldType) &&
        _.isEqual(field1.fieldLabel, field2.fieldLabel) &&
        _.isEqual(field1.fieldContent, field2.fieldContent));
};
exports.compareTasksBasicDetails = (task1, task2) => {
    const taskDiff = {};
    [
        'taskID',
        'templateID',
        'taskVersion',
        'duration',
        'taskType',
        'taskName',
        'mandatory',
    ]
        .map((f) => ({ f, old: task1[f], new: task2[f] }))
        .filter((t) => !_.isEqual(t.old, t.new))
        .filter((t) => !((t.old === undefined && t.new === null) ||
        (t.new === undefined || t.old === null)))
        .forEach((t) => {
        taskDiff[t.f] = { old: t.old, new: t.new };
    });
    const unchangedTaskFields = _.intersectionWith(task1.fields, task2.fields, exports.compareTaskFieldBasicDetails);
    const changedTask1Fields = _.differenceWith(task1.fields, unchangedTaskFields, exports.compareTaskFieldBasicDetails);
    const changedTask2Fields = _.differenceWith(task2.fields, unchangedTaskFields, exports.compareTaskFieldBasicDetails);
    if (_.size(changedTask1Fields) || _.size(changedTask2Fields)) {
        taskDiff.field = {
            old: changedTask1Fields,
            new: changedTask2Fields,
        };
    }
    return {
        taskDiff,
        unchangedTaskFields,
        changedTask1Fields,
        changedTask2Fields,
    };
};
//# sourceMappingURL=task.utilities.js.map