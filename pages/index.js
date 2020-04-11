import Head from "next/head";
import { getStatus } from "mc-server-status";
import Font from "../components/Font";

const Home = ({ isOnline }) => (
    <div>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Font family="MinecraftBody" href="MinecraftBody.woff2" format="woff2" />
        <span>{isOnline ? "Online 🟢" : "Offline 🔴"}</span>
    </div>
);

export const getServerSideProps = async () => {
    const isOnline = await getStatus({
        host: "minecraftserver.nickbreaton.com",
    })
        .then(() => true)
        .catch(() => false);

    return {
        props: {
            isOnline,
        },
    };
};

export default Home;
