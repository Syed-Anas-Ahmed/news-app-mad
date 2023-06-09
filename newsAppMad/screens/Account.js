import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserData(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Details</Text>
      {userData ? (
        <>
          <View style={styles.profileContainer}>
            <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
            
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.userInfo}>{userData.username}</Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.userInfo}>{userData.phoneNumber}</Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.userInfo}>{userData.email}</Text>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 16,
  },
  userInfo: {
    fontSize: 16,
  },
});

export default Account;
