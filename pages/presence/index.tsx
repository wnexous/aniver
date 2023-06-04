import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./styles.module.scss"
interface apiResp {
    username: string
}
export default function Presence() {
    const [getApi, setGetApi] = useState<apiResp[]>()
    useEffect(() => {
        axios.get("/api/aniver")
            .then(data => {
                setGetApi(data.data)
            })
    }, [])
    return <section>
        <h1>Lista dos que vão vir</h1>
        <div className={styles.presence}>
            {getApi && getApi.map((usr, i) => <div key={i}>
                <span>{i + 1}</span>{usr.username}
            </div>)}
        </div>
    </section>
}