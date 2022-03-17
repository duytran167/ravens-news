// ** Menu Components Imports
import HorizontalNavMenuLink from './HorizontalNavMenuLink'
import HorizontalNavMenuGroup from './HorizontalNavMenuGroup'
import {
  // canViewMenuGroup,
  // canViewMenuItem
  resolveHorizontalNavMenuItemComponent as resolveNavItemComponent
} from '@layouts/utils'

const HorizontalNavMenuItems = props => {
  // ** Components Object
  const Components = {
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink
  }
  
  // ** Render Nav Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)]
    if (item.children) {
      return <TagName item={item} index={index} key={item.id} {...props} />
    }
    if (item.isLogin) {
      const isUserLogin = localStorage.getItem('isUserLogin')
      if (isUserLogin) {
        return <TagName item={item} index={index} key={item.id} {...props} />
      }
      return ''
    }
    return <TagName item={item} index={index} key={item.id} {...props} />
  })

  return RenderNavItems
}

export default HorizontalNavMenuItems
