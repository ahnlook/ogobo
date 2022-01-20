import React from 'react'
// import { Link } from 'react-router-dom'
import SettingForm from './SettingForm';
import './Setting.css';

function Setting (props) {
  const radioBtnHandler = (e) => {
    const clickedBtnValue = e.target.value

    props.onWorkoutSet(clickedBtnValue)
  }

  return (
    <div className='inner'>
      <div className='radio-btn-group'>
        <ul>
          <li>
            워크아웃
          </li>
          <li>
            <input
              type='radio'
              id='workoutA'
              name='workout'
              checked={props.whichWorkout === 'workoutA'}
              value='workoutA'
              onChange={radioBtnHandler}
            />
            <label htmlFor='workoutA'> A </label>
          </li>
          <li>
            <input
              type='radio'
              id='workoutB'
              name='workout'
              checked={props.whichWorkout === 'workoutB'}
              value='workoutB'
              onChange={radioBtnHandler}
            />
            <label htmlFor='workoutB'> B </label>
          </li>
        </ul>
      </div>

      <SettingForm 
        squat={props.squat}
        benchPress={props.benchPress}
        barbellRow={props.barbellRow}
        overheadPress={props.overheadPress}
        deadLift={props.deadLift}
        onSquatChange={props.onSquatChange}
        onBenchPressChange={props.onBenchPressChange}
        onBarbellRowChange={props.onBarbellRowChange}
        onOverheadPressChange={props.onOverheadPressChange}
        onDeadLiftChange={props.onDeadLiftChange}
        onSubmit={props.onSubmit}
      />

    </div>
  )
}

export default Setting;