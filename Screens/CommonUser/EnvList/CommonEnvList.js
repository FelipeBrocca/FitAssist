import React from 'react'
import { Text } from 'react-native';

const CommonEnvList = ({ environments }) => {
  if (environments[0]) {
    console.log(environments)
    return (environments.map((envi, index) => (
      <Text key={index}>{envi.mainPlace}</Text>
    )))
  } else return <Text>No es coach</Text>;
}

export default CommonEnvList