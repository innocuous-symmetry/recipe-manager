import Dropdown from "../models/dropdownValues";
import { DropdownDataType } from "../schemas";
import ControllerResponse from "../util/ControllerResponse";
import { StatusCode } from "../util/types";
const DDInstance = new Dropdown();

export default class DropdownCtl {
    async getMeasurements() {
        try {
            const result = await DDInstance.getMeasurements();
            return new ControllerResponse<any[] | string>(
                ((result !== null) ? StatusCode.OK : StatusCode.NotFound),
                result || "Measurement unit data not found",
                (result !== null)
            );
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getByType(type: DropdownDataType) {
        switch (type) {
            case "measurement":
                const result = await DDInstance.getMeasurements();
                return new ControllerResponse<any[] | string>(
                    ((result !== null) ? StatusCode.OK : StatusCode.NotFound),
                    result || "Measurement unit data not found",
                    (result !== null)
                );
            case "course":
                break;
            default:
                break;
        }
    }
}