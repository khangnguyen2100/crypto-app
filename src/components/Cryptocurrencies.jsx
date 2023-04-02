import React from 'react'
import { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Input, Col, Row } from 'antd'

import { useGetCoinsQuery } from '../service/coinrankingApi'
import Loader from './Loader'

const Cryptocurrencies = ({ simplified }) => {
  let limit = 100
  if(simplified) limit = 10
  let {data,isFetching} = useGetCoinsQuery(limit)
  const coins = data?.data?.coins
  const [cryptos, setCryptos] = useState(undefined);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const filter = coins?.filter((crypto,i) => crypto.name.toLowerCase().includes(searchInput.toLowerCase()))
    setCryptos(filter || coins)

  },[data,searchInput])

  if(isFetching) return <Loader />
  
  return (
    <>
          {!simplified &&
          (
            <div className="search-crypto">
              <Input placeholder='Search Crypto' onChange={(e) => setSearchInput(e.target.value)}/>
            </div>
          )
          }
          <Row gutter={[32,32]} className='crypto-card-container'>
            {cryptos?.map((dataTicker,i) => {
              return (
                <Col xs={24} sm={12} lg={6} className='crypto-card' key={i}>
                  <Link to={`/crypto/${dataTicker.uuid}`}>
                    <Card
                      title={`${dataTicker.rank}. ${dataTicker.name}`}
                      hoverable
                      extra={dataTicker.symbol}
                    >
                      <p>price : {millify(dataTicker.price)}</p>
                      <p>volume24 : {millify(dataTicker['24hVolume'])}</p>
                      <p>market_cap_usd : {millify(dataTicker.marketCap)}</p>
                    </Card>
                  </Link>
                </Col>
              )
            })}
          </Row>
    </>
  )
}

export default Cryptocurrencies