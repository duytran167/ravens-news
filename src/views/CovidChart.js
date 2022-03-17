// ** React Imports
import { Link } from 'react-router-dom'
import React, { Fragment, useState, useMemo, useEffect } from 'react'
import { Container, Typography } from '@material-ui/core'
import '@fontsource/roboto'
import moment from 'moment'
import 'moment/locale/vi'
// ** Third Party Components
import axios from 'axios'
import classnames from 'classnames'
import { MessageSquare } from 'react-feather'

// ** Custom Components
import Sidebar from '../@core/components/ravens/BlogSidebar'
import Avatar from '@components/avatar'
import Breadcrumbs from '@components/breadcrumbs'
import { sortBy } from 'lodash'
import CountrySelector from './CountrySelector'
import { getCountries, getReportByCountry } from './apis'
// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    CardBody,
    CardText,
    CardTitle,
    CardImg,
    Badge,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'
import HighLight from './HighLight'
import Summary from './Summary'

moment.locale('vi')
const CovidChart = () => {

    const [data, setData] = useState([])
    const [countries, setCountries] = React.useState([])
    const [selectedCountryId, setSelectedCountryId] = React.useState('')
    const [report, setReport] = React.useState([])

    useEffect(() => {
        getCountries().then((res) => {
            const { data } = res
            const countries = sortBy(data, 'Country')
            setCountries(countries)
            setSelectedCountryId('vn')
        })
    }, [])

    const handleOnChange = React.useCallback((e) => {
        setSelectedCountryId(e.target.value)
    }, [])

    useEffect(() => {
        if (selectedCountryId) {
            const selectedCountry = countries.find(
                (country) => country.ISO2 === selectedCountryId.toUpperCase()
            )
            getReportByCountry(selectedCountry.Slug).then((res) => {
                console.log('getReportByCountry', { res })
                // remove last item = current date
                res.data.pop()
                setReport(res.data)
            })
        }
    }, [selectedCountryId, countries])

    const summary = useMemo(() => {
        if (report && report.length) {
            const latestData = report[report.length - 1]
            return [
                {
                    title: 'Số ca nhiễm',
                    count: latestData.Confirmed,
                    type: 'confirmed'
                },
                {
                    title: 'Khỏi',
                    count: latestData.Recovered,
                    type: 'recovered'
                },
                {
                    title: 'Tử vong',
                    count: latestData.Deaths,
                    type: 'death'
                }
            ]
        }
        return []
    }, [report])

    return (
        <Fragment>
            <div className='blog-wrapper'>
                <div className='content-detached content-left'>
                    <div className='content-body'>
                        <Row>
                            <Container style={{ marginTop: 20 }}>
                                <Typography variant='h2' component='h2'>
                                    Số liệu COVID-19
                                </Typography>
                                <Typography>{moment().format('LLL')}</Typography>
                                <CountrySelector
                                    handleOnChange={handleOnChange}
                                    countries={countries}
                                    value={selectedCountryId}
                                />
                                <HighLight summary={summary} />
                                <Summary countryId={selectedCountryId} report={report} />
                            </Container>
                        </Row>
                    </div>
                </div>
                <Sidebar blogData={data} />
            </div>
        </Fragment>
    )
}

export default CovidChart
