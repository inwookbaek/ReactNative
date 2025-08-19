import { Text, View } from "react-native";

type CatProps = {
    name: string;
    age: number;
    color: string;
}

const Cat = (props: CatProps) => {
    return (
        <View>
            <Text>{props.name}</Text>
            <Text>{props.age}</Text>
            <Text>{props.color}</Text>
        </View>
    )
}

const Cafe = () => {
  return (
    <View>
        <Text>Cafe Properties!!</Text>
        <Cat name="Mimi" age={2} color="black" />
    </View>
  )
}

export default Cafe;