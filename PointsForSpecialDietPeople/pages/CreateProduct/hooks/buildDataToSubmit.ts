import Mask from "utils/Mask";

import IProductFormData from "../interfaces/IProductFormData";

export default function buildDataToSubmit (dataForm: IProductFormData)  {
    return {
        ...dataForm,
        price: Mask.removeMask(dataForm.price, Mask.CURRENCY),
    };
}