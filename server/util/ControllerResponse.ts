import { CtlResponse, StatusCode } from "./types";

export default class ControllerResponse<T> implements CtlResponse<T> {
    ok: boolean
    code: StatusCode
    data: T | string

    constructor(ok: boolean, code: StatusCode, data: T | string) {
        this.ok = ok
        this.code = code
        this.data = data
    }

    send() {
        return { ok: this.ok, code: this.code, data: this.data }
    }
}