import axios from "axios";
import { create } from "zustand";
const Showstore = create((set) => ({
    graphData: [],
    data: [],
    reset: () => {
        set({ graphData: [], data: [] })
    },
    fetchData: async (id) => {
        const [graphres, datares] = await Promise.all([
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=130`),
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}?market_data=true`),
        ]);
        const graphData = graphres.data.prices.map(price => {
            const [timestamp, p] = price;
            const date = new Date(timestamp).toLocaleDateString("en-us");
            return {
                Date: date,
                Price: p,
            }
        });
        set({ graphData })
        set({ data: datares.data });


    },
}));
export default Showstore;