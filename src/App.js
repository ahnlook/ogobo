import './App.css';
import { useState } from 'react'
import _ from 'lodash'
import { Route, Switch } from 'react-router-dom'

import WorkoutData from './components/WorkoutData';
import MainPage from './components/MainPage.js';
import Setting from './components/Setting.js';
import StartWorkout from './components/StartWorkout';

function App() {
  const [savedData, setSavedData] = useState(localStorage.getItem('isFirstStart'))
  console.log(savedData)
  
  const [workoutData, setWorkoutData] = useState(WorkoutData)

  // const [lastDate, setLastDate] = useState(localStorage.getItem('마지막 운동'))
  const [whichWorkout, setWhichWorkout] = useState(localStorage.getItem('워크아웃'))
  const [squat, setSquat] = useState(Number(localStorage.getItem('스쿼트')))
  const [benchPress, setBenchPress] = useState(Number(localStorage.getItem('벤치프레스')))
  const [barbellRow, setBarbellRow] = useState(Number(localStorage.getItem('바벨로우')))
  const [overheadPress, setOverheadPress] = useState(Number(localStorage.getItem('오버헤드프레스')))
  const [deadLift, setDeadLift] = useState(Number(localStorage.getItem('데드리프트')))

  const [thisTurnWorkout, setThisTurnWorkout] = useState([])
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(0)

  const [breakTime, setBreakTime] = useState(false)
  const [finished, setFinished] = useState(false)

  // const test = workoutData.filter(data => (data.setA))
  const getWorkoutA = _.filter(workoutData, {workoutA : true})
  const workoutA = getWorkoutA
  const getWorkoutB = _.filter(workoutData, {workoutB : true})
  const workoutB = getWorkoutB

  const onStartWorkout = () => {
    if (whichWorkout === 'workoutA') {
      setThisTurnWorkout(
        [{
          title: '스쿼트',
          weight: squat,
          round: 5,
          results: [],
          checkFail: false,
          addWeight: 2.5
        }, {
          title: '벤치프레스',
          weight: benchPress,
          round: 5,
          results: [],
          checkFail: false,
          addWeight: 2.5
        }, {
          title: '바벨로우',
          weight: barbellRow,
          round: 5,
          results: [],
          checkFail: false,
          addWeight: 2.5
        }])
    } else {
      setThisTurnWorkout(
        [{
          title: '스쿼트',
          weight: squat,
          round: 5,
          results: [],
          checkFail: false,
          addWeight: 2.5
        },{
          title: '오버헤드프레스',
          weight: overheadPress,
          round: 5,
          results: [],
          checkFail: false,
          addWeight: 2.5
        }, {
          title: '데드리프트',
          weight: deadLift,
          round: 1,
          results: [],
          checkFail: false,
          addWeight: 5
        }])
    }
    setCurrentExerciseIndex(0)
    setCurrentSet(1)
  }

  const onSetEnd = (result) => {
    const updatedWorkout = [...thisTurnWorkout]
    const currentExercise = updatedWorkout[currentExerciseIndex]
    currentExercise.results.push(result)

    result === 'fail' &&
    (currentExercise.checkFail = true)

    const addedWeight =
      currentExercise.checkFail
        ? currentExercise.weight
        : (currentExercise.weight + currentExercise.addWeight)

    const setAddedWeight = () => {
      localStorage.setItem(currentExercise.title, addedWeight.toString())
    }

    console.log('addedWeight', addedWeight)
    console.log('currentExercise.weight:',currentExercise.weight)
    console.log('currentExercise.addWeight',currentExercise.addWeight)
    setThisTurnWorkout(updatedWorkout)

    if (currentSet === currentExercise.round && currentExerciseIndex === 2) {
      setFinished(true)
      setAddedWeight()
      onChangeWorkout()
    } else if (currentSet < currentExercise.round) {
      setCurrentSet(currentSet + 1) // 다음 세트
      setBreakTime(true)
    } else {
      setCurrentExerciseIndex(currentExerciseIndex + 1) // 다음 종목
      setCurrentSet(1) // 1세트부터
      setBreakTime(true)
      setAddedWeight()
    }
  }

  const onBreakTime = (value) => {
    setBreakTime(value)
  }
  const onFinished = (value) => {
    setFinished(value)
  }

  const onChangeWorkout = () => {
    if (whichWorkout === 'workoutA') {
      localStorage.setItem('워크아웃', 'workoutB')
      setWhichWorkout('workoutB')
    } else {
      localStorage.setItem('워크아웃', 'workoutA')
      setWhichWorkout('workoutA')
    }

    setSquat(Number(localStorage.getItem('스쿼트')))
    setBenchPress(Number(localStorage.getItem('벤치프레스')))
    setBarbellRow(Number(localStorage.getItem('바벨로우')))
    setOverheadPress(Number(localStorage.getItem('오버헤드프레스')))
    setDeadLift(Number(localStorage.getItem('데드리프트')))
  }

  // MainPage 마지막 운동 날짜 구하기
  let getDate = () => {
    let now = new Date()
    let todayYear = now.getFullYear()
    let todayMonth = now.getMonth() + 1
    let todayDate = now.getDate()

    return todayYear + '. ' + todayMonth + '. ' + todayDate
  }

  const checkFirstStart = () => {
    if (!squat && !benchPress && !barbellRow && !overheadPress && !deadLift) {
      setSavedData(false)
      localStorage.setItem('isFirstStart', false)
    } else {
        setSavedData(true)
      }
  }

  // SettingForm input 값 저장하기
  const onSettingFormSubmit = () => {
    localStorage.setItem('워크아웃', whichWorkout)
    localStorage.setItem('스쿼트', squat.toString())
    localStorage.setItem('벤치프레스', benchPress.toString())
    localStorage.setItem('바벨로우', barbellRow.toString())
    localStorage.setItem('오버헤드프레스', overheadPress.toString())
    localStorage.setItem('데드리프트', deadLift.toString())
    checkFirstStart()
  }

  const onWorkoutSet = (workoutSet) => {
    setWhichWorkout(workoutSet)
  }

  const onSquatChange = (weight) => {
    setSquat(weight)
  }
  const onBenchPressChange = (weight) => {
    setBenchPress(weight)
  }
  const onBarbellRowChange = (weight) => {
    setBarbellRow(weight)
  }
  const onOverheadPressChange = (weight) => {
    setOverheadPress(weight)
  }
  const onDeadLiftChange = (weight) => {
    setDeadLift(weight)
  }

  return (

    <div className="App">

      <div className='header'>
        <p>Strong Lifts 5×5</p>
      </div>

      <Switch>

      {/* 메인 페이지 */}
        <Route exact path="/">
          <MainPage
            today={getDate}
            savedData={savedData}
            squat={squat}
            benchPress={benchPress}
            barbellRow={barbellRow}
            overheadPress={overheadPress}
            deadLift={deadLift}
            workoutA={workoutA}
            workoutB={workoutB}
            whichWorkout={whichWorkout} 
            workoutData={workoutData}
            onStartWorkout={onStartWorkout}
          />
        </Route>

      {/* 설정 페이지 */}
        <Route path="/setting">
          <Setting
            squat={squat}
            benchPress={benchPress}
            barbellRow={barbellRow}
            overheadPress={overheadPress}
            deadLift={deadLift}
            whichWorkout={whichWorkout}
            onWorkoutSet={onWorkoutSet}
            workoutData={workoutData}
            setWorkoutData={setWorkoutData}
            onSquatChange={onSquatChange}
            onBenchPressChange={onBenchPressChange}
            onBarbellRowChange={onBarbellRowChange}
            onOverheadPressChange={onOverheadPressChange}
            onDeadLiftChange={onDeadLiftChange}
            onSubmit={onSettingFormSubmit}
          />
        </Route>

        <Route path="/start">
          <StartWorkout
            today={getDate}
            thisTurnWorkout={thisTurnWorkout}
            currentSet={currentSet}
            currentExerciseIndex={currentExerciseIndex}
            onSetEnd={onSetEnd}
            onBreakTime={onBreakTime}
            breakTime={breakTime}
            onFinished={onFinished}
            finished={finished}
          />
        </Route>

        {/* <Route path="/history">
          <WorkoutHistory

          />
        </Route> */}

      </Switch>

    </div>
  )
}


export default App;
