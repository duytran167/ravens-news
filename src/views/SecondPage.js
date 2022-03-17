
import { Fragment } from 'react'
import { Card, CardBody, CardText, Container, Row, Col } from 'reactstrap'
import TeamMember from './TeamMember'
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'
import Description from './Description'

const SecondPage = () => {
  return (
    <Fragment>
      <Card className='card-congratulations'>
        <CardBody className='text-center'>
          <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
          <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
          <div className='text-center'>
            <h1 className='mb-1 text-white'>Welcome To Ravens</h1>
            <CardText className='m-auto w-75'>
              All the brothers right here to do this $h!t
            </CardText>
          </div>
        </CardBody>

      </Card>
      <Card >
        <Container className='mt-1 mb-1'>
          <img style={{ objectFit: "cover", height:'300px', width:'100%' }} src="https://cdn.mos.cms.futurecdn.net/SPxeXEcksJMUehVDiF5g2S.jpg" />
        </Container>
      </Card>
      <Row>
        <Col lg='4' md='6' sm='12'>
          <TeamMember />
        </Col>
        <Col >
        <Description />
        </Col>
        
      </Row>
    </Fragment>
  )
}

export default SecondPage
