interface BotData {
    id: number,
    name: string,
    systemDsc: string,
    description: string,
    url: string
}

interface UserData {
    id: number,
    username: string,
    url: string,
    uuid: string
}

interface ChatData {
    id: number,
    aiuserId: number,
    userId: number,
    lastChat: string
}