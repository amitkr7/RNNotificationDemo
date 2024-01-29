import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    const notiRecivedSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        const userName = notification.request.content.data.userName;
        console.log(userName);
      });

    const notiResponseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const userName = response.notification.request.content.data.userName;
        console.log(userName);
      });

    return () => {
      notiRecivedSubscription.remove();
      notiResponseSubscription.remove();
    };
  }, []);

  const scheduleNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Test Notification',
        body: 'This is a text notification',
        data: { userName: 'Amit' },
      },
      trigger: {
        seconds: 3,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title='Schedule Notification'
        onPress={scheduleNotificationHandler}
      />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
