import {Icon, Text, makeStyles, useTheme} from '@rneui/themed';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {dummyData} from './dummyData';
import {convertDateTimeSeverToClient} from '@base/utils/Date';
import {theme} from '@base/theme';
import {useHistory} from '@Home/hook/useHistory';

interface HistoryProps {
  navigation: any;
}

const History = (props: HistoryProps) => {
  const {navigation} = props;
  const {theme} = useTheme();
  const styles = useStyles();

  const {data} = useHistory();

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          padding: 8,
          color: theme.colors.primary,
        }}>
        Lịch sử hoạt động
      </Text>
      <ScrollView style={{flex: 1, width: '100%'}}>
        {data?.map((_item: any, i: number) => (
          <View style={styles.item} key={i}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 32,
                  flex: 1,
                  //   justifyContent: 'space-between',
                  //   width: '100%',
                }}>
                <Icon
                  name="car-sport-outline"
                  type="ionicon"
                  size={24}
                  style={{
                    marginRight: 8,
                    borderWidth: 1,
                    borderRadius: 999,
                    padding: 4,
                  }}
                />

                <View>
                  <View style={styles.itemLineTop}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                      From:{' '}
                    </Text>
                    <Text
                      style={{fontSize: 16, flex: 1}}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {_item?.customerOrderLocation}
                    </Text>
                  </View>
                  <View style={styles.itemLineTop}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>To: </Text>
                    <Text style={{fontSize: 16}}>{_item?.toLocation}</Text>
                  </View>
                  <View style={styles.itemLine}>
                    <Text>
                      {convertDateTimeSeverToClient(
                        Number(_item?.updatedAt),
                        'h:mm A',
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={{fontSize: 16}}>{_item?.cost}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme, props: any) => ({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: theme.colors.divider,
  },
  itemLineTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 35,
  },
  itemLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

export default History;
