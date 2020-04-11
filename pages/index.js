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
        <BlockingFont family="MinecraftBody" href="MinecraftBody.woff2" format="woff2" />
        <BlockingFont family="MinecraftBody" href="MinecraftBody.woff2" format="woff2" />
        <span>{isOnline ? "Online 🟢" : "Offline 🔴"}</span>
    </div>
);

export const getServerSideProps = async () => {
    const getServerStatus = async () => {
        const { description } = await getStatus({
            host: "minecraftserver.nickbreaton.com",
        });
        return { isOnline: true, title: description.text };
    };

    const timeout = (interval) => {
        return new Promise((_, reject) => setTimeout(reject, interval));
    };

    const { isOnline, title } = await Promise.race([getServerStatus(), timeout(1000)]).catch(
        () => ({
            isOnline: false,
            title: "Server Offline",
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
