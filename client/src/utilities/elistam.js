const eListam = {
    helpers: {
        getTotalTransactionPriceToday: (context) => {
            const today = new Date().toLocaleDateString();
            const result = context.reduce((prev, current) => {
                return current.date === today ? prev + Number(current.totalPrice) : prev;
            }, 0);

            return result;
        },

        getTotalStockAmount: (context) => {
            const result = context?.reduce((prev, current) => {
                return prev + Number(current.price);
            }, 0);

            return result;
        },

        getTotalProfit: (context) => {
            const result = context?.reduce((prev, current) => {
                return prev + Number(current.price * 0.25);
            }, 0);

            return result;
        },
    },
    utils: {
        formatCurrencyToPHP: (value) => {
            return new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
            }).format(Number(value) || 0);
        },

        formatCurrency: (value) => {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(Number(value) || 0);
        },

        formatDate: (value) => {
            if (!value) return "—";

            const date = new Date(value);

            if (Number.isNaN(date.getTime())) {
                return value;
            }

            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        }
    }
};

export default eListam;