export const eListam = {
    helpers: {
        getTotalTransactionPriceToday: (context) => {
            const today = new Date().toLocaleDateString();
            const result = context.reduce((prev, current) => {
                return current.date === today ? prev + Number(current.totalPrice) : prev;
            }, 0);

            return result;
        },

        getTotalStockAmount: (contex) => {
            const result = contex.reduce((prev, current) => {
                return prev + Number(current.price);
            }, 0);

            return result;
        },

        getTotalProfit: (contex) => {
            const result = contex.reduce((prev, current) => {
                return prev + Number(current.price * 0.25);
            }, 0);

            return result;
        },
    },
    utils: {
        formatCurrencyToPHP: (amount) => new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(amount)
    }
};
