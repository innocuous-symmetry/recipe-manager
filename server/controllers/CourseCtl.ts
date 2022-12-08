import createError from 'http-errors';
import { ICourse } from '../schemas';
import Course from '../models/course';
const CourseInstance = new Course();

export default class CourseCtl {
    async getAll() {
        try {
            const result = await CourseInstance.getAll();
            if (!result) throw createError('404', 'No cuisines found');
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getOne(id: string) {
        try {
            const result = await CourseInstance.getOne(id);
            if (!result) throw createError('404', 'No cuisine found with id ' + id);
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async post(data: ICourse) {
        try {
            const result = await CourseInstance.post(data);
            if (!result) throw createError('400', 'Bad request');
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }
}