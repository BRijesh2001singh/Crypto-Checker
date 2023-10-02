import React, { useEffect } from 'react'
import Showstore from '../stores/showstrore'
import { useParams } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Header from '../component/header';


const Show = () => {
    const params = useParams();
    const store = Showstore();

    useEffect(() => {
        store.fetchData(params.id);
        return () => {
            store.reset();
        }
    }, [])

    const imageUrl = store.data.image ? store.data.image.large : '';

    if (store.data && store.data.market_data) {
        return (
            <>
                <Header back />
                <div className='storecontainer'>
                    <header>
                        <img src={imageUrl} alt='logo' />
                        <h2>{store.data.name}({store.data.symbol})</h2>
                    </header>
                    <AreaChart
                        width={1000}
                        height={300}
                        data={store.graphData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                    <div className="details">
                        <div className='items'>
                            <h4>Market Cap Rank</h4>
                            <span>{store.data.market_cap_rank}</span>
                        </div>
                        <div className='items'>
                            <h4>24h High</h4>
                            <span>{store.data.market_data.high_24h.inr} INR</span>
                        </div>
                        <div className='items'>
                            <h4>24h low</h4>
                            <span>{store.data.market_data.low_24h.inr} INR</span>
                        </div>
                        <div className='items'>
                            <h4>Circulating Supply</h4>
                            <span>{store.data.market_data.circulating_supply}</span>
                        </div>
                        <div className='items'>
                            <h4>Current Prices</h4>
                            <span>{store.data.market_data.current_price.inr} INR</span>
                        </div>
                        <div >
                            <h4>Change</h4>
                            <span>{store.data.market_data.price_change_percentage_1y}%</span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return <></>
    }

}

export default Show
