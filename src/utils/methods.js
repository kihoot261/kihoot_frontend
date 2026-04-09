const checkNaturals = (nat) => {
    const num = parseInt(nat);
    return num >= 0 ? nat : 0;
}

export default checkNaturals;