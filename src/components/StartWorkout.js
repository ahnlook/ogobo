import { Link } from 'react-router-dom';
import './StartWorkout.css';

const StartWorkout = (props) => {

  const currentExercise = props.thisTurnWorkout[props.currentExerciseIndex]

  const onSuccessBtn = () => {
    props.onSetEnd('success')
  }
  const onBarelySuccessBtn = () => {
    props.onSetEnd('barelySuccess')
  }
  const onFailBtn = () => {
    props.onSetEnd('fail')
  }

  const onBreakTime = () => {
    props.onBreakTime(false)
  }

  const onFinished = () => {
    props.onFinished(false)
  }

  return (
    <div>
      {/* 현재 진행 중인 운동 종목과 운동 무게, 세트 보여주기 */}
      {
        props.breakTime
        &&
        <div className='next-text'> Next </div>
      }
      {
        !props.finished
        &&
        <div className='workout-box'>
          <span>{ currentExercise.title }</span>
          <span>{ currentExercise.weight }kg</span>
          <span>{ props.currentSet }세트</span>
        </div>
      }
      <div className='inner'>
        {/* 한 세트가 끝나면 휴식중 보여주기 */}
        {
          props.breakTime
          &&
          <div>
            <div className='rest-modal'>휴식 중입니다.</div>
            <button className='btn btn-rest' onClick={onBreakTime}>운동 시작하기</button>
          </div>
        }

        {/* 모든 종목, 모든 세트가 끝나면 운동 종료 보여주기 */}
        {
          props.finished
          && 
          <div>
            <div className='finish-modal'>운동을 마쳤습니다!</div>
            <Link to="/">
              <button className='btn btn-finish' onClick={onFinished}>홈으로</button>
            </Link>
         </div>
        }

        {
          (!props.breakTime && !props.finished)
          &&
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