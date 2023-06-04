import InviteText from '@/components/invite-text'
import Head from 'next/head'
import Image from 'next/image'
import styles from "../styles/styles.module.scss"
import { useEffect, useState } from 'react'
import ConfirmName from '@/components/confirm-name'
import HasConfirm from '@/components/has-confirm'
import axios from 'axios'
import LoadingScreen from '@/components/loading'

export default function Home() {

  const [confirm, setConfirm] = useState<boolean>(false)
  const [hasConfirm, setHasConfirm] = useState<boolean>(false)
  const [loadingApi, setLoadingApi] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")

  const addValues = ({
    hash = "", name = ""
  }) => {
    localStorage.setItem("name", name)
    localStorage.setItem("hash", hash)
    setHasConfirm(true)
  }
  useEffect(() => {
    const getName = localStorage.getItem("name")
    const getHash = localStorage.getItem("hash")

    if (!!getName && !!getHash) {
      axios.get("/api/aniver?userid=" + getHash).then(data => {
        if (data.data.isFind) {
          setHasConfirm(data.data.isFind)
          !!getName && !!getHash && (setUsername(data.data.username))
        }

        setLoadingApi(true)
      })
    }
    else {
      setLoadingApi(true)
    }
  }, [])



  return (
    <>
      <Head>
        <title>Aniversário André</title>
        <meta name="description" content="Aniversário do André." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >

        <section>
          {
            loadingApi ? (
              hasConfirm ?
                (<HasConfirm name={username} />) :
                !confirm
                  ? (<InviteText onConfirm={() => { setConfirm(true) }} />)
                  : (<ConfirmName onConfirm={nome => { addValues(nome) }} />))
              :
              (<LoadingScreen />)

          }
        </section>

        <Image className={styles.happyImage} width={300} height={300} loading="lazy" src={"/images/happy.jpg"} alt="imagem de aniversario"></Image>

      </main>
    </>
  )
}
