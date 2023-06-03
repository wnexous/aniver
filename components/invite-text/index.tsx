
import { useEffect, useState } from "react"
import styles from "./styles.module.scss"

import Image from "next/image"

const sleep = async (time: number) => new Promise((resolve) => setTimeout(resolve, time))


interface inviteCardProps {
    onConfirm: () => void
}

export default function InviteText(props: inviteCardProps) {

    const TEXT_TO_WRITE = "Você foi convidado à participar do aniversário de 20 anos do André Dal Negro."
    const SPLITED_TEXT = TEXT_TO_WRITE.split("")
    const DELAY_BETWEEN_WORDS = 100

    const [text, setText] = useState<string>("");

    const startWrite = async (splitedString = [""], indexValue = 0, textString = "") => {

        if (indexValue == splitedString.length) return 0

        textString = textString + splitedString[indexValue]
        indexValue++

        setText(textString)
        await sleep(DELAY_BETWEEN_WORDS)

        startWrite(splitedString, indexValue, textString)

    }

    function recusar() {

        const getButton = document.getElementById("recusar")!


        getButton.style.position = "absolute";

        let x = Math.floor((Math.random() * 90) + 1);
        let y = Math.floor((Math.random() * 90) + 1);

        getButton.style.top = y + "vh";
        getButton.style.left = x + "vw";
    }





    useEffect(() => {

        startWrite(SPLITED_TEXT)

    }, [])



    return (

        <div>
            <p className={styles.drawingText}>

                {text}
            </p>

            <div className={styles.showContent} style={{
                animationDelay: (SPLITED_TEXT.length * DELAY_BETWEEN_WORDS) + 500 + "ms",
            }}>

                Ocorrerá na casa da vovó Inês, dia <b>10/06</b> as <b>16hrs</b>

                <div className={styles.presenceButtons}>
                    <button onClick={props.onConfirm}>Confirmar</button>
                    <button id="recusar" className={styles.recuse} onMouseOver={recusar} onClick={recusar}>Recusar</button>
                </div>

            </div>





        </div>


    )


}