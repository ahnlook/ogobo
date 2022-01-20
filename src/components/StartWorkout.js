import { Link } from 'react-router-dom';
import { useState } from 'react';

import './StartWorkout.css';

const StartWorkout = (props) => {
  const currentExcercise = props.thisTrunWorkout[props.currentExcerciseIndex]

  const latestData = props.latestData
 
  const workoutSet = latestData.workout
  // const round = ['1세트', '2세트', '3세트', '4세트', '5세트']
  // const workoutATitle = [props.workoutA[0].title,props.workoutA[1].title,props.workoutA[2].title]
  const workoutBTitle = [props.workoutB[0].title,props.workoutB[1].title,props.workoutB[2].title]
  // const workoutAWeight = [latestData.squat, latestData.benchPress, latestData.barbellRow]
  // const workoutBWeight = [latestData.squat, latestData.overheadPress, latestData.deadLift]
  
  const [roundIndex, setRoundIndex] = useState(0)
  const [workoutIndex, setWorkoutIndex] = useState(0)
  // const [showWorkoutBox, setShowWorkoutBox] = useState(true)
  const [finishBtn, setFinishBtn] = useState(true)
  const [restModal, setRestModal] = useState(false)
  const [finishModal, setFinishModal] = useState(false)
  const [clickedData, setClickedData] = useState([]) // temp 한종목 5세트 결과값 담김
  console.log('clickedDate:', clickedData)

  // test

//   const currentWorkoutTitle =
//     workoutSet === 'workoutA'
//     ? workoutATitle[workoutIndex]
//     : workoutBTitle[workoutIndex]
// z  
  // const onSaveWorkoutDetail = () => {
  //   if (
  //   (clickedDataLen === 5)
  //   ||((workoutBTitle[workoutIndex] === '데드리프트') && (clickedDataLen === 1)))
  //   {
  //     const tempTitle = workoutBTitle[workoutIndex]
  //     allClickedData[tempTitle] = clickedData

  //     setWorkoutDetail((prevTotalClickedDataObj) => {
  //       return [...prevTotalClickedDataObj, allClickedData]
  //     })
  //     setClickedData([])
  //   }
  // }


  // const saveDetail = () => {
  //   setWorkoutDetail((prevTotalClickedDataObj) => {
  //     return [...prevTotalClickedDataObj, allClickedData]
  //   })
  // }

  //

  // const workoutABox= (
  //   <div className='workout-box'>
  //     <span>{ currentExcercise.title }</span>
  //     <span>{ currentExcercise.weight }kg</span>
  //     <span>{ props.currentSet }</span>
  //   </div>
  // )

  // const workoutBBox = (
  //   <div className='workout-box'>
  //     <span>{ workoutBTitle[workoutIndex] }</span>
  //     <span>{ workoutBWeight[workoutIndex] }kg</span>
  //     <span>{ round[roundIndex] }</span>
  //   </div>
  // )

  const autoSave = () => {
    const addWeightNum = 2.5
    const newData = {...latestData}
    
    if (newData.workout === 'workoutA') {
      newData.workout = 'workoutB'
      newData.squat = newData.squat + addWeightNum
      newData.benchPress = newData.benchPress + addWeightNum
      newData.barbellRow = newData.barbellRow + addWeightNum
    } else {
      newData.workout = 'workoutA'
      newData.squat = newData.squat + addWeightNum
      newData.overheadPress = newData.overheadPress + addWeightNum
      newData.deadLift = newData.deadLift + (addWeightNum * 2)
    }

    props.onFinishedWorkoutDataAutoSave(newData)
  }

  // const onNextStep = (tempData) => {
  //   // setClickedData(tempData)

  //   if (
  //     (roundIndex === 4 && workoutIndex === 2) 
  //     || (workoutSet === 'workoutB' && (worko utBTitle[workoutIndex] === '데드리프트'))
  //     ) {
  //     // saveDetail() 
  //     setFinishModal(true)
  //     autoSave()
  //     setShowWorkoutBox(false)

  //   } else if (roundIndex < 4) {
  //     setRoundIndex(roundIndex + 1) // OK

  //   } else {
  //     setRoundIndex(0) // OK
  //     setWorkoutIndex(workoutIndex + 1) // OK
  //     // clickekData set & remove
  //   }

  //   setRestModal(true)
  //   setFinishBtn(false)
  // }

  const onSuccessBtn = () => {
    props.onSetEnd('success')
  }
  const onBarelySuccessBtn = () => {
    props.onSetEnd('barelySuccess')
  }
  const onFailBtn = () => {
    props.onSetEnd('fail')
  }

  const onRestModalBtn = () => {
    props.onRestEnd(true)
  }

  const onFinishModalBtn = () => {

  }

  return (
    <div>
      {/* 현재 진행 중인 운동 종목과 운동 무게, 세트 보여주기 */}
      {
        (props.tellRestTime && !props.tellFinishedWorkout)
        && <div className='next-text'> Next </div>
      }
      {
        (props.tellFinishedWorkout === true)
        &&
          <div className='workout-box'>
            <span>{ currentExcercise.title }</span>
            <span>{ currentExcercise.weight }kg</span>
            <span>{ props.currentSet }세트</span>
          </div>
      }
      <div className='inner'>
        {/* 한 세트가 끝나면 휴식중 보여주기 */}
        {
          (props.tellRestTime && !props.tellFinishedWorkout)
          &&
          <div>
            <div className='rest-modal'>휴식 중입니다.</div>
            <button className='btn btn-rest' onClick={onRestModalBtn}>운동 시작하기</button>
          </div>
        }

        {/* 모든 종목, 모든 세트가 끝나면 운동 종료 보여주기 */}
        {
          props.thisTrunWorkout && props.tellFinishedWorkout
          && 
          <div>
            <div className='finish-modal'>운동을 마쳤습니다!</div>
            <Link to="/">
              <button className='btn btn-finish' onClick={props.onFinishModalBtn}>홈으로</button>
            </Link>
          </div>
        // <FinishModal onFinishModalBtn={onFinishModalBtn} />
        }


        {
        props.tellCurrentWorkout &&
        // finishBtn &&
          <div className="doing-btn-group">
            <button className='btn btn-success' onClick={onSuccessBtn}>성공</button>
            <button className='btn btn-barely-success' onClick={onBarelySuccessBtn}>겨우 성공</button>
            <button className='btn btn-fail' onClick={onFailBtn}>실패</button>
            <Link to="/">
              <button className='btn btn-close'>운동 종료</button>
            </Link>
          </div>
        }
      </div>

    </div>
  )
}

export default StartWorkout;


// const RestModal = (props) => {
//   const onRestModalBtn = (e) => {
//     const restModalVal = e.target.value
//     props.onRestModalBtn(restModalVal)
//   }
//   return (
//     <div>
//       <div className='rest-modal'>휴식 중입니다.</div>
//       <button className='btn btn-rest' onClick={onRestModalBtn}>운동 시작하기</button>
//     </div>
//   )
// }

const FinishModal = (props) => {
  return (
    <div>
      <div className='finish-modal'>운동을 마쳤습니다!</div>
      <Link to="/">
        <button className='btn btn-finish' onClick={props.onFinishModalBtn}>홈으로</button>
      </Link>
    </div>
  )
}