import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Constants from '../utils/Constants';
import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SummaryScreen() {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [totalMamaMilk, setTotalMamaMilk] = useState(0);
  const [totalFormulaMilk, setTotalFormulaMamaMilk] = useState(0);
  const [totalSleepTime, setTotalSleepTime] = useState(0);

  const fetchData = async (timestamp) => {
    const response = await fetch(
      `http://192.168.1.17:8180/api/v1/public/activities?timestamp=${timestamp}`,
    );
    const jsonData = await response.json();
    console.log(jsonData);
    setItems(jsonData.data);
  };

  useEffect(() => {
    let timestamp = new Date().getTime() / 1000;
    console.log(timestamp);
    fetchData(parseInt(timestamp, 10));
  }, []);

  useEffect(() => {
    if (!refresh) return;
    let timestamp = new Date().getTime() / 1000;
    console.log(timestamp);
    fetchData(parseInt(timestamp, 10));
  }, [refresh]);

  // Calculate summary index
  useEffect(() => {
    if (!items) return;
    let mamaMilk = 0;
    let formulaMilk = 0;
    let totalSleepTime = 0;

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.activity === Constants.action.EAT.type) {
        if (item.isMamaMilk) {
          mamaMilk += item.volume;
        } else {
          formulaMilk += item.volume;
        }
      } else if (
        item.activity === Constants.action.SLEEP.type &&
        item.status === Constants.actionStatus.ACTIVE
      ) {
        totalSleepTime += item.endTime - item.startTime;
      }
    }

    setTotalMamaMilk(mamaMilk);
    setTotalFormulaMamaMilk(formulaMilk);
    setTotalSleepTime(totalSleepTime);
  }, [items]);

  const _onRefresh = () => {
    resetStates();
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 200);
  };

  const resetStates = () => {
    setItems([]);
  };

  const _renderItem = ({item}) => (
    <ListItem
      time={format(
        new Date(item.createdOn * 1000),
        Constants.dateFormat.dateTime,
      )}
      activityDesc={item.activityDesc}
      moreDetail={
        item.activity === Constants.action.EAT.type
          ? item.isMamaMilk
            ? `${item.volume} ml sữa mẹ`
            : `${item.volume} ml sữa công thức`
          : null
      }
    />
  );

  const convertSecondToHour = (seconds) => {
    let helperDate = new Date(0).getTime() / 1000 + seconds - 25200; // Minus 7 hours because of timezone
    return format(new Date(helperDate * 1000), 'HH:mm:ss');
  };

  return (
    <View style={{backgroundColor: Constants.colors.backgroundColor}}>
      <View
        style={{
          backgroundColor: Constants.colors.darkBlue,
          height: '25%',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <SummaryContent
          content={'Lịch sử'}
          title={format(new Date(), Constants.dateFormat.date)}
          contentStyle={{fontSize: 18, fontWeight: 'normal'}}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <SummaryContent
            content={totalMamaMilk}
            unit={'ml'}
            title={`Tổng sữa mẹ`}
          />
          <SummaryContent
            content={totalFormulaMilk}
            unit={'ml'}
            title={'Tổng sữa công thức'}
          />
          <SummaryContent
            content={convertSecondToHour(totalSleepTime)}
            title={'Tổng thời gian ngủ'}
          />
        </View>
      </View>

      <View
        style={{
          height: '75%',
          alignItems: 'center',
        }}>
        {!items && <Text style={{marginTop: 30}}>Không tìm thấy dữ liệu!</Text>}
        <FlatList
          style={styles.list}
          data={items}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id}
          refreshing={refresh}
          onRefresh={_onRefresh}
        />
      </View>
    </View>
  );
}

const SummaryContent = ({content, unit, title, contentStyle}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text
        style={[
          {color: '#fff', fontSize: 14, fontWeight: 'bold'},
          contentStyle,
        ]}>
        {content} {unit}
      </Text>
      <Text style={{color: '#fff', fontSize: 10}}>{title}</Text>
    </View>
  );
};

const ListItem = ({activityDesc, time, moreDetail}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftItemView}>
        <Icon
          name="checkbox-marked-circle-outline"
          size={30}
          color={Constants.colors.darkBlue}
        />
        <View style={{marginLeft: 10}}>
          <Text style={{fontSize: 12}}>{time}</Text>
          <Text style={{fontSize: 10, color: 'grey'}}>
            {activityDesc} {moreDetail}
          </Text>
        </View>
      </View>
      <View style={styles.rightTextView}>
        <Icon
          name="chevron-right"
          size={20}
          color={Constants.colors.darkBlue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  itemContainer: {
    alignItems: 'center',
    marginVertical: 3,
    marginHorizontal: Constants.appMargin,
    backgroundColor: '#fff',

    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    elevation: 1,
  },
  leftItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  leftImage: {
    width: 42,
    height: 42,
    marginLeft: 15,
    borderRadius: 30,
  },
  rightTextView: {
    flexDirection: 'row',
    marginRight: 15,
  },
  dividerContainer: {
    alignItems: 'flex-end',
    width: '100%',
    paddingRight: 10,
  },
  divider: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    height: 1,
    width: '80%',
  },
});
