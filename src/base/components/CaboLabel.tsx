import {Text, makeStyles} from '@rneui/themed';
import React from 'react';

const CaboLabel = () => {
  const styles = useStyles();
  return <Text style={styles.title}>Cabo</Text>;
};

const useStyles = makeStyles((theme, props: any) => ({
  title: {
    fontSize: 30,
    color: theme.colors.primary,
    textAlign: 'center',
  },
}));

export default CaboLabel;
