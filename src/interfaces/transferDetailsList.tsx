
interface TransferAccount{
    firstName: string,
    lastName: string,
    username: string,
    links: {
        rel: string,
        href: string,
        hreflang: string,
        media: string,
        title: string,
        type: string,
        deprecation: string,
        profile: string,
        name: string
    }
}

interface TransferDetail{
    id: number,
    sourceAccount: TransferAccount,
    destinationAccount: TransferAccount,
    title: string,
    amount: number,
    date: string,
    transactionType: "outcome" | "income",
    links: {
        rel: string,
        href: string,
        hreflang: string,
        media: string,
        title: string,
        type: string,
        deprecation: string,
        profile: string,
        name: string
    }
}

export type {TransferAccount, TransferDetail};