import DialogCustom from '@base/components/DialogCustom';
import {moneyFormat} from '@base/utils/Helper';
import {Button, Divider, Icon, Text, makeStyles, useTheme} from '@rneui/themed';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import CustomerInfo from './CustomerInfo';

interface IcomingDriveDialogProps {
  visible: boolean;
  onBackdropPress: () => void;
}

const IcomingDriveDialog = (props: IcomingDriveDialogProps) => {
  const {visible, onBackdropPress} = props;

  const styles = useStyles();
  const {theme} = useTheme();

  const Footer = useMemo(() => {
    return (
      <Button
        containerStyle={{borderRadius: 0}}
        buttonStyle={{borderRadius: 0}}
        size="lg">
        Accept
      </Button>
    );
  }, []);

  return (
    <DialogCustom
      //   title="Icoming Drive"
      visible={visible}
      onBackdropPress={onBackdropPress}
      Footer={Footer}
      disablePadding>
      <CustomerInfo />

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>0.0km</Text>
        </View>
        <Divider orientation="vertical" style={{backgroundColor: '#ccc'}} />
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>{moneyFormat(20000)}</Text>
        </View>
      </View>
      {/* Body */}
      <View style={styles.bodyContainer}>
        <View style={styles.bodyItem}>
          <Text style={styles.bodyTextTitle}>130 Đất thánh</Text>
          <Text style={styles.bodyTextDetail}>
            130 Đất thành, Quận 6, Tân Bình, Hồ Chí Minh, Việt Nam
          </Text>
        </View>

        {/* Divider */}
        <View style={{position: 'relative', width: '100%', zIndex: 1}}>
          <Divider />
          <View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{translateX: -20}, {translateY: -20}],
              //   width: 50,
              //   height: 50,
              backgroundColor: theme.colors.primary,
              borderRadius: 99,
              padding: 4,
            }}>
            <Icon
              name="caret-down-outline"
              type="ionicon"
              color={theme.colors.white}
              style={{
                position: 'relative',
                top: 1,
              }}
              size={30}
            />
          </View>
        </View>

        <View style={[styles.bodyItem, styles.bodyItem2]}>
          <Text style={styles.bodyTextTitle}>Big C miền đông</Text>
          <Text style={styles.bodyTextDetail}>
            216 Tô Hiến Thành, Quận 6, Tân Bình, Hồ Chí Minh, Việt Nam
          </Text>
        </View>
      </View>
    </DialogCustom>
  );
};

const useStyles = makeStyles((theme, props: any) => ({
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  headerItem: {
    flex: 0.5,
    backgroundColor: theme.colors.grey5,
    textAlign: 'center',
  },
  headerText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
  bodyContainer: {
    width: '100%',
    display: 'flex',
    // flexDirection: 'row',
  },
  bodyItem: {
    width: '100%',
    padding: 24,
  },
  bodyItem2: {
    backgroundColor: theme.colors.grey5,
  },
  bodyTextTitle: {
    fontSize: 24,
    textAlign: 'center',
  },
  bodyTextDetail: {
    fontSize: 14,
    textAlign: 'center',
  },
}));

export default IcomingDriveDialog;
