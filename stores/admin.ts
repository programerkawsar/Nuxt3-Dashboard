import { defineStore } from 'pinia'

interface SidebarLink {
  icon: string
  title: string
  href?: string
  children?: Array<{ title: string; href: string; count?: number }>
  count?: number
}

interface AccountLink {
  icon: string
  title: string
  subtitle: string
  href: string
}

interface State {
  sidebar: boolean
  links: { sidebar: SidebarLink[]; account: AccountLink[] }
}

export const useAdminStore = defineStore('adminStore', {
  state: (): State => ({
    sidebar: true,
    links: {
      sidebar: [
        {
          icon: 'widget-dashboard',
          title: 'label.dashboard',
          href: '/admin',
        },
        {
          icon: 'users-group',
          title: 'label.userManagement',
          children: [
            {
              title: 'label.dashboard',
              href: '/admin/users/dashboard',
            },
            {
              title: 'label.list',
              href: '/admin/users/list',
            },
            {
              title: 'label.roles',
              href: '/admin/users/roles',
            },
            {
              title: 'label.activities',
              href: '/admin/users/activities',
            },
          ],
        },
        {
          icon: 'laptop-minimalistic',
          title: 'label.frontendSettings',
          children: [
            {
              title: 'label.appearance',
              href: '/admin/frontend/appearance',
            },
            {
              title: 'label.general',
              href: '/admin/frontend/general',
            },
            {
              title: 'label.menu',
              href: '/admin/frontend/menu',
            },
          ],
        },
        {
          icon: 'wallet-money',
          title: 'label.finance',
          children: [
            {
              title: 'label.dashboard',
              href: '/admin/finance/dashboard',
            },
            {
              title: 'label.transactions',
              href: '/admin/finance/transactions',
            },
            {
              title: 'label.invoice',
              href: '/admin/finance/invoice',
            },
            {
              title: 'label.membershipPlans',
              href: '/admin/finance/plans',
            },
            {
              title: 'label.paymentGateways',
              href: '/admin/finance/gateways',
            },
          ],
        },
        {
          icon: 'file-text',
          title: 'label.pages',
          href: '/admin/pages',
        },
        {
          icon: 'global',
          title: 'label.notifications',
          href: '/admin/notifications',
          count: 5500,
        },
        {
          icon: 'inbox-line',
          title: 'label.emailTemplates',
          href: '/admin/email-templates',
        },
        {
          icon: 'settings',
          title: 'label.generalSettings',
          children: [
            {
              title: 'label.global',
              href: '/admin/settings/global',
            },
            {
              title: 'label.pwa',
              href: '/admin/settings/pwa',
            },
            {
              title: 'label.languages',
              href: '/admin/settings/languages',
            },
            {
              title: 'label.smtp',
              href: '/admin/settings/smtp',
            },
            {
              title: 'label.gdpr',
              href: '/admin/settings/gdpr',
            },
            {
              title: 'label.access',
              href: '/admin/settings/access',
            },
            {
              title: 'label.seo',
              href: '/admin/settings/seo',
            },
            {
              title: 'label.externalCode',
              href: '/admin/settings/external-code',
            },
            {
              title: 'label.sitemapXML',
              href: '/admin/settings/sitemap-xml',
            },
            {
              title: 'label.robotsTXT',
              href: '/admin/settings/sitemap-xml',
            },
          ],
        },
        {
          icon: 'database',
          title: 'label.system',
          children: [
            {
              title: 'label.overview',
              href: '/admin/system/overview',
            },
            {
              title: 'label.countryRestriction',
              href: '/admin/system/country-restriction',
            },
            {
              title: 'label.disabledIps',
              href: '/admin/system/disabled-ips',
            },
            {
              title: 'label.cloudflare',
              href: '/admin/system/cloudflare',
            },
            {
              title: 'label.visitors',
              href: '/admin/system/visitors',
            },
            {
              title: 'label.googleRecaptcha',
              href: '/admin/system/google-recaptcha',
            },
            {
              title: 'label.googleAnalytics',
              href: '/admin/system/google-analytics',
            },
            {
              title: 'label.clearCache',
              href: '/admin/system/clear-cache',
            },
          ],
        },
        {
          icon: 'clipboard-check',
          title: 'label.license',
          href: '/admin/license',
        },
        {
          icon: 'refresh',
          title: 'label.upgrade',
          href: '/admin/upgrade',
          count: 5500,
        },
      ],
      account: [
        {
          icon: 'user-circle',
          title: 'label.settings',
          subtitle: 'label.accountSettings',
          href: '/admin/account/settings',
        },
        {
          icon: 'key-minimalistic',
          title: 'label.password',
          subtitle: 'label.changePassword',
          href: '/admin/account/password',
        },
        {
          icon: 'lock-password',
          title: 'label.security',
          subtitle: 'label.accountSecurity',
          href: '/admin/account/security',
        },
        {
          icon: 'checklist',
          title: 'label.activityLog',
          subtitle: 'text.recordDetails',
          href: '/admin/account/activity',
        },
      ],
    },
  }),
  getters: {},
  actions: {
    toggleSidebar() {
      this.sidebar = !this.sidebar
    },
  },
})
