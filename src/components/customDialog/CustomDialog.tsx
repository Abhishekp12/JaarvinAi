import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

interface DialogPopupProps {
  open: boolean;
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const CustomDialog: React.FC<DialogPopupProps> = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {/* Dialog Title */}
      <DialogTitle>{title}</DialogTitle>

      {/* Dialog Content */}
      <DialogContent>{content}</DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {cancelText}
        </Button>
        {onConfirm && (
          <Button
            onClick={onConfirm}
            variant="contained"
            color="primary"
          >
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
