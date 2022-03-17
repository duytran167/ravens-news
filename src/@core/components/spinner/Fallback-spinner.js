// ** Logo
import logo from '@src/assets/images/logo/logincover.png'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner app-loader'>
      <img style={{height:'200px'}} className='fallback-logo' src={logo} alt='logo' />
      <h1 className='blog-title-truncate text-body-heading'>WE ARE RAVENS</h1>
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default SpinnerComponent
