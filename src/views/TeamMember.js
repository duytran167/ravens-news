import Avatar from '@components/avatar'

import { MoreVertical } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const TeamMember = ({ colors, trackBgColor }) => {
    const teamMember = [
        {
            avatar: require('@src/assets/images/portrait/small/anhPhu.jpg').default,
            title: 'Tran Quang Phu',
            subtitle: '"Mentor"'
        },
        {
            avatar: require('@src/assets/images/portrait/small/anhLinh.jpg').default,
            title: 'Bui Van Linh',
            subtitle: '"Mentor 2 tuan"'
        },
        {
            avatar: require('@src/assets/images/portrait/small/Dung.png').default,
            title: 'Nguyen Luong Dung',
            subtitle: '"Ong Hoang Meeting"'
        },
        {
            avatar: require('@src/assets/images/portrait/small/QuangDuy.jpg').default,
            title: 'Trang Quang Duy',
            subtitle: '"Team Leader"'
        },
        {
            avatar: require('@src/assets/images/portrait/small/VanLoc.png').default,
            title: 'Nguyen Van Loc',
            subtitle: '"Khong Bao Ca Phe"'
        },
        {
            avatar: require('@src/assets/images/portrait/small/PhanKhai.png').default,
            title: 'Phan The Khai',
            subtitle: '"Chua Te Lua Ga"'
        },
        {
            avatar: require('@src/assets/images/portrait/small/TrungChinh.jpg').default,
            title: 'Ho Quoc Trung Chinh',
            subtitle: '"An Khong Ngoi Roi"'
        }
    ]

    const renderTasks = () => {
        return teamMember.map(task => {
            return (
                <div key={task.title} className='employee-task d-flex justify-content-between align-items-center'>
                    <div className='d-flex'>
                    <Avatar imgClassName='rounded' className='me-75' img={task.avatar} imgHeight='42' imgWidth='42' />
                        <div className='my-auto'>
                            <h6 className='mb-0'>{task.title}</h6>
                            <small>{task.subtitle}</small>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <Card className='card-employee-task'>
            <CardHeader>
                <CardTitle tag='h4'><strong>Team Member</strong></CardTitle>
                <MoreVertical size={18} className='cursor-pointer' />
            </CardHeader>
            <CardBody>{renderTasks()}</CardBody>
        </Card>
    )
}

export default TeamMember
