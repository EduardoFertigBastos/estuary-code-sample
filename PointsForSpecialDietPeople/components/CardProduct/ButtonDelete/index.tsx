import React, { useState } from 'react';

import { AxiosError } from 'axios';
import { AiFillDelete } from 'react-icons/ai';
import { BsExclamationLg } from 'react-icons/bs';

import Toast from 'hooks/toast/Toast';

import api from '../../../services/api';

import { Container } from './styles';


interface IButtonProps {
  id: number;
  cardDeleted: (deleted: boolean) => void;
}
const ButtonDelete: React.FC<IButtonProps> = ({ id, cardDeleted, ...rest }) => {
  
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!confirmDelete) {
      return setConfirmDelete(true);
    }

    const toast = new Toast().loading();

    api.delete(`/products/${id}`).then(async ({ data }) => {

      cardDeleted(true);
      toast.success('Produto deletado com sucesso!', { autoClose: 1000 });
  
    }).catch((error: AxiosError) => {
      toast.error('Ops... Não foi possível deletar o produto!')                
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setConfirmDelete(false);
  };

  return (
    <>
      <Container onClick={handleClick} onMouseLeave={handleMouseLeave}>
        { confirmDelete 
            ? <BsExclamationLg /> 
            : <AiFillDelete />
        }
      </Container>
    </>
    
  );
}
export default ButtonDelete;
