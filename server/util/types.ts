export interface CtlResponse<T> {
    ok: boolean
    code: number
    data: T | T[] | string
}