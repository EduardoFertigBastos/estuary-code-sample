import React from 'react';

import DataTable from 'components/DataTable';

import ICategory from 'interfaces/entities/ICategory';

import Mask from 'utils/Mask';

import { MainDefault } from 'styles/styled-components/MainDefault';

import { useProducts } from './hooks/useProducts';

const ListProducts: React.FC = () => {
  const products = useProducts();

  return (
    <MainDefault>
      <DataTable
        title="Products"
        data={products}
        metadata={[
          {
            prop: 'id',
            label: 'Códe',
            primaryKey: true,
            numeric: true
          }, 
          {
            prop: 'title',
            label: 'Title'
          },
          {
            prop: 'price',
            label: 'Price ($)',
            numeric: true,
            mask: value => Mask.applyMask(value, Mask.CURRENCY)
          },
          {
            prop: 'brand.description',
            label: 'Brand'
          },
          {
            prop: 'type_product.description',
            label: 'Product Type'
          },
          {
            prop: 'categories',
            label: 'Category',
            mask: value => value.map((category: ICategory) => category.description).join(', ')
          },
        ]}
      />

    </MainDefault>
  );
};

export default ListProducts;
