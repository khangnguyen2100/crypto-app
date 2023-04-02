import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Typography, Select } from 'antd';
import { DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCoinQuery,useGetCoinHistoryQuery } from '../service/coinrankingApi';
import LineChart from './LineChart';
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');

    const { data, isFetching } = useGetCoinQuery(coinId);
    let { data: coinHistory } = useGetCoinHistoryQuery( {coinId, timePeriod} );
    
    if (isFetching) return <Loader /> 
    
    const coin = data?.data?.coin; 
    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
    const stats = [
        { title: 'Rank', value: coin?.rank, icon: <NumberOutlined /> },
        { title: 'Price to USD', value: `$ ${millify(coin?.price || 0)}`, icon: <DollarCircleOutlined /> },
        { title: '24h Volume', value: `$ ${millify( coin['24hVolume']  || 0)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${millify(coin?.marketCap || 0)}`, icon: <DollarCircleOutlined /> },
    ]
    const genericStats = [
        { title: 'Number Of Markets', value: millify(coin?.numberOfMarkets || 0), icon: <FundOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(coin?.supply?.total || 0)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(coin?.supply?.circulating || 0)}`, icon: <ExclamationCircleOutlined /> },
    ]
    return (
        <>
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {coin?.name} ({coin?.symbol}) Price
                </Title>
                <p>
                    {coin?.name} live price in US Dollar (USD). View value statistics, market cap and supply.
                </p>
            </Col>

            <Select defaultValue="7d" className="select-timePeriod" placeholder="Select Timeperiod" onChange={(value) => setTimePeriod(value)}>
                {time.map((date) => <Option key={date}>{date}</Option>)}
            </Select>
            <LineChart coinHistory={coinHistory} currentPrice={millify(data?.data?.coin.price)} coinName={data?.data?.coin.name} />

            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                    <Title level={3} className="coin-details-heading">{coin?.name} Value Statistics</Title>
                    <p>An overview showing the statistics of {coin?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                    {stats.map(({ icon, title, value },i) => (
                    <Col className="coin-stats" key={i}>
                        <Col className="coin-stats-name">
                        <Text>{icon}</Text>
                        <Text>{title}</Text>
                        </Col>
                        <Text className="stats">{value}</Text>
                    </Col>
                    ))}
                </Col>

                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                    <Title level={3} className="coin-details-heading">Other Stats Info</Title>
                    <p>An overview showing the statistics of {coin?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                    {genericStats.map(({ icon, title, value },i) => (
                    <Col className="coin-stats" key={i}>
                        <Col className="coin-stats-name">
                        <Text>{icon}</Text>
                        <Text>{title}</Text>
                        </Col>
                        <Text className="stats">{value}</Text>
                    </Col>
                    ))}
                </Col>
            </Col>
            <Col className='coin-detail-decs' span={24}>
                <Title level={3} className="coin-details-heading">What is {coin.name}?</Title>
                <div style={{fontSize : '16px'}} className="coin-decs" dangerouslySetInnerHTML={{__html: coin?.description}}></div>
            </Col>
        </Col>
        </>

    );
};

export default CryptoDetails;