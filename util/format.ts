export const formatMetricBucks = (n: number, digits: number): string => {
    // https://stackoverflow.com/a/9462382
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return n >= item.value;
    });
    return `$${item ? (n / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0"}`;
};

// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
const commaBucksFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const formatCommaBucks = (n: number): string => {
    return commaBucksFormatter.format(n);
}

export const formatPercent = (perc: number): string => {
    return `${perc}%`
};
