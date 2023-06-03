import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./styles.module.scss"
interface apiResp {
    user: string
}
export default function Presence() {

    const [getApi, setGetApi] = useState<apiResp[]>()


    useEffect(() => {
        axios.get("/api/presence")
            .then(data => {
                setGetApi(data.data)
            })
    }, [])

    return <section>


        <h1>Lista dos que vão vir</h1>

        <div className={styles.presence}>
            {getApi && getApi.map((usr, i) => <div key={i}>
                <span>{i + 1}</span>{usr.user}

            </div>)}
        </div>
    </section>
}