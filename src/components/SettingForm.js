import { Link } from "react-router-dom"

import './SettingForm.css';

function SettingForm (props) {
  const onSquatChange = (e) => {
    const weight = parseFloat(e.target.value)
    props.onSquatChange(weight)
  }
  const onBenchPressChange = (e) => {
    const weight = parseFloat(e.target.value)
    props.onBenchPressChange(weight)
  }
  const onBarbellRowChange = (e) => {
    const weight = parseFloat(e.target.value)
    props.onBarbellRowChange(weight)
  }
  const onOverheadPressChange = (e) => {
    const weight = parseFloat(e.target.value)
    props.onOverheadPressChange(weight)
  }
  const onDeadLiftChange = (e) => {
    const weight = parseFloat(e.target.value)
    props.onDeadLiftChange(weight)
  }

  const onFormSubmit = () => {
    props.onSubmit()
  }
  
  return (
    <div className="setting-form">
      <div className="workout-list">
        <label> 스쿼트 </label>
        <input type='number' value={props.squat} onChange={onSquatChange} /> <span><span>kg</span></span>
      </div>
      <div className="workout-list"> 
        <label> 벤치프레스 </label>
        <input type='number' value={props.benchPress} onChange={onBenchPressChange} /> <span>kg</span>
      </div>
      <div className="workout-list"> 
        <label> 바벨로우 </label>
        <input type='number' value={props.barbellRow} onChange={onBarbellRowChange} /> <span>kg</span>
      </div>
      <div className="workout-list"> 
        <label> 오버헤드프레스 </label>
        <input type='number' value={props.overheadPress} onChange={onOverheadPressChange} /> <span>kg</span>
      </div>
      <div className="workout-list"> 
        <label> 데드리프트 </label>
        <input type='number' value={props.deadLift} onChange={onDeadLiftChange} /> <span>kg</span>
      </div>
      <Link to="/">
        <button
          className='btn btn-save'
          type='submit'
          onClick={onFormSubmit}
        > 저장하기
        </button>
      </Link>
    </div>
  )
}

export default SettingForm;