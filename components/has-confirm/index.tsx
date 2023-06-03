import styles from "./styles.module.scss"


interface hasconfirmprops {
  name: string
}
export default function HasConfirm(props: hasconfirmprops) {
  return <div>

    <h1>Presença confirmada!</h1>

    <p>obrigado por confirmar sua presença, <b>{props.name}</b></p>

    <div className={styles.questions}>

      <span>
        <strong>onde será? </strong>
        na casa da vó Inês
      </span>
      <span>
        <strong>vai ter bolo? </strong>
        sim
      </span>
      <span>
        <strong>banqueta pra sentar? </strong>
        com certeza
      </span>
      <span>
        <strong>que horas vai ser? </strong>
        16hrs
      </span>
      <span>
        <strong>pix </strong>
        0550a8c9-7628-44de-a877-724c184e1525
      </span>
      <span>
        <strong>dúvidas? </strong>
        <a href="https://wa.me/41998264344">clique para acessar meu whatsapp</a>
      </span>


    </div>
  </div>;
}
