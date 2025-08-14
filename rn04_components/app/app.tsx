/*

## 📱 포함된 Core Components

### **기본 탭 (Basic)**
1. **View** - 컨테이너 역할, 레이아웃 구성
2. **Text** - 텍스트 표시, 다양한 스타일링
3. **TouchableOpacity** - 불투명도 변화 터치
4. **TouchableHighlight** - 하이라이트 효과 터치
5. **TouchableWithoutFeedback** - 시각적 피드백 없는 터치
6. **Pressable** - 최신 터치 컴포넌트 (권장)
7. **TextInput** - 텍스트 입력, 단일/다중 줄

### **미디어 탭 (Media)**
8. **Image** - 네트워크 이미지, resizeMode 옵션
9. **ImageBackground** - 배경 이미지 위에 컨텐츠

### **컨트롤 탭 (Controls)**
10. **Switch** - 토글 스위치, 설정 제어
11. **ActivityIndicator** - 로딩 스피너
12. **Modal** - 오버레이 모달창

### **리스트 탭 (Lists)**
13. **FlatList** - 효율적인 리스트 렌더링
14. **SectionList** - 섹션으로 그룹화된 리스트
15. **ScrollView** - 스크롤 가능한 컨테이너

### **기타 중요 Components**
16. **SafeAreaView** - 안전 영역 처리
17. **KeyboardAvoidingView** - 키보드 회피
18. **StatusBar** - 상태바 제어

## 🚀 실행 방법

1. **새 Expo 프로젝트 생성:**
```bash
npx create-expo-app CoreComponentsApp --template
cd CoreComponentsApp
```

2. **코드 적용:**
- `App.tsx`에 위 코드 복사/붙여넣기

3. **실행:**
```bash
npx expo start
```

4. **Expo Go로 확인:**
- QR 코드 스캔하여 실제 기기에서 테스트

## 💡 주요 학습 포인트

**✅ 실용적 예제들:**
- 할일 목록 (FlatList + State)
- 폼 입력 (TextInput + 유효성 검사)
- 이미지 갤러리 (Image + resizeMode)
- 모달 다이얼로그 (Modal + 애니메이션)

**✅ TypeScript 활용:**
- 인터페이스로 데이터 타입 정의
- Props와 State의 타입 안전성

**✅ 동적 UI 변화:**
- 탭 전환으로 다른 컴포넌트 표시
- State 변화에 따른 스타일 변경
- 조건부 렌더링과 애니메이션

*/
// App.tsx - React Native Core Components 학습용 예제 (Expo Go + TypeScript)
import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  Image,
  ImageBackground,
  Switch,
  Alert,
  Modal,
  ActivityIndicator,
  FlatList,
  SectionList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface SectionData {
  title: string;
  data: string[];
}

export default function App() {
  // State 관리
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: 'React Native 배우기', completed: false },
    { id: '2', text: 'Core Components 마스터하기', completed: true },
  ]);
  const [selectedTab, setSelectedTab] = useState<string>('basic');

  const scrollRef = useRef<ScrollView>(null);

  // 화면 크기
  const { width, height } = Dimensions.get('window');

  // 샘플 데이터
  const flatListData = [
    { id: '1', name: '사과', price: 2000, emoji: '🍎' },
    { id: '2', name: '바나나', price: 1500, emoji: '🍌' },
    { id: '3', name: '오렌지', price: 3000, emoji: '🍊' },
    { id: '4', name: '포도', price: 5000, emoji: '🍇' },
  ];

  const sectionListData: SectionData[] = [
    {
      title: '과일',
      data: ['사과', '바나나', '오렌지'],
    },
    {
      title: '채소',
      data: ['당근', '브로콜리', '양파'],
    },
  ];

  // 이벤트 핸들러
  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const addTodo = () => {
    if (inputText.trim()) {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: inputText.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const renderFlatListItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.flatListItem}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₩{item.price.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionListItem = ({ item }: { item: string }) => (
    <View style={styles.sectionItem}>
      <Text style={styles.sectionItemText}>{item}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }: { section: SectionData }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  // 탭별 컨텐츠 렌더링
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'basic':
        return (
          <>
            {/* View & Text */}
            <View style={styles.exampleBox}>
              <Text style={styles.title}>📱 View & Text Components</Text>
              <View style={styles.nestedView}>
                <Text style={styles.heading}>제목 텍스트</Text>
                <Text style={styles.content}>일반 텍스트입니다.</Text>
                <Text style={styles.caption}>작은 캡션 텍스트</Text>
              </View>
            </View>

            {/* TouchableOpacity & 다른 Touchable들 */}
            <View style={styles.exampleBox}>
              <Text style={styles.title}>👆 Touchable Components</Text>
              
              <TouchableOpacity 
                style={styles.touchableButton}
                onPress={() => Alert.alert('TouchableOpacity', '불투명도 변화')}
              >
                <Text style={styles.buttonText}>TouchableOpacity</Text>
              </TouchableOpacity>

              <TouchableHighlight
                style={styles.touchableButton}
                underlayColor="#d0d0d0"
                onPress={() => Alert.alert('TouchableHighlight', '하이라이트 효과')}
              >
                <Text style={styles.buttonText}>TouchableHighlight</Text>
              </TouchableHighlight>

              <TouchableWithoutFeedback
                onPress={() => Alert.alert('TouchableWithoutFeedback', '시각적 피드백 없음')}
              >
                <View style={styles.touchableButton}>
                  <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
                </View>
              </TouchableWithoutFeedback>

              <Pressable
                style={({ pressed }) => [
                  styles.pressableButton,
                  { backgroundColor: pressed ? '#0056cc' : '#007AFF' }
                ]}
                onPress={() => Alert.alert('Pressable', '최신 터치 컴포넌트')}
              >
                <Text style={styles.buttonText}>Pressable (권장)</Text>
              </Pressable>
            </View>

            {/* TextInput */}
            <View style={styles.exampleBox}>
              <Text style={styles.title}>⌨️ TextInput Component</Text>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="여기에 텍스트를 입력하세요"
                multiline={false}
              />
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                placeholder="여러 줄 입력이 가능합니다..."
                multiline={true}
                numberOfLines={3}
              />
              <Text style={styles.inputPreview}>입력된 텍스트: {inputText}</Text>
            </View>
          </>
        );

      case 'media':
        return (
          <>
            {/* Image */}
            <View style={styles.exampleBox}>
              <Text style={styles.title}>🖼️ Image Component</Text>
              <Image
                source={{ uri: 'https://picsum.photos/200/150' }}
                style={styles.networkImage}
                resizeMode="cover"
              />
              <Text style={styles.caption}>네트워크 이미지 (resizeMode: cover)</Text>
              
              <Image
                source={{ uri: 'https://picsum.photos/200/100' }}
                style={styles.networkImage}
                resizeMode="contain"
              />
              <Text style={styles.caption}>resizeMode: contain</Text>
            </View>

            {/* ImageBackground */}
            <ImageBackground
              source={{ uri: 'https://picsum.photos/400/200' }}
              style={styles.imageBackground}
              resizeMode="cover"
            >
              <View style={styles.imageOverlay}>
                <Text style={styles.title}>🌅 ImageBackground</Text>
                <Text style={styles.overlayText}>배경 이미지 위에 텍스트</Text>
              </View>
            </ImageBackground>
          </>
        );

      case 'controls':
        return (
          <>
            {/* Switch */}
            <View style={styles.exampleBox}>
              <Text style={styles.title}>🔄 Switch Component</Text>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>알림 설정</Text>
                <Switch
                  value={switchValue}
                  onValueChange={setSwitchValue}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={switchValue ? '#f5dd4b' : '#f4f3f4'}
                />
              </View>
              <Text style={styles.switchStatus}>
                알림이 {switchValue ? '켜져' : '꺼져'} 있습니다
              </Text>
            </View>

            {/* ActivityIndicator */}
            <View style={styles.exampleBox}>
              <Text style={styles.title}>⏳ ActivityIndicator</Text>
              <TouchableOpacity style={styles.loadingButton} onPress={handleLoadingDemo}>
                <Text style={styles.buttonText}>2초 로딩 시작</Text>
              </TouchableOpacity>
              
              {loading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#007AFF" />
                  <Text style={styles.loadingText}>로딩 중...</Text>
                </View>
              )}
            </View>

            {/* Modal */}
            <View style={styles.exampleBox}>
              <Text style={styles.title}>📋 Modal Component</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.buttonText}>모달 열기</Text>
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>모달 창입니다</Text>
                    <Text style={styles.modalText}>
                      이것은 Modal 컴포넌트입니다. 오버레이 형태로 표시됩니다.
                    </Text>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.buttonText}>닫기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </>
        );

      case 'lists':
        return (
          <>
            {/* FlatList */}
            <View style={styles.exampleBox}>
              <Text style={styles.title}>📋 FlatList Component</Text>
              <FlatList
                data={flatListData}
                renderItem={renderFlatListItem}
                keyExtractor={(item) => item.id}
                style={styles.flatList}
                scrollEnabled={false}
              />
            </View>

            {/* SectionList */}
            <View style={styles.exampleBox}>
              <Text style={styles.title}>📑 SectionList Component</Text>
              <SectionList
                sections={sectionListData}
                renderItem={renderSectionListItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => item + index}
                style={styles.sectionList}
                scrollEnabled={false}
              />
            </View>

            {/* Todo List with FlatList */}
            <View style={styles.exampleBox}>
              <Text style={styles.title}>✅ 할일 목록 (FlatList 활용)</Text>
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.todoInput}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="새 할일 추가"
                  onSubmitEditing={addTodo}
                />
                <TouchableOpacity style={styles.addButton} onPress={addTodo}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={todos}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.todoItem,
                      { backgroundColor: item.completed ? '#e8f5e8' : '#fff' }
                    ]}
                    onPress={() => toggleTodo(item.id)}
                  >
                    <Text style={[
                      styles.todoText,
                      { textDecorationLine: item.completed ? 'line-through' : 'none' }
                    ]}>
                      {item.completed ? '✅' : '⭕'} {item.text}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                style={styles.todoList}
                scrollEnabled={false}
              />
            </View>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Core Components</Text>
        <Text style={styles.headerSubtitle}>React Native 핵심 컴포넌트 학습</Text>
      </View>

      {/* 탭 네비게이션 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'basic' && styles.activeTab]}
          onPress={() => setSelectedTab('basic')}
        >
          <Text style={[styles.tabText, selectedTab === 'basic' && styles.activeTabText]}>
            기본
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'media' && styles.activeTab]}
          onPress={() => setSelectedTab('media')}
        >
          <Text style={[styles.tabText, selectedTab === 'media' && styles.activeTabText]}>
            미디어
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'controls' && styles.activeTab]}
          onPress={() => setSelectedTab('controls')}
        >
          <Text style={[styles.tabText, selectedTab === 'controls' && styles.activeTabText]}>
            컨트롤
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'lists' && styles.activeTab]}
          onPress={() => setSelectedTab('lists')}
        >
          <Text style={[styles.tabText, selectedTab === 'lists' && styles.activeTabText]}>
            리스트
          </Text>
        </TouchableOpacity>
      </View>

      {/* 메인 컨텐츠 */}
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          ref={scrollRef}
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderTabContent()}

          {/* ScrollView 제어 버튼 */}
          <View style={styles.scrollControls}>
            <TouchableOpacity
              style={styles.scrollButton}
              onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
            >
              <Text style={styles.scrollButtonText}>맨 위로</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.scrollButton}
              onPress={() => scrollRef.current?.scrollToEnd({ animated: true })}
            >
              <Text style={styles.scrollButtonText}>맨 아래로</Text>
            </TouchableOpacity>
          </View>

          {/* 화면 정보 */}
          <View style={styles.exampleBox}>
            <Text style={styles.title}>📱 Dimensions & Platform</Text>
            <Text style={styles.content}>화면 너비: {width.toFixed(0)}px</Text>
            <Text style={styles.content}>화면 높이: {height.toFixed(0)}px</Text>
            <Text style={styles.content}>플랫폼: {Platform.OS}</Text>
            <Text style={styles.content}>버전: {Platform.Version}</Text>
          </View>

          {/* 푸터 */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              🎉 React Native Core Components 학습 완료!
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ea',
    padding: 20,
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#6200ea',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#6200ea',
    fontWeight: 'bold',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  exampleBox: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 15,
    borderRadius: 12,
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
    marginBottom: 12,
  },
  nestedView: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#6200ea',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 3,
  },
  caption: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  touchableButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  pressableButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputPreview: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  networkImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginVertical: 5,
  },
  imageBackground: {
    margin: 10,
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlayText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  switchStatus: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  loadingButton: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  modalButton: {
    backgroundColor: '#9c27b0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  flatList: {
    maxHeight: 200,
  },
  flatListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginVertical: 2,
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  sectionList: {
    maxHeight: 200,
  },
  sectionHeader: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 6,
    marginVertical: 2,
  },
  sectionHeaderText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionItem: {
    backgroundColor: '#f3e5f5',
    padding: 10,
    marginVertical: 1,
    marginLeft: 10,
    borderRadius: 4,
  },
  sectionItemText: {
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  todoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  todoList: {
    maxHeight: 150,
  },
  todoItem: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  todoText: {
    fontSize: 14,
    color: '#333',
  },
  scrollControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  scrollButton: {
    backgroundColor: '#607d8b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  scrollButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#4caf50',
    margin: 10,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});