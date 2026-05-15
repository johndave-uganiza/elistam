
export const formatCurrency = (amount, currency, locale) => new Intl.NumberFormat(locale || "en-US", {
    style: "currency",
    currency: currency || "USD",
}).format(amount);