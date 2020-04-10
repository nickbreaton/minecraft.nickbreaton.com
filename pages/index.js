import Head from 'next/head'
import { getStatus } from 'mc-server-status'

const Home = ({ isOnline }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    {isOnline ? '🟢Online' : '🔴Offline'}
  </div>
)

export const getServerSideProps = async () => {
  const isOnline = await getStatus({ host: "minecraftserver.nickbreaton.com" })
    .then(() => true)
    .catch(() => false)

  return {
    props: {
      isOnline
    }
  }
}

export default Home
