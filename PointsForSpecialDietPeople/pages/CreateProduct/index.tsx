import React, { useCallback, useEffect, useState } from 'react';

import { Form  } from '@unform/web';
import { HiTemplate } from 'react-icons/hi';
import { MdOutlineDescription } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import Button from 'components/Button';
import Dropzone from 'components/Form/Dropzone'
import FormBuilder from 'components/Form/FormBuilder';
import IOption from 'components/Form/Select/IOption';
import Title from 'components/Typography/Title';

import { useAuth } from 'hooks/auth';
import { useForm } from 'hooks/form/useForm';
import handleAxiosError from 'hooks/handleAxiosError';
import Toast from 'hooks/toast/Toast';

import IBrand from 'interfaces/entities/IBrand';
import ICategory from 'interfaces/entities/ICategory';
import Product from 'interfaces/entities/IProduct';
import ITypeProduct from 'interfaces/entities/ITypeProduct';
import IImages from 'interfaces/IImages';

import api from 'services/api';
import MultipartDataform from 'services/config/MultipartDataform';

import Mask from 'utils/Mask';

import buildDataToSubmit from './hooks/buildDataToSubmit';
import IProductFormData from './interfaces/IProductFormData';
import { PageCreateProduct } from './styles';
import { schema } from './validation/schema';

import 'react-toastify/dist/ReactToastify.css';


const CreateProduct = () =>
{
    const { id: product_id } = useParams();
    
    const [categories, setCategories] = useState<IOption[]>([]);
    const [typeProducts, setTypeProducts] = useState<IOption[]>([]);
    const [brands, setBrands] = useState<IOption[]>([]);
    const [images, setImages] = useState<IImages[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>();
    const { user } = useAuth();

    const form = useForm({
        fields: [
            {   
                gridSize: {
                    md: 12,
                },
                type: 'text',
                name: 'title',
                label: 'Title',
                placeholder: 'Hamburguer',
                icon: MdOutlineDescription
            }, 
            {
                gridSize: {
                    md: 6,
                },
                type: 'text',
                name: 'price',
                label: 'Price',
                prefix: 'R$',
                placeholder: '10,00',
                mask: Mask.CURRENCY,
            },
            {
                gridSize: {
                    md: 6,
                },
                type: 'select',
                name: 'categories',
                label: 'Category',
                options: categories,
                multiple: true,
                check: true,
                chip: true
            },
            {
                gridSize: {
                    md: 6,
                },
                type: 'select',
                name: 'type_product_id',
                label: 'Product Type',
                check: true,
                options: typeProducts,
            },
            {
                gridSize: {
                    md: 6,
                },
                type: 'select',
                name: 'brand_id',
                label: 'Brand',
                options: brands,
            },
        ],
    });

    const navigate = useNavigate();
    const hasProduct = () => !!product_id;

    const handleCreate = useCallback(
        async (dataForm: IProductFormData) => {
            await api.post(
                '/products', 
                { json: JSON.stringify(dataForm), photos: dataForm.photos}, 
                MultipartDataform
            );

            form.clear();
            setImages([]);
        }, []
    )

    const handleUpdate = useCallback(
        async (dataForm: any) => {
            let photos = dataForm.photos;
            delete dataForm.photos;

            await api.put(`/products/${product_id}`, dataForm)

            if (photos.length > 0) {
                const resPhoto = await api.patch(
                    `/products/${product_id}/photos`, 
                    { photos }, 
                    MultipartDataform
                );

                const resPhotos:String[] = resPhoto.data.photos;
                setImages(
                    resPhotos.map((image, index) => ({
                        src: `${api.getUri()}/uploads/products/${image}`,
                        alt: `Product image - ${index}`
                    }))
                );
            }
        }, []
    )

    const handleResponse = useCallback(
        async (data: any) => {
            const toast = new Toast().loading();
            
            try {
                hasProduct() 
                    ? await handleUpdate(data)
                    : await handleCreate(data);

                toast.success('Data sent successfully!');
            } catch (error: any) {
                const { message } = handleAxiosError(error);
                toast.error(`Ops... ${message}`);      
            }

        }, [hasProduct, handleCreate, handleUpdate]
    )

    const handleSubmit = useCallback(
        async (dataForm: IProductFormData) => {
            dataForm = buildDataToSubmit(dataForm); 
            
            await form.validation(dataForm, {
                schema: !hasProduct() || dataForm.photos.length > 0 
                    ? schema.withPhotos 
                    : schema.withoutPhotos
            });

            handleResponse(dataForm);
        }, [handleResponse, form],
    );

    useEffect(() => {
        Promise.all([
            api.get(`/categories`).then(({ data }) => {   
                setCategories(data.data.map((category: ICategory) => {
                   return  { value: category.id, label: category.description }
                }));
            }),
            api.get(`/brands`).then(({ data }) => {        
                setBrands(data.data.map((brand: IBrand) => {
                    return  { value: brand.id, label: brand.description }
                }));
            }),
            api.get(`/type-products`).then(({ data }) => {        
                setTypeProducts(data.data.map((type: ITypeProduct) => {
                    return  { value: type.id, label: type.description }
                }));
            })
        ]).then(() => {
            if (!hasProduct()) {
                return form.clear();
            }

            api.get(`/products/${product_id}`).then(({ data }) => {        
                const product: Product = data;
                if (String(product.point_id) !== String(user.id)) {
                    navigate('/dashboard');
                }

                form.setData({
                    title:           product.title,
                    price:           Mask.applyMask(product.price, Mask.CURRENCY),
                    categories:      product.categories.map(cat => cat.id),
                    type_product_id: product.type_product.id,
                    brand_id:        product.brand.id
                });

                setImages(
                    product.photos_url.map((image, index) => ({
                        src: `${api.getUri()}/uploads/products/${image}`,
                        alt: `Product Image ${index}`
                    }))
                );
            });
        }); 
    }, []);


    return (
        <PageCreateProduct>
            <Form ref={form.ref} onSubmit={handleSubmit} >
                <Title>Product Registration</Title>

                <Dropzone name='photos' 
                    onFileUploaded={setSelectedFile} 
                    preLoaded={images} 
                    description='Product Image'
                />
                <fieldset className='field-data'>
                    <legend className='legend-fielddata'>
                        <Title variant='h5'>
                            <HiTemplate className='icon-legend'/>
                            Data
                        </Title>
                    </legend>

                    <FormBuilder fields={form.fields}/>                    
                </fieldset>

                <Button type="submit" title="Register Product">Register Product</Button>
            </Form>
        </PageCreateProduct>
    )
}

export default CreateProduct;