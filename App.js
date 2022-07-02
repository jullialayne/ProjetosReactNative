import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    // Liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    /**
     * Quando o celular for chacoalhado, mudaremos o toggle
     */
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    // Essa func vai ser chamada quando o componets
    // For ser desmontado
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          source={
            toggle
              ? require('./assets/icons/eco-light.png')
              : require('./assets/icons/eco-light-off.png')
          }
        />
        <Text
          accessibilityLabel="Nome: "
          style={
            toggle ? [style.name, style.name.on] : [style.name, style.name.off]
          }>
          {toggle ? 'Ligada' : 'Desligada'}
        </Text>
        <Image
          style={style.power}
          source={require('./assets/icons/power.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  name: {
    marginTop: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    on: {
      color: 'black',
    },
    off: {
      color: 'white',
    },
  },
  power: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
});
