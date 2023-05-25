const getPayoutAmount = function (clicks, ppc) {
    return clicks * ppc
}

module.exports =  { getPayoutAmount }