import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader className="text-black">{title}</DialogHeader>
      <DialogBody>{children}</DialogBody>
    </Dialog>
  );
};

export default Modal;