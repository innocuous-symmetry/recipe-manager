import { CtlResponse, StatusCode } from "./types";

export default class ControllerResponse<T> implements CtlResponse<T> {
    ok: boolean
    code: StatusCode
    data: T | string

    constructor(code: StatusCode, data: T | string, ok?: boolean) {
        this.code = code
        this.data = data
        this.ok = ok || (this.data !== null)
    }

    send() {
        return { ok: this.ok, code: this.code, data: this.data }
    }
}