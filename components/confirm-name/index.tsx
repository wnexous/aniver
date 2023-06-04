import { useState } from "react"
import styles from "./styles.module.scss"
import axios from "axios"

interface dataProps {
    name: string, hash: string
}
interface confirmNameProps {
    onConfirm: (e: dataProps) => void
}
export default function ConfirmName(props: confirmNameProps) {

    const [name, setName] = useState<string>("")
    const [enableBtn, setEnableBtn] = useState(false)
    const [showBtn, setShowBtn] = useState(false)

    function confirm() {

        setEnableBtn(true)

        axios.post("/api/aniver", {
            data: { name }
        })
            .then(data => {
                props.onConfirm({ name, hash: data.data.hash })
            })
    }

    return (

        <div className={styles.content}>

            <p>Por favor, insira seu nome no campo abaixo</p>
            <input value={name} onChange={change => {

                const Value = change.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').substring(0, 64)
                setName(Value)
                setShowBtn(Value.length > 0)

            }} title="insira seu nome" aria-label="insira seu nomezinho aqui :)" type="text" name="username" placeholder="digite seu lindo nome aqui" />

            {showBtn && (<button disabled={enableBtn} onClick={() => {
                confirm()
            }}> {!enableBtn && "Confirmar" || "Adicionando presença..."}

            </button>)}
        </div >
    )
}