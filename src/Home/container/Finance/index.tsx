import {Button, Icon, Text, makeStyles, useTheme} from '@rneui/themed';
import React, {useState} from 'react';
import {View} from 'react-native';
import Header from '../Home/Header';
import {getDateRange} from './Helper';
import {usePeriodIncome} from '@Home/hook/usePeriodIncome';
import {useTotalIncome} from '@Home/hook/useTotalIncome';

interface FinanceProps {
  navigation: any;
}

const DETAIL_MONTH = 'month';
const DETAIL_WEEK = 'week';

const Finance = (props: FinanceProps) => {
  const {navigation} = props;
  const {theme} = useTheme();
  const styles = useStyles();

  //state
  const [activeTab, setActiveTab] = useState<
    typeof DETAIL_MONTH | typeof DETAIL_WEEK
  >(DETAIL_MONTH);

  const [curIndex, setCurIndex] = useState<number>(0);
  const {startDate, endDate} = getDateRange(-curIndex, activeTab);

  // hook
  const {data: periodIncomeData} = usePeriodIncome({startDate, endDate});
  console.log('🚀 ~ file: index.tsx:31 ~ periodIncomeData:', periodIncomeData);
  const {data: totalIncomeData} = useTotalIncome();
  console.log('🚀 ~ file: index.tsx:33 ~ totalIncomeData:', totalIncomeData);

  const handleBack = () => {
    setCurIndex(prev => prev - 1);
  };
  const handleNext = () => {
    if (curIndex !== 0) {
      setCurIndex(prev => prev + 1);
    }
  };

  const handleMonth = () => {
    setCurIndex(0);
    setActiveTab(DETAIL_MONTH);
  };
  const handleWeek = () => {
    setCurIndex(0);
    setActiveTab(DETAIL_WEEK);
  };

  return (
    <View style={styles.container}>
      <Header style={{marginBottom: 8}} />

      <View
        style={{
          backgroundColor: '#F7F1E3',
          justifyContent: 'flex-end',
          width: '100%',
          padding: 16,
          borderRadius: 16,
        }}>
        <Text style={{fontSize: 16, textAlign: 'right', fontWeight: 'bold'}}>
          Total income
        </Text>
        <Text style={{fontSize: 32, textAlign: 'right', fontWeight: 'bold'}}>
          {totalIncomeData?.income}
        </Text>
      </View>

      <View
        style={{
          //   justifyContent: 'flex-end',
          width: '100%',
          //   paddingBottom: 16,
        }}>
        <Text style={{fontSize: 32, fontWeight: 'bold'}}>Detail</Text>
        <View style={{flexDirection: 'row'}}>
          <Button
            size="lg"
            type={activeTab === DETAIL_MONTH ? 'solid' : 'outline'}
            containerStyle={{marginRight: 8}}
            onPress={handleMonth}>
            Monthly
          </Button>
          <Button
            size="lg"
            type={activeTab === DETAIL_WEEK ? 'solid' : 'outline'}
            onPress={handleWeek}>
            Weekly
          </Button>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 32,
          paddingVertical: 16,
        }}>
        <Icon
          name="chevron-back-circle-outline"
          type="ionicon"
          //   color={theme.colors.secondary}
          size={40}
          onPress={handleBack}
        />

        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
          {curIndex === 0
            ? `This ${activeTab}`
            : `${Math.abs(curIndex)} ${activeTab} ago`}
        </Text>

        <Icon
          name="chevron-forward-circle-outline"
          type="ionicon"
          //   color={theme.colors.secondary}
          size={40}
          //   disabled={curIndex === 0}
          onPress={handleNext}
        />
      </View>

      <View
        style={{
          backgroundColor: theme.colors.primary,
          justifyContent: 'flex-end',
          width: '100%',
          padding: 16,
          borderRadius: 16,
        }}>
        <Text style={{fontSize: 16, textAlign: 'right', fontWeight: 'bold'}}>
          Period income
        </Text>
        <Text style={{fontSize: 32, textAlign: 'right', fontWeight: 'bold'}}>
          {periodIncomeData?.income}
        </Text>
      </View>
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
    paddingHorizontal: 8,
    paddingVertical: 24,
  },
}));

export default Finance;
