
interface ContactsDetails{
    customName: string,
    firstName: string,
    lastName: string,
    username: string,
    links: {
        deleteThisContact: string,
        href: string,
        updateThisContact: string,
    }
}

export type {ContactsDetails};