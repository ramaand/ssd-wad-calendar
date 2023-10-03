import { useState } from 'react'

import useDateActivities from '~/hooks/useDateActivities'
import useDeleteDialog from '~/hooks/useDeleteDialog'

import Dialog from './Dialog'

const DeleteDialog = () => {
  const deleteDialog = useDeleteDialog();
  const { removeActivity } = useDateActivities();

  const [isLoading, setIsLoading] = useState(false);

  const bodyContent = (
    <div className="text-center text-zinc-500">
      Apakah kamu yakin menghapus &quot;{deleteDialog?.detail?.activity?.name}
      &quot;?
    </div>
  );

  const onSubmit = () => {
    try {
      setIsLoading(true);
      removeActivity(
        deleteDialog?.detail?.selectedDate,
        deleteDialog?.detail?.index
      );
      deleteDialog.onClose();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <Dialog
      disabled={isLoading}
      isOpen={deleteDialog.isOpen}
      title="Konfirmasi Hapus"
      actionLabel="Hapus"
      secondaryActionLabel="Batal"
      secondaryAction={deleteDialog.onClose}
      onSubmit={() => onSubmit()}
      body={bodyContent}
    ></Dialog>
  );
};

export default DeleteDialog;
