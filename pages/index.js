import Head from "next/head";
import { getStatus } from "mc-server-status";
import BlockingFont from "../components/BlockingFont";

const Home = ({ isOnline, title }) => (
    <div>
        <Head>
            {title && <title>{title}</title>}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <BlockingFont family="MinecraftBody" href="MinecraftBody.woff2" format="woff2" />
        <span>{isOnline ? "Online 🟢" : "Offline 🔴"}</span>
    </div>
);

export const getServerSideProps = async () => {
    const { isOnline, title } = await getStatus({
        host: "minecraftserver.nickbreaton.com",
    })
        .then(({ description }) => ({ isOnline: true, title: description.text }))
        .catch(() => ({ isOnline: false, title: "Server Offline" }));

    return {
        props: {
            isOnline,
            title,
        },
    };
};

export default Home;
