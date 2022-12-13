import { CtlResponse } from "./types";

export default class ControllerResponse<T> implements CtlResponse<T> {
    ok: boolean
    code: number
    data: T | T[] | string

    constructor(ok: boolean, code: number, data: T | T[] | string) {
        this.ok = ok
        this.code = code
        this.data = data
    }

    send() {
        return { ok: this.ok, code: this.code, data: this.data }
    }
}