import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react/cjs/react.development';

import './MainPage.css';


function MainPage (props) {

  const workoutA = [props.squat, props.benchPress, props.barbellRow]
  const workoutB = [props.squat, props.overheadPress, props.deadLift]
  // const lastWorkoutDate = props.today()

  const onStartWorkout = () => {
    props.onStartWorkout()
  }

  return (
    <div>
      {
        !props.savedData &&
          <div className='inner'>
            <div className='firstWorkout'>설정을 하고 운동을 시작해보세요!</div>
            <Link to="./setting">
              <button className='btn btn-start'>설정하기</button>
            </Link>
          </div>
      }

      {
        props.savedData &&
          <div className='inner'>
            <div className='main'>
              {/* <div className='dateOfLastWorkout'>
                마지막 운동 일자 : {lastWorkoutDate}
              </div> */}

              <h4>이번 운동</h4>
              <h5>
                {
                  props.whichWorkout === 'workoutA'
                  ? 'A워크아웃'
                  : 'B워크아웃'
                }
              </h5>

              <div className='thisTurnWorkout'>
                <ul className='workoutTitle'>
                  {
                    props.whichWorkout === 'workoutA'
                    ? props.workoutA.map((item) => (
                      <li key={item.id}> {item.title} </li>
                    ))
                    : props.workoutB.map((item) => (
                      <li key={item.id}> {item.title} </li>
                    ))
                  }
                </ul>
                <ul className='recentWeight'>
                  {
                    props.whichWorkout === 'workoutA'
                    ? workoutA.map((weight, i) => {
                      return <li key={i}> {weight} kg </li>
                    })
                    : workoutB.map((weight, i) => {
                      return <li key={i}> {weight} kg </li>
                    })
                  }
                </ul>
              </div>
            </div>

            <div className='setWorkoutValue'>
              <Link to="./setting" className='goSet'>설정 바꾸기</Link>
            </div>

            <div className='main-page-btn-group'>
              <Link to="./start">
                <button className='btn btn-start' onClick={onStartWorkout}>운동 시작하기</button>
              </Link>
              <Link to="/history">
                <button className='btn btn-history'>지난 내역보기</button>
              </Link>
            </div>
        </div>
      }
    </div>
  )
}

export default MainPage;