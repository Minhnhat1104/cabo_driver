import {useDriverSummary} from '@Home/hook/useDriverSummary';
import {Text, makeStyles, useTheme} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

interface RecentDriveProps {
  style?: StyleProp<ViewStyle>;
}

interface renderItem {
  languageKey: string;
  keyName: string;
  getMapValue?: (value: any) => string;
}

const driverSummaryRender: renderItem[] = [
  {
    languageKey: 'Drives: ',
    keyName: 'totalTrip',
  },
  {
    languageKey: 'Average income per driver: ',
    keyName: 'averageIncomePerDrive',
  },
];

const recentDriveRender: renderItem[] = [
  {
    languageKey: 'Income: ',
    keyName: 'cost',
  },
  {
    languageKey: 'Distance: ',
    keyName: 'distance',
  },
  {
    languageKey: 'Start time: ',
    keyName: 'startTime',
  },
  {
    languageKey: 'End time: ',
    keyName: 'endTime',
  },
  {
    languageKey: 'Pick up time: ',
    keyName: 'pickUpTime',
  },
  {
    languageKey: 'End time: ',
    keyName: 'endTime',
  },
  {
    languageKey: 'Departure location: ',
    keyName: 'driverStartLocation',
  },
  {
    languageKey: 'Destination: ',
    keyName: 'toLocation',
  },
];

const RecentDrive = (props: RecentDriveProps) => {
  const {style} = props;
  const [item, setItem] = useState<any | null>(null);

  const {data} = useDriverSummary();

  useEffect(() => {
    if (data) {
      setItem(data);
    } else {
      setItem(null);
    }
  }, [data]);

  const styles = useStyles();
  const {theme} = useTheme();
  return (
    <View style={[styles.container, style]}>
      {/* driver summary */}
      <View style={styles.driverSummaryContainer}>
        {driverSummaryRender.map((_item: renderItem, i: number) => (
          <View
            key={i}
            style={[
              styles.item,
              i === driverSummaryRender.length - 1 ? {marginBottom: 0} : {},
            ]}>
            <Text style={[styles.languageKey, styles.driverSummaryText]}>
              {_item.languageKey}
            </Text>
            <Text style={[styles.text, styles.driverSummaryText]}>
              {item?.[_item.keyName]}
            </Text>
          </View>
        ))}
      </View>

      {/* drive summary */}
      <View style={[styles.recentDriveContainer, style]}>
        <Text style={styles.recentDriveHeader} h4>
          Recent Driver
        </Text>
        {recentDriveRender.map((_item: renderItem, i: number) => (
          <View
            key={i}
            style={[
              styles.item,
              i === driverSummaryRender.length - 1 ? {marginBottom: 0} : {},
            ]}>
            <Text style={[styles.languageKey]}>{_item.languageKey}</Text>
            <Text style={[styles.text]}>
              {item?.recentTrip?.[_item.keyName]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme, props: any) => ({
  container: {
    width: '100%',
  },
  driverSummaryContainer: {
    // flex: 1,
    backgroundColor: theme.colors.secondary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    color: theme.colors.white,
    padding: 8,
    marginHorizontal: 8,
    marginBottom: 0.5,
  },
  driverSummaryText: {
    color: theme.colors.white,
  },
  recentDriveContainer: {
    width: '100%',
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    borderRadius: 8,
    padding: 9,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  recentDriveHeader: {
    textAlign: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    // backgroundColor: 'blue',
  },
  languageKey: {
    flex: 0.4,
    textAlign: 'left',
    // backgroundColor: 'red',
  },
  text: {
    flex: 0.4,
    textAlign: 'right',
  },
}));

export default RecentDrive;
