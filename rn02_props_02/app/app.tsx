/*
📚 학습 단계별 설명
1단계: 기본 Props (String, Number)

가장 기본적인 문자열과 숫자 Props
TypeScript 인터페이스로 타입 정의

2단계: Boolean Props

참/거짓 값과 옵셔널 Props (?)
기본값 설정 방법

3단계: 배열 Props

문자열 배열을 받아서 리스트로 렌더링
map 함수 활용

4단계: 함수 Props

이벤트 핸들러 함수를 Props로 전달
부모-자식 컴포넌트 간 통신

5단계: 객체 Props

복잡한 객체 데이터 전달
중첩된 객체 접근

6단계: ViewStyle Props

React Native 스타일 객체 전달
동적 스타일링

7단계: 복합 타입 Props

Union 타입과 복잡한 객체 배열
실제 앱에서 사용하는 패턴

8단계: Children Props

React의 children 패턴
재사용 가능한 래퍼 컴포넌트

9단계: 조건부 렌더링 Props

조건에 따른 UI 표시/숨김
이미지 로딩 패턴

10단계: 제네릭 Props

TypeScript 제네릭을 활용한 재사용성
타입 안전성과 유연성
*/

import React, { useState } from 'react';
import { 
  ScrollView, 
  Text, 
  View, 
  StyleSheet,
  TouchableOpacity,
  Alert,
  ViewStyle,
  TextStyle, 
  Image,
 } from "react-native";
import { StatusBar } from 'expo-status-bar';

// 화면 크기
const { width } = Dimensions.get('window');

// ===== 1단계: 기본 문자열 Props =====
interface WelcomeProps {
  name: string;
  age: number;
}

const WelcomeComponent: React.FC<WelcomeProps> = ({ name, age }) => (
  <View style={styles.exampleBox}>
    <Text style={styles.title}>1. 기본 Props (String, Number)</Text>
    <Text style={styles.content}>안녕하세요, {name}님! 나이는 {age}세입니다.</Text>
  </View>
);

// ===== 2단계: Boolean Props =====
interface StatusProps {
  isOnline: boolean;
  showIcon?: boolean; // 옵셔널 props
}

const StatusComponent: React.FC<StatusProps> = ({ isOnline, showIcon = true }) => (
  <View style={styles.exampleBox}>
    <Text style={styles.title}>2. Boolean Props</Text>
    <Text style={styles.content}>
      {showIcon && '🔵 '}
      상태: {isOnline ? '온라인' : '오프라인'}
    </Text>
  </View>
);

// ===== 3단계: 배열 Props =====
interface ListProps {
  items: string[];
  title: string;
}

const ListComponent: React.FC<ListProps> = ({ items, title }) => (
  <View style={styles.exampleBox}>
    <Text style={styles.title}>3. 배열 Props</Text>
    <Text style={styles.subtitle}>{title}</Text>
    {items.map((item, index) => (
      <Text key={index} style={styles.listItem}>• {item}</Text>
    ))}
  </View>
);

// ===== 4단계: 함수 Props =====
interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
}

const CustomButton: React.FC<ButtonProps> = ({ title, onPress, color = '#007AFF' }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: color }]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// ===== 5단계: 객체 Props =====
interface UserInfo {
  name: string;
  email: string;
  role: string;
}

interface UserCardProps {
  user: UserInfo;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <View style={styles.exampleBox}>
    <Text style={styles.title}>5. 객체 Props</Text>
    <View style={styles.userCard}>
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
      <Text style={styles.userRole}>역할: {user.role}</Text>
    </View>
  </View>
);


// ===== 6단계: ViewStyle Props =====
interface StyledBoxProps {
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const StyledBox: React.FC<StyledBoxProps> = ({ children, containerStyle, textStyle }) => (
  <View style={[styles.styledBox, containerStyle]}>
    <Text style={[styles.styledText, textStyle]}>{children}</Text>
  </View>
);

// ===== 7단계: 복합 타입 Props =====
interface Product {
  id: number;
  name: string;
  price: number;
  category: 'electronics' | 'clothing' | 'books';
}

interface ProductListProps {
  products: Product[];
  onProductPress: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductPress }) => (
  <View style={styles.exampleBox}>
    <Text style={styles.title}>7. 복합 타입 Props</Text>
    {products.map(product => (
      <TouchableOpacity
        key={product.id}
        style={styles.productItem}
        onPress={() => onProductPress(product)}
      >
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>₩{product.price.toLocaleString()}</Text>
        <Text style={styles.productCategory}>{product.category}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

// ===== 8단계: Children Props =====
interface CardProps {
  title: string;
  children: React.ReactNode;
  backgroundColor?: string;
}

const Card: React.FC<CardProps> = ({ title, children, backgroundColor = '#f8f8f8' }) => (
  <View style={[styles.card, { backgroundColor }]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardContent}>
      {children}
    </View>
  </View>
);

// ===== 9단계: 조건부 렌더링 Props =====
interface ConditionalProps {
  showImage: boolean;
  imageUri?: string;
  title: string;
  description: string;
}

const ConditionalComponent: React.FC<ConditionalProps> = ({
  showImage,
  imageUri,
  title,
  description
}) => (
  <View style={styles.exampleBox}>
    <Text style={styles.title}>9. 조건부 렌더링 Props</Text>
    {showImage && imageUri && (
      <Image source={{ uri: imageUri }} style={styles.image} />
    )}
    <Text style={styles.conditionalTitle}>{title}</Text>
    <Text style={styles.conditionalDesc}>{description}</Text>
  </View>
);

// ===== 10단계: 제네릭 Props =====
interface GenericListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  title: string;
}

function GenericList<T>({ data, renderItem, title }: GenericListProps<T>) {
  return (
    <View style={styles.exampleBox}>
      <Text style={styles.title}>10. 제네릭 Props</Text>
      <Text style={styles.subtitle}>{title}</Text>
      {data.map((item, index) => (
        <View key={index}>
          {renderItem(item, index)}
        </View>
      ))}
    </View>
  );
}

export default function App() {

  // 3단계 - 배열
  const hobbies = ['독서', '영화감상', '코딩', '운동'];
  
  // 4단계 - 이벤트 핸들러들
  const [counter, setCounter] = useState(0);

  const handleButtonPress = () => {
    Alert.alert('버튼 클릭!', `현재 카운터: ${counter}`);
  };

  const handleCounterIncrease = () => {
    setCounter(prev => prev + 1);
  };

   // 5단계 - 객체
   const user: UserInfo = {
    name: '김개발',
    email: 'dev@example.com',
    role: '프론트엔드 개발자'
  };

  // 7단계 - 복합 타입
  const products: Product[] = [
    { id: 1, name: '노트북', price: 1200000, category: 'electronics' },
    { id: 2, name: '티셔츠', price: 25000, category: 'clothing' },
    { id: 3, name: 'React 책', price: 35000, category: 'books' },
  ];

  // 7단계 - 이벤트 핸들러들
  const handleProductPress = (product: Product) => {
    Alert.alert(
      '상품 선택',
      `${product.name}\n가격: ₩${product.price.toLocaleString()}\n카테고리: ${product.category}`
    );
  };

  // 10단계 - 제네릭
  const colors = ['red', 'green', 'blue', 'yellow', 'purple'];

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />           
      <View style={styles.header}>
        <Text style={styles.headerTitle}>React Native Props 학습</Text>
        <Text style={styles.headerSubtitle}>10단계로 배우는 Props 활용법</Text>
      </View>

     {/* 1단계 */}
     <WelcomeComponent name="홍길동" age={1000} />

    {/* 2단계 */}
    <StatusComponent isOnline={true} showIcon={true} />
    <StatusComponent isOnline={false} />

    {/* 3단계 */}
    <ListComponent items={hobbies} title="취미 목록" />

    {/* 4단계 */}
    <View style={styles.exampleBox}>
      <Text style={styles.title}>4. 함수 Props</Text>
      <Text style={styles.content}>카운터: {counter}</Text>
      <CustomButton 
        title="클릭하기" 
        onPress={handleButtonPress} 
      />
      <CustomButton 
        title="카운터 증가" 
        onPress={handleCounterIncrease} 
        color="#34C759" 
      />
    </View>

      {/* 5단계 */}
      <UserCard user={user} />

      {/* 6단계 */}
      <View style={styles.exampleBox}>
        <Text style={styles.title}>6. ViewStyle Props</Text>
        <StyledBox
          containerStyle={{ backgroundColor: '#e1f5fe', padding: 15 }}
          textStyle={{ color: '#0277bd', fontSize: 16 }}
        >
          커스텀 스타일이 적용된 박스
        </StyledBox>
        <StyledBox
          containerStyle={{ backgroundColor: '#f3e5f5', padding: 10 }}
          textStyle={{ color: '#7b1fa2', fontSize: 14, fontWeight: 'bold' }}
        >
          다른 스타일의 박스
        </StyledBox>
      </View>

      {/* 7단계 */}
      <ProductList products={products} onProductPress={handleProductPress} />

      {/* 8단계 */}
      <Card title="Children Props 예제" backgroundColor="#fff3e0">
        <Text>이 텍스트는 Card 컴포넌트의 children입니다.</Text>
        <CustomButton 
          title="카드 내부 버튼" 
          onPress={() => Alert.alert('카드', '내부 버튼 클릭!')}
          color="#ff9800"
        />
      </Card>

      {/* 9단계 */}
      <ConditionalComponent
        showImage={true}
        imageUri="https://picsum.photos/200/100"
        title="이미지가 있는 카드"
        description="showImage가 true일 때 이미지가 표시됩니다."
      />
      <ConditionalComponent
        showImage={false}
        title="이미지가 없는 카드"
        description="showImage가 false일 때 이미지가 숨겨집니다."
      />

      {/* 10단계 */}
      <GenericList
        data={colors}
        title="색상 목록 (제네릭)"
        renderItem={(color, index) => (
          <View style={styles.colorItem}>
            <View style={[styles.colorBox, { backgroundColor: color }]} />
            <Text>{index + 1}. {color}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🎉 Props 학습 완료! 이제 컴포넌트 간 데이터 전달을 자유롭게 할 수 있습니다.
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'mediumseagreen',
    width: width,
  },
  header: {
    backgroundColor: '#6200ea',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e1bee7',
    marginTop: 5,
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
  listItem: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
    paddingLeft: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  userCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  userRole: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
    fontWeight: '500',
  },
  styledBox: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  styledText: {
    fontSize: 14,
  },
  productItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 13,
    color: '#28a745',
    fontWeight: '600',
  },
  productCategory: {
    fontSize: 12,
    color: '#6c757d',
    textTransform: 'capitalize',
  },
  card: {
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    padding: 15,
    paddingBottom: 5,
  },
  cardContent: {
    padding: 15,
    paddingTop: 5,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  conditionalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  conditionalDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  }, 
  colorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  footer: {
    backgroundColor: '#4caf50',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});