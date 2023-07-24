import React, {ReactNode} from 'react';
import {Dialog, Divider} from '@rneui/themed';
import {View} from 'react-native';

interface DialogCustomProps {
  title?: string;
  Footer?: ReactNode;
  disablePadding?: boolean;
  children: ReactNode;
  visible: boolean;
  onBackdropPress: () => void;
}

const DialogCustom = (props: DialogCustomProps) => {
  const {title, children, visible, onBackdropPress, disablePadding, Footer} =
    props;
  return (
    <Dialog
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      overlayStyle={disablePadding && {padding: 0}}>
      {title && <Dialog.Title title={title} />}
      {children}
      {Footer && (
        <View style={!disablePadding && {marginTop: 8}}>{Footer}</View>
      )}
    </Dialog>
  );
};

export default DialogCustom;
