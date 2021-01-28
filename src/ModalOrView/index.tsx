import React, {FC, ComponentType, useMemo} from 'react';
import {useHistory} from 'react-router';
import {Modal, Spin} from 'antd';
import Panel from '../Panel';
import {ModalProps} from 'antd/lib/modal';
import {History} from 'history';

export type Mode = 'view' | 'modal';

export interface ModalOrViewProps extends ModalProps {
  mode?: Mode;
  loading?: boolean;
  ModalComponent?: ComponentType<ModalProps>;
}

export const useHandleCancel = (params: {
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  history?: History;
}) => {
  const {onCancel, history} = params;
  return useMemo(
    () =>
      onCancel ||
      ((e: React.MouseEvent<HTMLElement>) => {
        history?.goBack();
      }),
    [onCancel, history]
  );
};

const ModalOrView: FC<ModalOrViewProps> = function ModalOrView(props) {
  const {mode, ModalComponent, children, loading, ...modalProps} = props;
  const history = useHistory();
  const {onCancel, ...restProps} = modalProps || {};
  const handleCancel = useHandleCancel({onCancel, history});
  if (mode === 'view') {
    return (
      <Panel {...restProps} loading={loading} onCancel={handleCancel}>
        {children}
      </Panel>
    );
  }
  if (ModalComponent) {
    return (
      <ModalComponent
        {...restProps}
        visible={true}
        maskClosable={false}
        onCancel={handleCancel}>
        <Spin spinning={loading}>{children}</Spin>
      </ModalComponent>
    );
  }
  return null;
};

ModalOrView.defaultProps = {
  ModalComponent: Modal,
  mode: 'view',
  loading: false
};

export default ModalOrView;
