import createError from 'http-errors';
import { ICourse } from '../schemas';
import Course from '../models/course';
import ControllerResponse from '../util/ControllerResponse';
import { StatusCode } from '../util/types';
const CourseInstance = new Course();

export default class CourseCtl {
    async getAll() {
        try {
            const result = await CourseInstance.getAll();
            const code = (result !== null) ? StatusCode.OK : StatusCode.NotFound;
            return new ControllerResponse(code, (result || "No course data found"));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getOne(id: string) {
        try {
            const result = await CourseInstance.getOne(id);
            const code = (result !== null) ? StatusCode.OK : StatusCode.NotFound;
            return new ControllerResponse(code, (result || "No course found with this ID"))
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async post(data: ICourse) {
        try {
            const result = await CourseInstance.post(data);
            const code = (result !== null) ? StatusCode.NewContent : StatusCode.BadRequest;
            return new ControllerResponse(code, (result || "Something went wrong"));
        } catch (e: any) {
            throw new Error(e);
        }
    }
}