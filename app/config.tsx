
interface Config {
    apiUrl: string
}

export default function config() {
    const config:Config = {
        apiUrl: "http://143.198.107.25:8080"
    }

    return config;
}