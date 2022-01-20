import './App.css';
import { useState } from 'react'
import _ from 'lodash'
import { Route, Switch } from 'react-router-dom'

import WorkoutData from './components/WorkoutData';
import MainPage from './components/MainPage.js';
import Setting from './components/Setting.js';
import StartWorkout from './components/StartWorkout';

function App() {
  const [workoutData, setWorkoutData] = useState(WorkoutData)

  // const [lastDate, setLastDate] = useState(localStorage.getItem('마지막 운동'))
  const [whichWorkout, setWhichWorkout] = useState(localStorage.getItem('워크아웃'))
  const [squat, setSquat] = useState(Number(localStorage.getItem('스쿼트')))
  const [benchPress, setBenchPress] = useState(Number(localStorage.getItem('벤치프레스')))
  const [barbellRow, setBarbellRow] = useState(Number(localStorage.getItem('바벨로우')))
  const [overheadPress, setOverheadPress] = useState(Number(localStorage.getItem('오버헤드프레스')))
  const [deadLift, setDeadLift] = useState(Number(localStorage.getItem('데드리프트')))

  const [thisTurnWorkout, setThisTurnWorkout] = useState([])
  const [currentExerciseIndex, setCurrentExcerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(0)
  const [tellCurrentWorkout, setTellCurrentWorkout] = useState(true)
  const [tellRestTime, setTellRestTime] = useState(false)
  const [tellFinishedWorkout, setTellFinishedWorkout] = useState(false)
  console.log('check:',thisTurnWorkout)

  // const test = workoutData.filter(data => (data.setA))
  const getWorkoutA = _.filter(workoutData, {workoutA : true})
  const workoutA = getWorkoutA
  const getWorkoutB = _.filter(workoutData, {workoutB : true})
  const workoutB = getWorkoutB

  const latestData = {
    workout: whichWorkout,
    squat: squat,
    benchPress: benchPress,
    barbellRow: barbellRow,
    overheadPress: overheadPress,
    deadLift: deadLift
  }

  const onStartWorkout = () => {
    if (whichWorkout === 'workoutA') {
      setThisTurnWorkout(
        [{
          title: '스쿼트',
          weight: squat,
          round: 5,
          results: []
        }, {
          title: '벤치프레스',
          weight: benchPress,
          round: 5,
          results: []
        }, {
          title: '바벨로우',
          weight: barbellRow,
          round: 5,
          results: []
        }])
    } else {
      setThisTurnWorkout(
        {
          title: '스쿼트',
          weight: squat,
          round: 5,
          results: []
        },{
          title: '오버헤드프레스',
          weight: overheadPress,
          round: 5,
          results: []
        }, {
          title: '데드리프트',
          weight: deadLift,
          round: 1,
          results: []
        })
    }
    setCurrentExcerciseIndex(0)
    setCurrentSet(1)
  }

  const onSetEnd = (result) => {
    const updatedWorkout = [...thisTurnWorkout]
    const currentExcercise = updatedWorkout[currentExerciseIndex]
    updatedWorkout[currentExerciseIndex].results.push(result)
    setThisTurnWorkout(updatedWorkout)
    


    if (currentExerciseIndex > 2) {
      setTellCurrentWorkout(false)
      setTellFinishedWorkout(true)
    } else if (currentSet >= currentExcercise.round) {
      setCurrentExcerciseIndex(currentExerciseIndex + 1) // workout title
      setCurrentSet(1) // 1세트, 2세트 ...
    } else {
      setCurrentSet(currentSet + 1) // 1세트, 2세트 ...
    }

    setTellCurrentWorkout(false)
    setTellRestTime(true)
  }

  const onRestEnd = (value) => {
    setTellCurrentWorkout(value)
    setTellRestTime(!value)
  }

  console.log('thisTurnWorkout', thisTurnWorkout)

  // MainPage 마지막 운동 날짜 구하기
  let getDate = () => {
    let now = new Date()
    let todayYear = now.getFullYear()
    let todayMonth = now.getMonth() + 1
    let todayDate = now.getDate()

    return todayYear + '. ' + todayMonth + '. ' + todayDate
  }

  // 운동 종료 후 자동 무게 증량 값 저장
  const onFinishedWorkoutDataAutoSave = (newData) => {
    const doDay = getDate()
    localStorage.setItem(doDay, JSON.stringify(latestData))

    setWhichWorkout(newData.workout)
    setSquat(newData.squat)
    setBenchPress(newData.benchPress)
    setBarbellRow(newData.barbellRow)
    setOverheadPress(newData.overheadPress)
    setDeadLift(newData.deadLift)
    localStorage.setItem('워크아웃', newData.workout)
    localStorage.setItem('스쿼트', newData.squat.toString())
    localStorage.setItem('벤치프레스', newData.benchPress.toString())
    localStorage.setItem('바벨로우', newData.barbellRow.toString())
    localStorage.setItem('오버헤드프레스', newData.overheadPress.toString())
    localStorage.setItem('데드리프트', newData.deadLift.toString())
  }

  // SettingForm input 값 저장하기
  const onSettingFormSubmit = () => {
    localStorage.setItem('워크아웃', whichWorkout)
    localStorage.setItem('스쿼트', squat.toString())
    localStorage.setItem('벤치프레스', benchPress.toString())
    localStorage.setItem('바벨로우', barbellRow.toString())
    localStorage.setItem('오버헤드프레스', overheadPress.toString())
    localStorage.setItem('데드리프트', deadLift.toString())
  }
   
  const onSaveData = () => {
    localStorage.setItem('마지막 운동', getDate.toString())
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
            onSaveData={onSaveData}
            latestData={latestData}
            squat={squat}
            benchPress={benchPress}
            barbellRow={barbellRow}
            overheadPress={overheadPress}
            deadLift={deadLift}
            workoutA={workoutA}
            workoutB={workoutB}
            whichWorkout={whichWorkout} 
            onWorkoutSet={onWorkoutSet}
            onSquatChange={onSquatChange}
            onBenchPressChange={onBenchPressChange}
            onBarbellRowChange={onBarbellRowChange}
            onOverheadPressChange={onOverheadPressChange}
            onDeadLiftChange={onDeadLiftChange}
            onSubmit={onSettingFormSubmit}
            onFinishedWorkoutDataAutoSave={onFinishedWorkoutDataAutoSave}
            thisTrunWorkout={thisTurnWorkout}
            currentSet={currentSet}
            currentExcerciseIndex={currentExerciseIndex}
            onSetEnd={onSetEnd}
            tellCurrentWorkout={tellCurrentWorkout}
            tellRestTime={tellRestTime}
            tellFinishedWorkout={tellFinishedWorkout}
            onRestEnd={onRestEnd}
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
