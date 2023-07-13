export default function checkTimeForDisabled(schedule:any, disabled:any, SET_DISABLED:any) {

    const newDisabled = schedule.map((time:any, index:number) => {
        const scheduledTime = new Date();
        scheduledTime.setHours(parseInt(time) - 1);    
        // if the current time is < scheduled time (the time has not passed)
        // return false
        return (
          new Date().getTime() > scheduledTime.getTime() ||
          disabled[index] === 'check'
        );
      });
    
      SET_DISABLED({ payload: newDisabled });
    
}
