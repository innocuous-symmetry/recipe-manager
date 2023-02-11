export interface CtlResponse<T> {
    ok: boolean
    code: number
    data: T | string
}

export enum StatusCode {
    OK = 200,
    NewContent = 201,
    NoContent = 204,
    NotModified = 304,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    ServerError = 500
}