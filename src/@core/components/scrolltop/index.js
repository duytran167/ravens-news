// ** React Imports
import { useEffect, useState } from 'react'
import MessengerCustomerChat from 'react-messenger-customer-chat'
// ** Third Party Components
import Proptypes from 'prop-types'

const ScrollTop = props => {
  // ** Props
  const { showOffset, scrollBehaviour, children, ...rest } = props

  // ** State
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset >= showOffset) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      })
    }
  }, [])

  const handleScrollToTop = () => {
    window.scroll({ top: 0, behavior: scrollBehaviour })
  }

  return (
    visible && (
      <div className='scroll-to-top' onClick={handleScrollToTop} {...rest}>
        {children}
        
        <MessengerCustomerChat
          pageId="110046237257685"
          appId="1126672094821122"
          
        />
      
      </div>
      
    )
  )
}

export default ScrollTop

// ** PropTypes
ScrollTop.propTypes = {
  showOffset: Proptypes.number,
  children: Proptypes.any.isRequired,
  scrollBehaviour: Proptypes.oneOf(['smooth', 'instant', 'auto'])
}

ScrollTop.defaultProps = {
  scrollBehaviour: 'smooth'
}
