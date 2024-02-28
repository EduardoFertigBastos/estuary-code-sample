import React, { useEffect, useState } from 'react';

import { FaRegEye, FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';

import DataTable from 'components/DataTable';

import Toast from 'hooks/toast/Toast';

import api from 'services/api';

import ButtonGroupEnd from 'styles/styled-components/ButtonGroupEnd';
import MainDefault from 'styles/styled-components/MainDefault';

import { Group } from '@prisma/client';
import { useRouter } from 'next/router';
import ModalDelete, { DeleteModalProps } from 'components/modal/ModalDelete';
import Button from 'components/Button';

const ListGroups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [deleteModal, setDeleteModal] = useState<DeleteModalProps>({ open: false });
  const router = useRouter();

  const handleDelete = (id:number) => {
    const toast = new Toast().loading('Deleting group...');

    api.delete(`/groups/${id}`)
      .then(({ data }) => {
        setGroups(groups.filter((group) => group.id !== id));
        toast.success('Group removed with success!');
      })
      .catch((err) => toast.error('Ops! It was not possible to delete the group.'));
  };

  const openDeleteModal = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    const groupFound = groups.find((group) => group.id === id);

    if (!groupFound) {
      return;
    }

    setDeleteModal((prevState: DeleteModalProps) => ({
      open: true,
      id: groupFound.id,
      message: `Are you sure that you want to delete the group - ${groupFound.description}?`,
      execute: () => handleDelete(id),
    }));
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.target.nodeName.toLowerCase() !== 'body') {
        return;
      }

      switch (event.key) {
        case 'Enter':
          router.push('/groups/register');
          break;
        case 'Escape':
          router.push('/dashboard');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOnClickDelete = (e: React.MouseEvent, id: number) => {
    openDeleteModal(e, id);
  };

  useEffect(() => {
    api.get('/groups?order-by=name').then(({ data }) => {
      setGroups(data);
    }).catch((err) => {
      router.replace('/fallback?login=true');
    });
  }, []);

  return (
    <MainDefault>
      <ModalDelete
        data={deleteModal}
        setData={setDeleteModal}
      />
      <ButtonGroupEnd>
        <Button href="/groups/register" color="success" title="Register Group">
          Register
        </Button>
        <Button
          href="/dashboard"
          type="submit"
          color="error"
          title="Go back to the previous page"
        >
          Go Back
        </Button>
      </ButtonGroupEnd>
      <DataTable
        title="Groups"
        data={groups}
        metadata={[
          {
            prop: 'description',
            label: 'Description',
          },
          {
            prop: 'quantityMembers',
            label: 'Members Quantity',
          },
        ]}
        actions={({ id, description }) => (
          <>
            <Button href={`/grupos/${id}/visualizar`} color="info" label="Show" title={`Show group ${description}`}>
              <FaRegEye />
            </Button>

            <Button href={`/grupos/${id}`} color="secondary" label="Edit" title={`Edit group ${description}`}>
              <FiEdit />
            </Button>

            <Button
              label="Deletar"
              onClick={(e) => handleOnClickDelete(e, id)}
              type="button"
              color="error"
              title={`Delete group ${description}`}
            >
              <FaTrash />
            </Button>
          </>
        )}
      />

    </MainDefault>
  );
};

export default ListGroups;
