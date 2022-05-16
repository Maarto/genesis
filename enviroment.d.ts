declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            db_url: string;
            botPrefix: string;
            channelLog: string;
            gifImage: string;
            roleCoins: string;
        }
    }
}

export {};