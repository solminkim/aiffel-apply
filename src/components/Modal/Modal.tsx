import { Modal, ModalFuncProps } from 'antd';
// 클릭 핸들러에 바로 눕히세요 onClick={success}
export const successModal = (props: ModalFuncProps) => {
  Modal.success({ centered: true, ...props });
};

export const errorModal = (props: ModalFuncProps) => {
  Modal.error({ centered: true, ...props });
};

export const warningModal = (props: ModalFuncProps) => {
  Modal.warning({ centered: true, ...props });
};

export const confirmModal = (props: ModalFuncProps) => {
  Modal.confirm({ centered: true, ...props });
};
