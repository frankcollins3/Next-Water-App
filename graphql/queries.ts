export const allDBsettingsquery = `query { allDBsettings { id, height, weight, age, start_time, end_time, reminder, users_id } }`
export const allDBdataquery = `query { allDBdata { id, google_id, date, progress, weekday, status, users_id } }`
export const allDBusersquery = `query { allDBusers { username, email, password, icon, google_id  } }`
// id | google_id | date | progress | weekday | status | users_id 
