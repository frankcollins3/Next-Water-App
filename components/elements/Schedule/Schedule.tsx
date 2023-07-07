import React from 'react';
import ConnectedReminder from '../../../components/elements/Reminder';
import {connect, useDispatch} from 'react-redux'
import './schedule.css';
import Container from 'react-bootstrap/Container'



 function Schedule(props:any) {
  // hydroSchedule, hydroIntake, handleClick, status, disabled

  const { hydroSchedule, hydroIntake, status, setStatus, disabled, setDisabled, HYDRO_SCHEDULE } = props

  const renderSchedule = () => {
    
    return HYDRO_SCHEDULE.map((time:any, index:number) => (
      
      <ConnectedReminder
        key={index}
        time={time}
        amt={(hydroIntake / hydroSchedule.length) * (index + 1)}
        amtper={hydroIntake / hydroSchedule.length}
        percent={Math.floor(
          (((hydroIntake / hydroSchedule.length) * (index + 1)) / hydroIntake) *
            100 -
            1
        )}
        index={index}
        // handleClick={handleClick}
        status={status}
        setStatus={setStatus}
        disabled={disabled}
        setDisabled={setDisabled}
      />
    ));
  };

  return (
    <Container className="schedule-container">      
      <ul>{renderSchedule()}</ul>
    </Container>
  );
}

const mapStateToProps = (state:any) => ({
  HYDRO_SCHEDULE: state.HYDRO_SCHEDULE,
  HYDRO_DATA: state.HYDRO_DATA,
  HYDRO_INTAKE: state.HYDRO_INTAKE,
  STATUS: state.STATUS,
  DISABLED: state.DISABLED,
})

// const mapDispatchToProps = (dispatch:any) => ({

// })

const ConnectedSchedule = connect(mapStateToProps)(Schedule)
export default ConnectedSchedule