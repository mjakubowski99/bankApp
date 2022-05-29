import { LinkElement, LinkElementWithIcon } from "../interfaces/common";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const links = {
    logout: "/logout",
    start: "/dashboard",
    transactions: "/transactions",
    profile: "/user/profile",
    transfer: "/transfer",
    createTransfer: "/transactions/create"
}

const navigationData: LinkElement[] = [
    {
        name: "Start",
        href: links.start
    },
    {
        name: "Przelewy",
        href: links.transactions
    },
    {
        name: "Moje konto",
        href: links.profile
    }
]

const navigationDataWithIcons: LinkElementWithIcon[] = [<PlayArrowIcon/>, <AttachMoneyIcon/>, <AccountCircleIcon/>]
    .map( (item: React.ReactNode, index) => {
        return {
            name: navigationData[index].name,
            href: navigationData[index].href,
            icon: item
        }
    });

export {links, navigationData, navigationDataWithIcons};