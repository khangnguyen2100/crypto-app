import React from 'react'
import millify from 'millify'
import { Collapse, Col, Row, Typography, Avatar} from 'antd'

import { useGetCoinsQuery } from '../service/coinrankingApi'
import Loader from './Loader';

const {Text} = Typography
const { Panel } = Collapse;

const Exchanges = () => {
  let {isSuccess, data} = useGetCoinsQuery()
  if(!isSuccess) return <Loader />
  return (
    <>
        <Col className='exchanges-heading' span={24}>
            <Col span={6}>
                <Text level={5}>
                    Exchanges
                </Text>
            </Col>
            <Col span={6}>
                <Text level={5}>
                    24h Trade Volume
                </Text>
            </Col>
            <Col span={6}>
                <Text level={5}>
                    Markets Cap 
                </Text>
            </Col>
            <Col span={6}>
                <Text level={5}>
                    Change
                </Text>
            </Col>
        </Col>

        <Row className='exchanges-list'>
            {
                isSuccess && 
                data?.data?.coins?.map((coin,i) => {
                    return (
                        <Col  span={24}  className='exchanges-item' key={i}>
                            <Collapse
                                style={{width: '100%'}}
                            >
                                <Panel
                                    showArrow={false}
                                    header={(
                                        <>
                                            <Col span={6}>
                                                <Text level={5}>
                                                    {coin?.rank}.
                                                    <Avatar src={coin?.iconUrl} className="exchanges-icon" />
                                                    {coin?.name}
                                                </Text>
                                            </Col>
                                            <Col span={6}>
                                                <Text level={5}>
                                                    {millify(coin['24hVolume'])}
                                                </Text>
                                            </Col>
                                            <Col span={6}>
                                                <Text level={5}>
                                                    {millify(coin?.marketCap)}
                                                </Text>
                                            </Col>
                                            <Col span={6}>
                                                <Text level={5}>
                                                    {millify(coin?.change)}
                                                </Text>
                                            </Col>
                                        </>
                                    )}
                                >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed iure minima deserunt quia quidem, culpa distinctio ut neque voluptatibus delectus labore. Temporibus provident sint, odit dolores harum quaerat! Debitis dolores reprehenderit, quibusdam aspernatur odio aut cupiditate animi accusantium ad sunt, iste autem corporis assumenda nesciunt! Delectus cum nemo, maxime nulla earum sequi eius dolores? Eius asperiores aliquam corrupti odio id culpa beatae quos commodi voluptatem maxime. Voluptas pariatur omnis quam qui, dicta porro quibusdam id eum, doloremque ex odio esse incidunt optio eos ullam ab maxime illo et assumenda aut dolor eius repudiandae. Animi quia tempora omnis reiciendis, sit eligendi!
                                </Panel>
                            </Collapse>
                        </Col>
                    )
                })
            }
        </Row>
    </>
  )
}

export default Exchanges
