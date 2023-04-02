import React from 'react'
import millify from 'millify'
import { Typography, Col, Row, Statistic } from 'antd'
import { Link } from 'react-router-dom'

import {Cryptocurrencies, News} from './index'
import { useGetCoinsQuery } from '../service/coinrankingApi'


const HomePage = () => {
  let { data } = useGetCoinsQuery()
  const coins = data?.data?.stats

  return (
    <>
      <Typography.Title level={2} className='heading'>
        Global Crypto Stats
      </Typography.Title>
      <Row style={{textTransform : 'capitalize'}}>
        <Col span={12}>
          <Statistic title="Total coins" value={coins?.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={coins?.totalMarkets} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(coins?.totalMarketCap || 0)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volumn" value={millify(coins?.total24hVolume || 0)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(coins?.totalExchanges || 0)} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Typography.Title level={3} className="home-title">
          Top 10 Cryptocurrentcies in the World
        </Typography.Title>

        <Typography.Title level={5} underline italic className="show-more">
          <Link to='/cryptocurrencies'>
            Show more
          </Link>
        </Typography.Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Typography.Title level={3} className="home-title">
          Top 10 Cryptocurrentcies in the World
        </Typography.Title>
        
        <Typography.Title level={5} underline italic className="show-more">
          <Link to='/news'>
            Show more
          </Link>
        </Typography.Title>
      </div>
      <News simplified />
    </>
  )
}

export default HomePage