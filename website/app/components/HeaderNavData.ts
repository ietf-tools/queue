import type { VueClick } from '~/utils/vue'

/**
 * Although this type is recursive the UI only renders about 2 levels deep
 */
export type MenuItem = {
    icon?: string
    label: string
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
    activeLabelFn?: () => string
    children?: MenuItem[]
}

export const colorPreferences = [
    { value: 'system', label: 'System default' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
]

type Mode = 'desktop' | 'mobile'

export const useMenuData = (mode: Mode) => {
    const colorMode = useColorMode()

    const menuData = computed(() => {
        const data: MenuItem[] = [
            {
                label: 'Queue Menu 1',
                children: [
                    {
                        label: 'About',
                        href: '/about/'
                    },
                    {
                        label: 'Contact',
                        href: '/about/contact/'
                    },
                ]
            },
            {
                icon: 'fluent:dark-theme-20-filled',
                label: 'Theme',
                hideLabelDesktop: true,
                hideDropdownIconDesktop: true,
                children: colorPreferences.map((colorPreference) => ({
                    label: `${colorPreference.label}`,
                    activeLabelFn: () =>
                        colorMode.preference === colorPreference.value ?
                            `Selected ${colorPreference.label}`
                            : `Not selected ${colorPreference.label}`,
                    isActiveFn: () => colorMode.preference === colorPreference.value,
                    click: () => {
                        colorMode.preference = colorPreference.value
                    }
                }))
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