import Head from 'next/head'
import { getStatus } from 'mc-server-status'

const Font = () => (
  <Head>
    <link rel="preload" href="MinecraftBody.woff2" as="font" />
    <style>
        {`
          @font-face {
            font-family: 'MinecraftBody';
            src: url('MinecraftBody.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
          }

          body {
            font-family: MinecraftBody;
          }
        `}
      </style>
  </Head>
)

const Home = ({ isOnline }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Font />
    <span>{isOnline ? 'Online 🟢' : 'Offline 🔴'}</span>
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
