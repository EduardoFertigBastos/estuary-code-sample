import * as Yup from 'yup';

const schemaForm = {
    title: Yup.string()
            .required('O título é obrigatório!'),
    price: Yup.string()
            .max(99999)
            .min(0)
            .required('O preço é obrigatório!'),
    categories: Yup.array()
        .min(1, 'A categoria é obrigatório!')
        .required('A categoria é obrigatório!'),
    brand_id: Yup.number()
        .min(1, 'A marca é obrigatória!')
        .required('A marca é obrigatória!'),
    type_product_id: Yup.number()
        .min(1, 'O tipo do produto é obrigatório!')
        .required('O tipo do produto é obrigatório!')
};

export const schema = {
    withPhotos: Yup.object().shape({
        ...schemaForm,
        photos: Yup.array()
            .min(1, 'Informar a foto é obrigatório!')
            .max(5, 'Máximo de 5 fotos!'),
    }),
    withoutPhotos: Yup.object().shape(schemaForm),
}