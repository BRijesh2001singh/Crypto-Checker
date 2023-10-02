import { create } from 'zustand'
import axios from 'axios'
import { debounce } from './../helper/debounce';
const Homestore = create((set) => ({
    coins: [],
    trending: [],
    query: "",
    searchheading: "Trending",
    setquery: (e) => {
        set({ query: e.target.value });
        Homestore.getState().searchcoins();
    },
    searchcoins: debounce(async () => {//debounce to add timer before every fetch request
        const { query, trending } = Homestore.getState();
        if (query.length > 2) {
            const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
            const coins = res.data.coins.map(coin => {
                return {
                    name: coin.name,
                    image: coin.large,
                    id: coin.id,
                }
            })
            set({ coins });
            set({ searchheading: "Search Result" })

        }
        else {
            set({ coins: trending })
            set({ searchheading: "Trending" })
        }
    }, 500),
    fetchCoins: async () => {
        const [res, btcres] = await Promise.all([
            axios.get('https://api.coingecko.com/api/v3/search/trending'),
            axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr")
        ]);
        const btcprices = btcres.data.bitcoin.inr;

        const coins = res.data.coins.map((coin, ind) => {
            return {
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                priceBtc: (coin.item.price_btc).toFixed(5),
                priceinr: (coin.item.price_btc * btcprices).toFixed(5),
            }
        })
        set({ coins, trending: coins });
    }
}))

export default Homestore;