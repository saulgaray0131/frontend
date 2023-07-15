
interface Config {
    apiUrl: string
}

export default function config() {
    const config:Config = {
        apiUrl: "https://api.cultchatai.com:8443"
    }

    return config;
}