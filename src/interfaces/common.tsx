
interface Message{
    status: string,
    message: string
}

interface LinkElement{
    href: string,
    name: string
}

interface ResponseStatus{
    status: string,
    message: string
}

interface LinkElementWithIcon extends LinkElement{
    icon: React.ReactNode
}

export type {Message, LinkElement, LinkElementWithIcon, ResponseStatus};

