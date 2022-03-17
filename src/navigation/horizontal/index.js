import { Users, Home, Edit, CheckSquare } from 'react-feather'

export default 
 [
  
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'createPage',
    title: 'Create Blog',
    icon: <Edit size={20} />,
    navLink: '/create',
    isLogin: true
  },
  {
    id: 'aboutUs',
    title: 'About Us',
    icon: <Users size={20} />,
    navLink: '/aboutUs'
    // isLogin: true
  },
  {
    id: 'covidChart',
    title: 'Covid-19 Chart',
    icon: <CheckSquare size={20} />,
    navLink: '/covidChart'
    // isLogin: true
  }
  
]
