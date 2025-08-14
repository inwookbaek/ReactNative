import { Text, View, TextInput } from "react-native";

const name: string = 'gilbaek';
const getFullName = () => {
  return 'Inwook, Baek';
}

const getFullName1 = (firstName: string, lastName: string) => {
  return `${lastName}, ${firstName}`;
}

const Cat = () => {
  return (
    <View>
      <Text>Hello, I am {name}</Text>
      <Text>Hello, I am {getFullName()}</Text>
      <Text>Hello, I am {getFullName1('인욱', '백')}</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="홍길동" />
    </View>
  );
};

export default Cat;