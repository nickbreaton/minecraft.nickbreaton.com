import Head from "next/head";
import { getStatus } from "mc-server-status";
import BlockingFont from "../components/BlockingFont";

const Home = ({ isOnline, title }) => (
    <div>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{title}</title>
            <link
                rel="icon"
                type="image/png"
                href={`/favicon-${isOnline ? "online" : "offline"}.png`}
            />
        </Head>
        <BlockingFont family="MinecraftBody" href="MinecraftBody.woff2" format="woff2" />
        <div>{isOnline ? "Online 🟢" : "Offline 🔴"}</div>
    </div>
);

export const getServerSideProps = async () => {
    const getServerStatus = async () => {
        const { description } = await getStatus({
            host: "minecraft-server.nickbreaton.com",
        });
        return { isOnline: true, title: description.text };
    };

    const timeout = (interval) => {
        return new Promise((_, reject) => setTimeout(reject, interval));
    };

    const { isOnline, title } = await Promise.race([getServerStatus(), timeout(1000)]).catch(
        () => ({
            isOnline: false,
            title: "Server offline",
        })
    );

    return {
        props: {
            isOnline,
            title,
        },
    };
};

export default Home;
