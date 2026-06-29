import { CLUSTERS_PATH, FINAL_REVIEW_PATH, HOME_PATH } from '~/utils/url'
import { htmlEscapeToText } from '~/utils/html'
import type { VueClick } from '~/utils/vue'
import GraphicsUserPreferences from './Graphics/UserPreferences.vue'

/**
 * Although this type is recursive the UI only renders about 2 levels deep
 */
export type MenuItem = {
  icon?: string | (() => VNode)
  label: string
  description?: string
  hideMobile?: boolean
  hideDesktop?: boolean
  hideLabelDesktop?: boolean
  hideDropdownIconDesktop?: boolean
  noSpaLink?: boolean
  href?: string
  click?: VueClick
  /**
   * A function that returns whether the menu item is active
   * Used for the theme picker
   */
  isActiveFn?: () => boolean
  role?: 'radiogroup' | 'radio' | 'checkboxgroup' | 'checkbox'
  /**
   * The value a `radio`/`checkbox` child contributes to its group's model
   */
  fieldValue?: string
  /**
   * Writable model for a `radiogroup`: the currently selected `fieldValue`
   */
  radioGroupRef?: Ref<string>
  /**
   * Writable model for a `checkboxgroup`: the list of checked `fieldValue`s
   */
  checkboxGroupRef?: Ref<string[]>
  activeLabelFn?: () => string
  children?: MenuItem[]
}

export const colorPreferences = [
  { value: 'system', label: 'System default' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' }
]

type Mode = 'desktop' | 'mobile'

export const groupLabelDomId = (mode: Mode, ...indexes: number[]): string => `${mode}-group-label-${indexes.join('-')}`

export const dropdownHeadingDomId = (mode: Mode, ...indexes: number[]): string =>
  `${mode}-dropdown-heading-label-${indexes.join('-')}`

export const descriptionDomId = (mode: Mode, ...indexes: number[]): string => `${mode}-description-${indexes.join('-')}`

export const useMenuData = (mode: Mode) => {
  const colorMode = useColorMode()

  // Writable model for the theme radio group. The selected value is the
  // colour-mode *preference* (e.g. 'system'), not the resolved value.
  const themeRef = computed<string>({
    get: () => colorMode.preference,
    set: (value) => {
      colorMode.preference = value || 'system'
    }
  })

  const menuData = computed(() => {
    const data: MenuItem[] = [
      {
        label: 'Queue',
        href: HOME_PATH,
        hideLabelDesktop: false
      },
      {
        label: 'Clusters',
        href: CLUSTERS_PATH,
        hideLabelDesktop: false
      },
      {
        label: 'Final Review',
        href: FINAL_REVIEW_PATH,
        hideLabelDesktop: false
      },
      {
        label: 'About',
        children: [
          {
            label: 'About This Queue',
            href: '/about/'
          },
          {
            label: 'Contact',
            href: '/about/contact/'
          }
        ]
      },
      {
        icon: () => h(GraphicsUserPreferences),
        label: 'User preferences',
        hideLabelDesktop: true,
        children: [
          {
            label: 'Theme',
            role: 'radiogroup',
            radioGroupRef: themeRef,
            children: colorPreferences.map(
              (colorPreference): MenuItem => ({
                label: colorPreference.label,
                activeLabelFn: () =>
                  colorMode.preference === colorPreference.value
                    ? `Selected ${colorPreference.label}`
                    : `Not selected ${colorPreference.label}`,
                role: 'radio',
                fieldValue: colorPreference.value
              })
            )
          }
        ]
      }
    ]

    return data.filter((item) => {
      if (mode === 'desktop' && item.hideDesktop) {
        return false
      }
      if (mode === 'mobile' && item.hideMobile) {
        return false
      }
      return true
    })
  })

  return menuData
}

type RenderNoScriptMenuItemOptions = {
  renderListDisc?: boolean
  menuHeaderTopSpacing?: boolean
}

/**
 * This generates raw HTML. It's uses our trusted menu data but be very careful making change regardless.
 */
export const renderNoScriptMenuItem = (menuItem: MenuItem, options?: RenderNoScriptMenuItemOptions): string => {
  if (menuItem.href) {
    return `<li class="${options?.renderListDisc ? 'list-disc ml-5' : ''}"><a href="${htmlEscapeToText(menuItem.href)}">${htmlEscapeToText(menuItem.label)}</a>${
      menuItem.children
        ? `<ul>${menuItem.children.map((menuItem) => renderNoScriptMenuItem(menuItem, options)).join('')}</ul>`
        : ''
    }</li>`
  }

  if (
    // NoScript users can't run click handler JS. Ignore this menu item.
    menuItem.click
  ) {
    return ''
  }

  if (menuItem.label && menuItem.children && menuItem.children.filter((menuItem) => !menuItem.click).length > 0) {
    return `<li>${
      menuItem.label
        ? `<b class="${options?.menuHeaderTopSpacing ? 'inline-block mt-1' : ''}">${htmlEscapeToText(menuItem.label)}</b>`
        : ''
    }${`<ul>${menuItem.children ? menuItem.children.map((menuItem) => renderNoScriptMenuItem(menuItem, options)).join('') : ''}</ul>`}</li>`
  }

  return ''
}
