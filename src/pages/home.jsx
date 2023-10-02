import React, { useEffect, useState } from 'react'
import Homestore from '../stores/homestore'
import { Link } from 'react-router-dom';
import Header from '../component/header';
import dollar from '../images/dollar.png'

const Home = () => {
    const store = Homestore();
    useEffect(() => {
        if (store.trending.length === 0) {
            store.fetchCoins();
        }
    }, []);

    return (
        <div>
            <Header />
            <header className='home-search'>
                <div className='search'>
                    <h1>Search for a coin</h1>
                    <input type='text' value={store.query} onChange={store.setquery}></input>
                    <h2 className='searchheading'>{store.searchheading}</h2>
                </div>
            </header>
            {store.coins.length > 0 && (
                <div>
                    {store.coins.map(coin => {
                        return (
                            <Link to={`/${coin.id}`}>
                                <div className='trendcontainer' key={coin.id}>
                                    <div className='trend'>
                                        <div className='pricelogo'>
                                            <img src={coin.image} alt='coinlogo' className='coinlogo' />
                                            <span>{coin.name}</span>
                                        </div>
                                        {coin.priceBtc && (
                                            <div className='price'>
                                                <div className='btcprice'>
                                                    <img src={dollar} alt="bitlogo" />
                                                    <span>{coin.priceBtc} BTC</span>
                                                </div>
                                                <div className='inrprice'>
                                                    <span>({coin.priceinr} INR)</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default Home;
