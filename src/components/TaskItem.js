import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';

const TaskItem = props => {
  const {item} = props;
  const MainView = item => {
    return (
      <View style={styles.card}>
        <Text>Name: {item.name}</Text>
        <Text>Status: {item.status}</Text>
      </View>
    );
  };

  const swipeToDelete = (progress, dragX) => {
    // const trans = dragX.interpolate({
    //   inputRange: [0, 50, 100, 101],
    //   outputRange: [-20, 0, 0, 1],
    // });
    return (
      <RectButton
        style={[styles.card, styles.rightAction]}
        onPress={() => {
          props.onDelete();
        }}>
        {/* <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{translateX: trans}],
            },
          ]}>
          Archive
        </Animated.Text> */}
        <Text style={{color: '#FFF'}}>Delete</Text>
      </RectButton>
    );
  };

  const swipeToArchived = (progress, dragX) => {
    return (
      <RectButton
        style={[styles.card, styles.leftAction]}
        onPress={() => {
          props.onArchive();
        }}>
        {/* <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{translateX: trans}],
            },
          ]}>
          Archive
        </Animated.Text> */}
        <Text style={{color: '#FFF'}}>Archive</Text>
      </RectButton>
    );
  };
  return (
    <Swipeable
      renderRightActions={swipeToDelete}
      renderLeftActions={swipeToArchived}>
      {MainView(item)}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    padding: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
    backgroundColor: '#FFF',
  },
  rightAction: {
    width: '20%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftAction: {
    width: '20%',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskItem;
