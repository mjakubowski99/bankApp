
const formatAmount = (amount: any) => {
    return String( parseFloat(amount)/100 );
}

export { formatAmount };