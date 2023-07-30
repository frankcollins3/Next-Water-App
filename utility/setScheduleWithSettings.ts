export default async function setScheduleWithSettings (settings:any, setState:any) {
    console.log('settings from schedule')
    console.log(settings)
    let schedule:number[] = [];
    if (!settings) {
        return
    } else if (settings) {              
      const SchedulePromise = new Promise(async(resolve:any, reject:any) => {
        const setSchedule = () => { for (let i = settings.start_time; i <= settings.end_time; i += settings.reminder) { schedule.push(i)} }
        await setSchedule()
        resolve(schedule.length ? schedule : "schedule fail")
      })
      return SchedulePromise
      .then( (schedule) => {
        setState({payload: schedule})
        return schedule
      })
    }
}
    // SET_HYDRO_SCHEDULE({payload: schedule})
