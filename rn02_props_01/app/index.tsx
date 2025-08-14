import React from "react";
import { 
  Text, 
  View, 
  StyleSheet,
  Pressable, 
  Button,
  TextInput, 
  StatusBarProps, 
  Switch,
  StyleProp, 
  TextStyle, 
  ScrollView } from "react-native";
import { router } from "expo-router";

// **** 중요****
// expo-router로 “다른 화면”으로 이동할 때는 props 객체를 직접 전달할 수 없습니다.
// 대신 params 객체를 사용하여 데이터를 전달합니다.
// useLocalSearchParams를 쓰지 않으려면, “상태 공유(전역 상태/컨텍스트)” 
// 또는 “동일 화면 내에서 컴포넌트를 직접 렌더링” 중 하나를 사용해야 합니다

// 프레젠테이셔널 컴포넌트: props로 텍스트 스타일을 직접 전달
type TextStyledProps = { textStyle: StyleProp<TextStyle> };
const TextStyled = ({ textStyle }: TextStyledProps) => (
  <Text style={textStyle}>스타일 있는 텍스트</Text>
);

const handle_step01 = (msgFromInput?: string) => {
  const finalMessage = (msgFromInput?.trim()?.length ?? 0) > 0
    ? msgFromInput!
    : "Text Props : 기본 메시지입니다.";
  router.push({
    pathname: "/components/Step01_TextProp",
    params: { 
      message: finalMessage,
    },
  });
};

const handle_step02 = (num1: number, num2: number) => {
  router.push({
    pathname: "/components/Step02_NumberProp",
    params: { a: num1, b: num2 },
  });
};

const handle_step03 = (isVisible: boolean) => {
  router.push({
    pathname: "/components/Step03_BooleanProp",
    params: { isVisible: String(isVisible)},
  });
};

const handle_step04 = (color: string, lineWidth: number) => {
  router.push({
    pathname: "/components/Step04_StyleProp",
    params: { color, lineWidth: String(lineWidth) },
  });
};

const handle_step05 = (textColor: string, textSize: number, textWeight: TextStyle['fontWeight']) => {
  router.push({
    pathname: "/components/Step05_TextStyleProp",
    params: { textColor, textSize: String(textSize), textWeight },
  });
};

// 6. Object Props
const handle_step06 = (name, age) => {
  router.push({
    pathname: "/components/Step06_ObjectProp", // Assuming userName and userAge are defined in the scope where handle_step06 is called
    params: { user: JSON.stringify({ name, age }) },
  });
};


export default function Index() {
  const [message, setMessage] = React.useState("");
  const [num1, setNum1] = React.useState("10");
  const [num2, setNum2] = React.useState("20");
  const [isVisible, setVisible] = React.useState(false);
  const [boxColor, setBoxColor] = React.useState("red");
  const [lineWidth, setLineWidth] = React.useState("4");

  // Step05 텍스트 스타일 상태 (네비게이션 없이 직접 props 전달)
  const [textColor, setTextColor] = React.useState("purple");
  const [textSize, setTextSize] = React.useState("20");
  const [textWeight, setTextWeight] = React.useState<TextStyle["fontWeight"]>("bold");
  
  // Step06 사용자 객체 상태
  const [userName, setUserName] = React.useState("홍길동");
  const [userAge, setUserAge] = React.useState(100);
  
  return (
    <ScrollView style={styles.container}>

      {/* 1. Text Props */}
      <Pressable onPress={() => handle_step01(message)} style={styles.button}>
        <Text style={styles.buttonText}>Step01.Text Prop</Text>
        <TextInput
          placeholder="Enter message"
          style={styles.inputNum}
          value={message}
          onChangeText={setMessage}
        />
      </Pressable>

      {/* 2. Number Props */}
      <Pressable
        style={styles.button}
        onPress={() => handle_step02(Number(num1) || 0, Number(num2) || 0)}
      >
        <Text style={styles.buttonText}>Step02.Number Prop</Text>
        <View style={{ flexDirection: "row", alignItems: "center"}}>
          <TextInput
            placeholder="Enter number"
            style={styles.inputNum}
            value={num1}
            onChangeText={setNum1}
            keyboardType="numeric"
          />
          <Text style={{ fontSize: 24, color: "white" }}> + </Text>
          <TextInput
            placeholder="Enter number"
            style={styles.inputNum}
            value={num2}
            onChangeText={setNum2}
            keyboardType="numeric"
          />               
        </View>
      </Pressable>

      {/* 3. Boolean Props */}
      <Pressable onPress={() => handle_step03(isVisible)} style={styles.button}>
        <Text style={styles.buttonText}>Step03.Boolean Prop</Text>
        <Switch
          value={isVisible}
          onValueChange={setVisible}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isVisible ? '#f5dd4b' : '#f4f3f4'}
        />        
      </Pressable>

      {/* 4. Style Props */}
      {/* 컬러픽커 적용예제 (실습에서는 적용하지 않) 
          1. https://www.npmjs.com/package/reanimated-color-picker
          2. npm install reanimated-color-picker 
          스타일은 객체로 전달할 수 없기 떄문에 문자열(or JSON)으로 전달    
      */}
      <Pressable onPress={() => handle_step04(boxColor, Number(lineWidth) || 0)} style={styles.button}>
        <Text style={styles.buttonText}>Step04.Style Prop</Text>
        <View style={{ flexDirection: "row", alignItems: "center"}}>
          <View style={{ width: '40%', marginTop: 8 }}>
            <Text style={{ color: 'white', marginBottom: 4 }}>색상선택</Text>
            <TextInput
              placeholder="#rrggbb 또는 색상명"
              style={styles.inputNum}
              value={boxColor}
              onChangeText={setBoxColor}
              autoCapitalize="none"
            />
          </View>
          <View style={{ width: '40%', marginTop: 8, marginLeft:10 }}>
            <Text style={{ color: 'white', marginBottom: 4 }}>라인굵기</Text>
            <TextInput
              placeholder="정수 (예: 4)"
              style={styles.inputNum}
              value={lineWidth}
              onChangeText={setLineWidth}
              keyboardType="numeric"
            />
          </View>
        </View>
      </Pressable>

      {/* 5. TextStyle Props 
        Step05: 네비게이션 없이 직접 렌더링 (props 전달)
      */}
      <Pressable onPress={() => handle_step05(textColor, Number(textSize) || 0, textWeight)}  style={styles.button}>
        <Text style={styles.buttonText}>Step05.TextStyle Prop</Text>
        <View style={{ flexDirection: "row", alignItems: "center"}}>
          <View style={{ width: '30%', marginTop: 8 }}>
            <Text style={{ color: 'white', marginBottom: 4 }}>텍스트 색상</Text>
            <TextInput
              placeholder="#rrggbb 또는 색상명"
              style={styles.inputNum}
              value={textColor}
              onChangeText={setTextColor}
              autoCapitalize="none"
            />
          </View>
          <View style={{ width: '30%', marginTop: 8 , marginLeft:10}}>
            <Text style={{ color: 'white', marginBottom: 4 }}>폰트크기</Text>
            <TextInput
              placeholder="정수 (예: 20)"
              style={styles.inputNum}
              value={textSize}
              onChangeText={setTextSize}
              keyboardType="numeric"
            />
          </View>
          <View style={{ width: '30%', marginTop: 8, marginLeft:10}}>
            <Text style={{ color: 'white', marginBottom: 4 }}>폰트타입</Text>
            <TextInput
              placeholder="normal | bold | 100~900"
              style={styles.inputNum}
              value={String(textWeight ?? "bold")}
              onChangeText={(v) => setTextWeight(v as TextStyle['fontWeight'])}
              autoCapitalize="none"
            />
          </View>
        </View>
      </Pressable>    

      <Pressable onPress={() => handle_step06(userName, userAge)}  style={styles.button}>
        <Text style={styles.buttonText}>Step06.Object Prop</Text>

        <View style={{ flexDirection: "row", alignItems: "center"}}>
          <View style={{ width: '40%', marginTop: 8 }}>
            <Text style={{ color: 'white', marginBottom: 4 }}>이름</Text>
            <TextInput
              placeholder="이름"
              style={styles.inputNum}
              value={userName}
              onChangeText={setUserName}
              autoCapitalize="none"
            />
          </View>
          <View style={{ width: '40%', marginTop: 8, marginLeft:10 }}>
            <Text style={{ color: 'white', marginBottom: 4 }}>나이</Text>
            <TextInput
              placeholder="나이"
              style={styles.inputNum}
              value={String(userAge)}
              onChangeText={(age) => setUserAge(Number(age) || 0) }
              keyboardType="numeric"
            />
          </View>
        </View>

     </Pressable>    




    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 10,
    // justifyContent: "center",
    // alignItems: "center",
    gap: 12,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    minWidth: 220,
    marginVertical: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 12,
    backgroundColor: "white",
    minWidth: 220,
  },
  inputNum: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 12,
    backgroundColor: "white",
    minWidth: 50,
  },    

  exampleBox: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  }, 

});
