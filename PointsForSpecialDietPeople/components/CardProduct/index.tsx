import React, { useState } from 'react';

import IProduct from 'interfaces/entities/IProduct';

import api from '../../services/api';

import ButtonDelete from './ButtonDelete';
import { Card, CardButton, CardContent, CardDescription, CardImage, CardTitle, ImageContent, Img, Overlay } from './styles';


interface ICardProductProps {
  product: IProduct;
  deleteButton?: boolean;
}

const CardProduct: React.FC<ICardProductProps> = ({ product, deleteButton = false, ...rest }) => {
  const urlPhoto = product.photos_url.length > 0
    ? `${api.getUri()}/uploads/products/${product.photos_url[0]}`
    : '';

  const [deleted, setDeleted] = useState(false);

  return (
    <Card isVisible={!deleted}>
      <ImageContent>
        <Overlay />
        {
          deleteButton && 
          <ButtonDelete id={product.id} cardDeleted={setDeleted}/>
        }
        <CardImage>
          <Img src={urlPhoto}/>
        </CardImage>
      </ImageContent>
      <CardContent>

        <CardTitle>
          {product.title}
        </CardTitle>
        <CardDescription>
          {product.categories.map(category => category.description).join(', ')}
          <br />
          {product.type_product.description} - {product.brand.description}
          <br />
          R$ {product.price}
        </CardDescription>
        <CardButton to={`/product/${product.id}`}>
          Ver Mais
        </CardButton>
      </CardContent>
        
    </Card>
  );
}
export default CardProduct;
