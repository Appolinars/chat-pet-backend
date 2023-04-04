"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(model) {
        this._id = model._id;
        this.username = model.username;
        this.email = model.email;
        this.avatar = model.avatar;
    }
}
exports.UserDto = UserDto;
