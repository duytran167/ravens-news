// ** Icons Import
import { Heart } from 'react-feather'
import MessengerCustomerChat from 'react-messenger-customer-chat'
const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noopener noreferrer'>
          Ravens
        </a>
        <span className='d-none d-sm-inline-block'> -All rights Reserved</span>
      </span>
      <span className='float-md-end d-none d-md-block'>
        Made with
        <Heart size={14} />
      </span>
      
    </p>

  )
}

export default Footer
