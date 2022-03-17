// ** Vertical Menu Components
import VerticalNavMenuLink from './VerticalNavMenuLink'
import VerticalNavMenuGroup from './VerticalNavMenuGroup'
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'

// ** Utils
import {
  // canViewMenuItem,
  // canViewMenuGroup,
  resolveVerticalNavMenuItemComponent as resolveNavItemComponent
} from '@layouts/utils'

const VerticalMenuNavItems = props => {
  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader
  }

  // ** Render Nav Menu Items
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

export default VerticalMenuNavItems