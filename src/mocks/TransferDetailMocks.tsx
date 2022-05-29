import { TransferDetail } from "../interfaces/transferDetailsList";

function getTransferDetails(): TransferDetail[]{
    return [
        {
            id: 1,
            destinationAccount: {
                firstName: "string",
                lastName: "string",
                username: "string",
                links: {
                    rel: "string",
                    href: "string",
                    hreflang: "string",
                    media: "string",
                    title: "string",
                    type: "string",
                    deprecation: "string",
                    profile: "string",
                    name: "string"
                }
            },
            sourceAccount: {
                firstName: "string",
                lastName: "string",
                username: "string",
                links: {
                    rel: "string",
                    href: "string",
                    hreflang: "string",
                    media: "string",
                    title: "string",
                    type: "string",
                    deprecation: "string",
                    profile: "string",
                    name: "string"
                }
            },
            title: "string",
            amount: 100,
            date: "2022-05-29T17:04:31.316Z",
            transactionType: "outcome",
            links: {
                rel: "string",
                href: "string",
                hreflang: "string",
                media: "string",
                title: "string",
                type: "string",
                deprecation: "string",
                profile: "string",
                name: "string"
            }
        }
    ];
}

export {getTransferDetails}