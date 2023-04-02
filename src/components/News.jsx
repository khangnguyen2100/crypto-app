import React, {useState} from "react";
import { Row, Col, Typography, Select, Avatar, Card } from "antd";
import moment from "moment";
import Highlighter from "react-highlight-words";

import { useGetCryptoNewsQuery } from "../service/cryptoNewsApi";
import demoImage from '../images/th.png'
import { useGetCoinsQuery } from "../service/coinrankingApi";
import Loader from "./Loader";
const { Title, Text } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [newCategory, setNewCategory] = useState("Cryptocurrency");

    const { data : datas, isSuccess } = useGetCryptoNewsQuery({
        newCategory,
        count: simplified ? 10 : 30,
    });
    let { data } = useGetCoinsQuery(100)
    const coins = data?.data?.coins
  if (!isSuccess) return <Loader />;
  return <>
      <Row gutter={[24,24]}>
        {!simplified && (
            <Col span={24}>
                <Select 
                    style={{minWidth: '100px'}}
                    className="select-news"
                    placeholder="Select a Crypto"
                    defaultValue={newCategory}

                    optionFilterProp="children"
                    filterOption={(input,option) =>  option.children.toLowerCase().indexOf(input.toLowerCase() >= 0)}
                    onChange={(value) => {
                        setNewCategory(value)
                    }}
                >
                    <Option value="Cryptocurrency">Cryptocurrency</Option>
                    {
                        coins?.map((crypto,i) => {
                            return (
                                <Option key={i} value={crypto?.name}>{crypto?.name}</Option>
                            )
                        })}
                </Select>
            </Col>
        )}
        {
            datas?.value?.map((data,i) => {
                return (
                    <Col xs={24} sm={12} key={i}>
                        <Card hoverable className="news-card"  style={{borderRadius : '10px'}}>
                            <a href={data?.url} target="_blank">
                                <div className="news-image-container">
                                    <Title className="news-title" level={4}>{
                                        <Highlighter
                                            highlightStyle={{fontWeight:'bold',backgroundColor: 'unset'}}
                                            searchWords={newCategory.split(' ')}
                                            autoEscape={true}
                                            textToHighlight={data?.name}
                                        />
                                    }</Title>
                                    <img style={{maxHeight:'100px',maxWidth:'200px'}} src={data?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                </div>
                                <p style={{marginBottom:'30px', display:'block'}}>
                                    {
                                        <Highlighter
                                            highlightStyle={{fontWeight:'bold',backgroundColor: 'unset'}}
                                            searchWords={newCategory.split(' ')}
                                            autoEscape={true}
                                            textToHighlight={
                                                data?.description.length > 200 ?
                                                `${data?.description.substring(0,200)} ... ` :
                                                data?.description
                                            }
                                        />
                                    }
                                </p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar  src={data?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
                                        <Text className="provider-name">{data?.provider[0]?.name} </Text>
                                    </div>
                                    <Text>{moment(data?.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                )
            })
        }
      </Row>
  </>;
};

export default News;
