import {Button, makeStyles, useTheme} from '@rneui/themed';
import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

interface ClockButtonsProps {
  [x: string]: any;
  style?: StyleProp<ViewStyle>;
}

const ClockButtons = (props: ClockButtonsProps) => {
  const {style} = props;
  const styles = useStyles();
  const {theme} = useTheme();
  return (
    <View style={[styles.container, style]}>
      <Button
        size="lg"
        containerStyle={[
          styles.button,
          {
            marginRight: 16,
          },
        ]}>
        Check in
      </Button>
      <Button
        size="lg"
        containerStyle={[styles.button]}
        buttonStyle={{
          backgroundColor: '#ccc',
        }}>
        Check out
      </Button>
    </View>
  );
};

const useStyles = makeStyles((theme, props: any) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 16,
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
    width: '100%',
  },
  button: {
    flex: 0.5,
  },
}));

export default ClockButtons;
