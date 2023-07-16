// import LogInOutGoogle as ...
import styles from "components/elements/LogInOutGoogle/LogInOutGoogle.module.scss"
import Container from 'react-bootstrap/Container'
import RenderLogInOutGoogle from "components/elements/LogInOutGoogle"

// caching
import Redis from 'ioredis'

// utils
import {SERIALIZESTRING, PARSESERIALIZEDSTRING } from "utility/UtilityValues"


export default function logInOutGoogle(props) {
    let { serializedRedis } = props
    serializedRedis = PARSESERIALIZEDSTRING(serializedRedis)
    console.log('serializedRedis')
    console.log(serializedRedis)

    


    // import redux state
    return (
        <RenderLogInOutGoogle></RenderLogInOutGoogle>
    )    
}

export async function getServerSideProps() {
    // let redis = new Redis("127.0.0.1:6379"); // Example Redis endpoint
    // const redisData = await redis.incr("counter");
    // redis.quit()
    const redisClient = new Redis();
    // const serializedRedis = JSON.stringify(redisClient)
    const serializedRedis = SERIALIZESTRING(redisClient)
    return { props: { serializedRedis } }
  }