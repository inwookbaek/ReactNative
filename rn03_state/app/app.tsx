/*
📚 State 학습 단계별 상세 설명
1단계: 기본 카운터 (Number State)

State: useState<number>(0)
동적 UI: 카운터 값에 따라 배경색 변경 (양수=초록, 음수=빨강, 0=회색)
학습 포인트: 숫자 상태와 조건부 스타일링

2단계: 문자열 State로 텍스트 동적 변경

State: useState<string>(), TextInput 상태
동적 UI: 메시지에 따라 배경색 변경, 실시간 입력 반영
학습 포인트: 문자열 상태와 조건부 렌더링

3단계: Boolean State로 조건부 렌더링

State: 다크모드, 표시/숨김, 좋아요 토글
동적 UI: 스위치, 요소 표시/숨김, 색상 변경
학습 포인트: Boolean 상태로 UI 완전히 변경

4단계: 배열 State로 리스트 관리

State: useState<string[]>()
동적 UI: 할일 추가/삭제, 개수 표시, 짝수/홀수 배경색
학습 포인트: 배열 조작과 동적 리스트 렌더링

5단계: 객체 State로 폼 관리

State: 복합 객체 { name, email, age, job }
동적 UI: 폼 입력에 따른 실시간 업데이트, 제출 후 결과 표시
학습 포인트: 객체 상태 업데이트와 조건부 렌더링

6단계: 숫자 배열 State로 차트 만들기

State: useState<number[]>()
동적 UI: 데이터 기반 막대 차트, 선택된 막대 하이라이트
학습 포인트: 배열 데이터를 시각적으로 표현

7단계: 색상 State로 테마 변경

State: 테마 문자열과 색상 객체
동적 UI: 전체 컴포넌트 색상 테마 실시간 변경
학습 포인트: 상태 기반 동적 테마 시스템

8단계: 타이머 State (useEffect 활용)

State: 시간, 실행상태, 랩타임 배열
동적 UI: 실시간 시간 표시, 상태별 색상 변경
학습 포인트: useEffect와 상태를 결합한 실시간 업데이트

9단계: 애니메이션 State

State: Animated.Value와 애니메이션 타입
동적 UI: 슬라이드, 크기변경, 회전 애니메이션
학습 포인트: 상태 기반 애니메이션 제어

10단계: 복합 State 관리 (미니 게임)

State: 점수, 레벨, 체력, 게임상태, 시간
동적 UI: 게임 상태에 따른 완전한 UI 변화, 실시간 스탯 업데이트
학습 포인트: 복잡한 상태 조합과 전체적인 UI 제어
*/

// App.tsx - React Native State 학습용 예제 (Expo Go + TypeScript)
import React, { useEffect, useState } from "react";
import { ScrollView, 
  StyleSheet, 
  View, 
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  Animated,
 } from "react-native";
import { StatusBar } from 'expo-status-bar';

// 화면 크기
const { width } = Dimensions.get('window');

// ===== 1단계: 기본 카운터 (Number State) =====
const CounterExample: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <View style={styles.exampleBox}>
      <Text style={styles.title}>1. 기본 카운터 (Number State)</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity 
          style={[styles.counterButton, { backgroundColor: '#ff6b6b' }]}
          onPress={() => setCount(count - 1)}
        >
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>

        <View style={[styles.countDisplay, { 
          backgroundColor: count > 0 ? '#4ecdc4' : count < 0 ? '#ff6b6b' : '#95a5a6'
        }]}>
          <Text style={styles.countText}>{count}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.counterButton, { backgroundColor: '#4ecdc4' }]}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  )
}

// ===== 2단계: 문자열 State로 텍스트 동적 변경 =====
const TextExample: React.FC = () => {
  const [message, setMessage] = useState<string>('안녕하세요!');
  const [inputText, setInputText] = useState<string>('');

  const messages = [
    '좋은 하루 되세요! 🌞',
    'React Native 재미있어요! 📱',
    'TypeScript 최고! 🚀',
    '코딩이 즐거워요! 💻',
    'Expo Go 사용법! 🚒',
  ];

  return (
    <View style={styles.exampleBox}>
      <Text style={styles.title}>2. 문자열 State로 텍스트 변경</Text>
      <View style={[styles.messageBox, { 
        backgroundColor: message.includes('🌞') ? '#fff3cd' : 
                         message.includes('📱') ? '#d4edda' :
                         message.includes('🚀') ? '#d1ecf1' :
                         message.includes('💻') ? '#4ecdc4' : '#f8d7da'
      }]}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <View style={styles.buttonRow}>
        {messages.map((msg, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.smallButton, { backgroundColor: '#007bff' }]}
            onPress={() => setMessage(msg)}
          >
            <Text style={styles.smallButtonText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.textInput}
        value={inputText}
        onChangeText={setInputText}
        placeholder="직접 메시지 입력..."
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28a745' }]}
        onPress={() => setMessage(inputText || '메시지를 입력하세요!')}
      >
        <Text style={styles.buttonText}>메시지 변경</Text>
      </TouchableOpacity>
    </View>
  )
}

// ===== 3단계: Boolean State로 조건부 렌더링 =====
const ToggleExample: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
   <View style={[styles.exampleBox, { 
     backgroundColor: isDarkMode ? '#2c3e50' : '#ffffff'
   }]}>
     <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#333' }]}>
       3. Boolean State로 UI 토글
     </Text>
      <View style={styles.toggleContainer}>
        <Text style={{ color: isDarkMode ? '#fff' : '#333' }}>다크모드</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>

      {isVisible && (
        <View style={[styles.hiddenBox, { 
          backgroundColor: isDarkMode ? '#34495e' : '#f8f9fa'
        }]}>
          <Text style={{ color: isDarkMode ? '#fff' : '#333' }}>
            🎉 안녕! 나는 토글로 보이거나 숨겨져요!
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isVisible ? '#dc3545' : '#28a745' }]}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text style={styles.buttonText}>
          {isVisible ? '숨기기' : '보이기'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.likeButton, { 
          backgroundColor: isLiked ? '#e74c3c' : '#ecf0f1' 
        }]}
        onPress={() => setIsLiked(!isLiked)}
      >
        <Text style={styles.likeText}>
          {isLiked ? '❤️ 좋아요!' : '🤍 좋아요?'}
        </Text>
      </TouchableOpacity>
   </View>   
  )
}

// ===== 4단계: 배열 State로 리스트 관리 =====
const ListExample: React.FC = () => {
  const [todos, setTodos] = useState<string[]>(['React Native 학습하기', 'TypeScript 공부하기']);
  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <View style={styles.exampleBox}>
      <Text style={styles.title}>4. 배열 State로 할일 목록 관리</Text>
      <Text style={styles.subtitle}>총 {todos.length}개의 할일</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.todoInput}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="새로운 할일 추가..."
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>추가</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.todoList}>
        {todos.map((todo, index) => (
          <View key={index} style={[styles.todoItem, {
            backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9ecef'
          }]}>
            <Text style={styles.todoText}>{index + 1}. {todo}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeTodo(index)}
            >
              <Text style={styles.deleteButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {todos.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.clearButtonText}>모두 삭제</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

// ===== 5단계: 객체 State로 폼 관리 =====
interface UserForm {
  name: string;
  email: string;
  age: string;
  job: string;
}

const FormExample: React.FC = () => {
  const [form, setForm] = useState<UserForm>({
    name: '',
    email: '',
    age: '',
    job: 'developer'
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const updateForm = (field: keyof UserForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitForm = () => {
    if (form.name && form.email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } else {
      Alert.alert('오류', '이름과 이메일을 입력해주세요.');
    }
  };

  const resetForm = () => {
    setForm({ name: '', email: '', age: '', job: 'developer' });
    setIsSubmitted(false);
  };  

  return (
    <View style={styles.exampleBox}>
      <Text style={styles.title}>5. 객체 State로 폼 관리</Text>

      {isSubmitted ? (
        <View style={styles.successBox}>
          <Text style={styles.successTitle}>✅ 제출 완료!</Text>
          <Text>이름: {form.name}</Text>
          <Text>이메일: {form.email}</Text>
          <Text>나이: {form.age || '미입력'}</Text>
          <Text>직업: {form.job}</Text>
        </View>
      ) : (
        <View>
          <TextInput
            style={styles.formInput}
            placeholder="이름"
            value={form.name}
            onChangeText={(text) => updateForm('name', text)}
          />
          <TextInput
            style={styles.formInput}
            placeholder="이메일"
            value={form.email}
            onChangeText={(text) => updateForm('email', text)}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.formInput}
            placeholder="나이 (선택사항)"
            value={form.age}
            onChangeText={(text) => updateForm('age', text)}
            keyboardType="numeric"
          />
          
          <View style={styles.jobContainer}>
            <Text>직업:</Text>
            {['developer', 'designer', 'student', 'other'].map(job => (
              <TouchableOpacity
                key={job}
                style={[styles.jobButton, {
                  backgroundColor: form.job === job ? '#007bff' : '#f8f9fa'
                }]}
                onPress={() => updateForm('job', job)}
              >
                <Text style={{
                  color: form.job === job ? '#fff' : '#333'
                }}>{job}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View style={styles.formActions}>
        <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
          <Text style={styles.submitButtonText}>제출</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
          <Text style={styles.resetButtonText}>초기화</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

// ===== 6단계: 숫자 배열 State로 차트 만들기 =====
const ChartExample: React.FC = () => {
  const [data, setData] = useState<number[]>([10, 20, 15, 30, 25]);
  const maxValue = Math.max(...data, 1);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const addData = () => {
    const newValue = Math.floor(Math.random() * 50) + 1;
    setData([...data, newValue]);
  };

  const clearData = () => {
    setData([]);
  };

  return (
    <View style={styles.exampleBox}>
      <Text style={styles.title}>6. 숫자 배열 State로 차트 만들기</Text>
      <Text style={styles.subtitle}>데이터 개수: {data.length}</Text>

      <View style={styles.chartContainer}>
        {data.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.chartBar, {
              height: (value / maxValue) * 100,
              backgroundColor: selectedIndex === index ? '#e74c3c' : '#3498db'
            }]}
            onPress={() => setSelectedIndex(selectedIndex === index ? -1 : index)}
          >
            <Text style={styles.chartValue}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
 
      {selectedIndex >= 0 && (
        <Text style={styles.selectedInfo}>
          선택된 데이터: {data[selectedIndex]} (인덱스: {selectedIndex})
        </Text>
      )}

      <View style={styles.chartActions}>
        <TouchableOpacity style={styles.addDataButton} onPress={addData}>
          <Text style={styles.addDataButtonText}>데이터 추가</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearDataButton} onPress={clearData}>
          <Text style={styles.clearDataButtonText}>초기화</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

// ===== 7단계: 색상 State로 테마 변경 =====
const ColorThemeExample: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<string>('blue');
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');

  const themes = {
    blue: { primary: '#3498db', secondary: '#2980b9', background: '#ecf0f1' },
    red: { primary: '#e74c3c', secondary: '#c0392b', background: '#ffeaa7' },
    green: { primary: '#2ecc71', secondary: '#27ae60', background: '#d5f4e6' },
    purple: { primary: '#9b59b6', secondary: '#8e44ad', background: '#f4e6ff' }
  };

  const currentColors = themes[currentTheme as keyof typeof themes];

  return (
    <View style={[styles.exampleBox, { backgroundColor: currentColors.background }]}>
      <Text style={[styles.title, { color: currentColors.secondary }]}>
        7. 색상 State로 테마 변경
      </Text>
      
      <Text style={{ color: currentColors.secondary, marginBottom: 10 }}>
        현재 테마: {currentTheme}
      </Text>

      <View style={styles.colorPalette}>
        {Object.keys(themes).map(theme => (
          <TouchableOpacity
            key={theme}
            style={[styles.colorButton, {
              backgroundColor: themes[theme as keyof typeof themes].primary,
              borderWidth: currentTheme === theme ? 3 : 1,
              borderColor: currentTheme === theme ? '#333' : '#ddd'
            }]}
            onPress={() => setCurrentTheme(theme)}
          >
            <Text style={styles.colorButtonText}>{theme}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.themePreview, {
        backgroundColor: currentColors.primary,
        borderColor: currentColors.secondary
      }]}>
        <Text style={styles.themePreviewText}>
          🎨 {currentTheme} 테마 미리보기
        </Text>
      </View>

    </View>
  );
};

// ===== 8단계: 타이머 State (useEffect 활용) =====
const TimerExample: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };
  
  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
    setLapTimes([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLapTimes([...lapTimes, seconds]);
    }
  };

  return (
    <View style={styles.exampleBox}>
      <Text style={styles.title}>8. 타이머 State (useEffect 활용)</Text>

      <View style={[styles.timerDisplay, {
        backgroundColor: isRunning ? '#e8f5e8' : '#f8f9fa'
      }]}>
        <Text style={[styles.timerText, {
          color: isRunning ? '#28a745' : '#6c757d'
        }]}>
          {formatTime(seconds)}
        </Text>
        <Text style={styles.timerStatus}>
          {isRunning ? '🟢 실행 중' : '🔴 정지'}
        </Text>
      </View>

      <View style={styles.timerActions}>
        <TouchableOpacity
          style={[styles.timerButton, {
            backgroundColor: isRunning ? '#dc3545' : '#28a745'
          }]}
          onPress={handleStartStop}
        >
          <Text style={styles.timerButtonText}>
            {isRunning ? '정지' : '시작'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.timerButton, { backgroundColor: '#6c757d' }]}
          onPress={handleReset}
        >
          <Text style={styles.timerButtonText}>리셋</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.timerButton, { backgroundColor: '#007bff' }]}
          onPress={handleLap}
          disabled={!isRunning}
        >
          <Text style={[styles.timerButtonText, {
            opacity: isRunning ? 1 : 0.5
          }]}>랩타임</Text>
        </TouchableOpacity>
      </View>

      {lapTimes.length > 0 && (
        <View style={styles.lapContainer}>
          <Text style={styles.lapTitle}>랩타임 기록:</Text>
          {lapTimes.map((lapTime, index) => (
            <Text key={index} style={styles.lapTime}>
              랩 {index + 1}: {formatTime(lapTime)}
            </Text>
          ))}
        </View>
      )}

    </View>
  );
};

// ===== 9단계: 애니메이션 State =====
const AnimationExample: React.FC = () => {
  const [animValue] = useState(new Animated.Value(0));
  const [scale] = useState(new Animated.Value(1));
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationType, setAnimationType] = useState<'slide' | 'scale' | 'rotate'>('slide');

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200]
  });

  const rotate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  const startSlideAnimation = () => {
    setIsAnimating(true);
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start(() => setIsAnimating(false));
  };

  const startScaleAnimation = () => {
    setIsAnimating(true);
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.5,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start(() => setIsAnimating(false));
  };

  return (
    <View style={styles.exampleBox}>
      <Text style={styles.title}>9. 애니메이션 State</Text>

      <View style={styles.animationContainer}>
        <Animated.View style={[styles.animatedBox, {
          transform: [
            { translateX: animationType === 'slide' ? translateX : 0 },
            { scale: animationType === 'scale' ? scale : 1 },
            { rotate: animationType === 'rotate' ? rotate : '0deg' }
          ]
        }]}>
          <Text style={styles.animatedText}>🎯</Text>
        </Animated.View>
      </View>

      <TouchableOpacity
        style={[styles.startAnimButton, {
          backgroundColor: isAnimating ? '#6c757d' : '#28a745'
        }]}
        onPress={animationType === 'scale' ? startScaleAnimation : startSlideAnimation}
        disabled={isAnimating}
      >
        <Text style={styles.startAnimButtonText}>
          {isAnimating ? '애니메이션 중...' : '애니메이션 시작'}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

// ===== 10단계: 복합 State 관리 (미니 게임) =====
const GameExample: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [health, setHealth] = useState<number>(100);
  const [gameStatus, setGameStatus] = useState<'playing' | 'paused' | 'gameOver'>('paused');
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    
    if (gameStatus === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameStatus('gameOver');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStatus, timeLeft]);

  const startGame = () => {
    setScore(0);
    setLevel(1);
    setHealth(100);
    setTimeLeft(30);
    setGameStatus('playing');
  };

  const pauseGame = () => {
    setGameStatus('paused');
  };

  const earnPoints = () => {
    if (gameStatus === 'playing') {
      const points = Math.floor(Math.random() * 50) + 10;
      setScore(prev => prev + points);
      
      if (score > level * 100) {
        setLevel(prev => prev + 1);
        setHealth(prev => Math.min(100, prev + 20));
      }
    }
  };

  const takeDamage = () => {
    if (gameStatus === 'playing') {
      setHealth(prev => {
        const newHealth = prev - 10;
        if (newHealth <= 0) {
          setGameStatus('gameOver');
          return 0;
        }
        return newHealth;
      });
    }
  };

  return (
    <View style={styles.exampleBox}>
      <Text style={styles.title}>10. 복합 State 관리 (미니 게임)</Text>

      <View style={styles.gameStats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>점수</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>레벨</Text>
          <Text style={styles.statValue}>{level}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>체력</Text>
          <Text style={[styles.statValue, {
            color: health > 50 ? '#28a745' : health > 20 ? '#ffc107' : '#dc3545'
          }]}>{health}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>시간</Text>
          <Text style={[styles.statValue, {
            color: timeLeft > 10 ? '#28a745' : '#dc3545'
          }]}>{timeLeft}초</Text>
        </View>
      </View>

      <View style={styles.healthBar}>
        <View style={[styles.healthFill, {
          width: `${health}%`,
          backgroundColor: health > 50 ? '#28a745' : health > 20 ? '#ffc107' : '#dc3545'
        }]} />
      </View>

      <View style={styles.gameStatus}>
        <Text style={[styles.gameStatusText, {
          color: gameStatus === 'playing' ? '#28a745' : 
                 gameStatus === 'paused' ? '#ffc107' : '#dc3545'
        }]}>
          {gameStatus === 'playing' ? '🎮 게임 중' :
           gameStatus === 'paused' ? '⏸️ 일시정지' : '💀 게임 오버'}
        </Text>
      </View>

      {gameStatus === 'playing' ? (
        <View style={styles.gameActions}>
          <TouchableOpacity style={styles.actionButton} onPress={earnPoints}>
            <Text style={styles.actionButtonText}>⭐ 점수 획득</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#dc3545' }]} 
            onPress={takeDamage}
          >
            <Text style={styles.actionButtonText}>💥 데미지</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#ffc107' }]} 
            onPress={pauseGame}
          >
            <Text style={styles.actionButtonText}>⏸️ 일시정지</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.startGameButton} onPress={startGame}>
          <Text style={styles.startGameButtonText}>
            {gameStatus === 'gameOver' ? '🔄 다시 시작' : '🚀 게임 시작'}
          </Text>
        </TouchableOpacity>
      )}

      {gameStatus === 'gameOver' && (
        <View style={styles.gameOverBox}>
          <Text style={styles.gameOverText}>최종 점수: {score}</Text>
          <Text style={styles.gameOverText}>달성 레벨: {level}</Text>
        </View>
      )}
    </View>
  );
};

// ===== 메인 앱 컴포넌트 =====
export default function App() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>React Native State 학습</Text>
        <Text style={styles.headerSubtitle}>동적 UI 변경으로 배우는 10가지 State 활용법</Text>
      </View>   

      <CounterExample />
      <TextExample />
      <ToggleExample />
      <ListExample />
      <FormExample />
      <ChartExample />
      <ColorThemeExample />
      <TimerExample />
      <AnimationExample />
      <GameExample />        

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🎉 State 학습 완료! 이제 동적이고 인터랙티브한 앱을 만들 수 있습니다.
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
    backgroundColor: '#6f42c1',
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
    textAlign: 'center',
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
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  // 카운터 스타일
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  countDisplay: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  countText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  // 텍스트 예제 스타일
  messageBox: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  smallButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  // 토글 예제 스타일
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  hiddenBox: {
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  likeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  likeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // 리스트 예제 스타일
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
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
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  todoList: {
    maxHeight: 150,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
    marginVertical: 2,
  },
  todoText: {
    flex: 1,
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
  // 폼 예제 스타일
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  jobContainer: {
    marginVertical: 10,
  },
  jobButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginVertical: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  successBox: {
    backgroundColor: '#d4edda',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  successTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#155724',
    marginBottom: 5,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  resetButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  // 차트 예제 스타일
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 120,
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  chartBar: {
    width: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  chartValue: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  selectedInfo: {
    textAlign: 'center',
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  chartActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addDataButton: {
    backgroundColor: '#17a2b8',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addDataButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  clearDataButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  clearDataButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // 색상 테마 예제 스타일
  colorPalette: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  colorButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  colorButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  themePreview: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
  },
  themePreviewText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // 타이머 예제 스타일
  timerDisplay: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  timerStatus: {
    fontSize: 14,
    marginTop: 5,
  },
  timerActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  timerButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  timerButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  lapContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  lapTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lapTime: {
    fontSize: 12,
    color: '#6c757d',
    marginVertical: 1,
  },
  // 애니메이션 예제 스타일
  animationContainer: {
    height: 100,
    justifyContent: 'center',
    marginVertical: 15,
  },
  animatedBox: {
    width: 50,
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedText: {
    fontSize: 24,
  },
  animationControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  animButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  startAnimButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  startAnimButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  // 게임 예제 스타일
  gameStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  healthBar: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    marginVertical: 10,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
    borderRadius: 4,
  },
  gameStatus: {
    alignItems: 'center',
    marginVertical: 10,
  },
  gameStatusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  actionButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  startGameButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  startGameButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameOverBox: {
    backgroundColor: '#f8d7da',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  gameOverText: {
    color: '#721c24',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: 'black',
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