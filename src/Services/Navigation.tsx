import { LinkElement, LinkElementWithIcon } from "../interfaces/common";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const links = {
    logout: "/logout",
    start: "/dashboard",
    transactions: "/transactions",
    profile: "/user/profile",
    transfer: "/transaction/details",
    createTransfer: "/transactions/create"
}

const navigationData: LinkElement[] = [
    {
        name: "Start",
        href: links.start
    },
    {
        name: "Moje konto",
        href: links.profile
    }
]

const navigationDataWithIcons: LinkElementWithIcon[] = [<PlayArrowIcon/>, <AccountCircleIcon/>]
    .map( (item: React.ReactNode, index) => {
        return {
            name: navigationData[index].name,
            href: navigationData[index].href,
            icon: item
        }
    });

export {links, navigationData, navigationDataWithIcons};