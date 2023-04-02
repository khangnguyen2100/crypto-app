import React from 'react'
import { Spin, Alert } from 'antd'

const Loader = () => {
  return (
    <div className='Loader'>
        <Spin tip="Loading...">
            <Alert
                message="Loading..."
            />
        </Spin>
    </div>
  )
}

export default Loader
