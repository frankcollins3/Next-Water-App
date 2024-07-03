import axios from "axios"
import { addUserSettingsQueryStringFunc } from "graphql/queries"

export default async function addUserSettingsFunc(age, height, weight, start_time, end_time, reminder, activity, users_id) {
    console.log("addUserSettings")
    console.log(age)
    console.log(height)
    console.log(weight)
    console.log(start_time)
    console.log(end_time)
    console.log(reminder)
    console.log(activity)
    console.log(users_id)

    const addUserSettingsQueryString = await addUserSettingsQueryStringFunc(age, height, weight, start_time, end_time, reminder, activity, users_id)
    console.log(addUserSettingsQueryString)

    const postUserSettings = await axios.post('/api/graphql', { query: `${addUserSettingsQueryString}`})
    console.log('postuser', postUserSettings)
    return postUserSettings
    
}

// axios
//   .post('/api/graphql', {
//     query: `
//       mutation {
//         addUserSettings(
//           id: 3,
//           age: 25,
//           height: 90,
//           weight: 190,
//           start_time: 2,
//           end_time: 10,
//           reminder: 1,
//           activity: 1,
//           users_id: 3
//         ) {
//           id
//           age
//           height
//           weight
//           start_time
//           end_time
//           reminder
//           activity
//           users_id
//         }
//       }
//     `
//   })