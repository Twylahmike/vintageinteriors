/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols

import { Route as rootRouteImport } from './routes/__root'
import { Route as ShopRouteImport } from './routes/shop'
import { Route as ReviewsRouteImport } from './routes/reviews'
import { Route as DeliveryRouteImport } from './routes/delivery'
import { Route as ContactRouteImport } from './routes/contact'
import { Route as AdminRouteImport } from './routes/admin'
import { Route as AboutRouteImport } from './routes/about'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AdminIndexRouteImport } from './routes/admin.index'
import { Route as AdminSettingsRouteImport } from './routes/admin.settings'
import { Route as AdminReviewsRouteImport } from './routes/admin.reviews'
import { Route as AdminProductsRouteImport } from './routes/admin.products'
import { Route as AdminGalleryRouteImport } from './routes/admin.gallery'
import { Route as AdminCategoriesRouteImport } from './routes/admin.categories'
import { Route as AdminAnnouncementsRouteImport } from './routes/admin.announcements'
import { Route as AdminGiftingRouteImport } from './routes/admin.gifting'
import { Route as AdminDeliveryRouteImport } from './routes/admin.delivery'
import { Route as AdminBiRouteImport } from './routes/admin.bi'
import { Route as AdminBiSalesRouteImport } from './routes/admin.bi.sales'
import { Route as AdminBiFinancialRouteImport } from './routes/admin.bi.financial'
import { Route as AdminBiMarketingRouteImport } from './routes/admin.bi.marketing'
import { Route as AdminBiSupportRouteImport } from './routes/admin.bi.support'
import { Route as AdminBiOperationsRouteImport } from './routes/admin.bi.operations'

const ShopRoute = ShopRouteImport.update({ id: '/shop', path: '/shop', getParentRoute: () => rootRouteImport } as any)
const ReviewsRoute = ReviewsRouteImport.update({ id: '/reviews', path: '/reviews', getParentRoute: () => rootRouteImport } as any)
const DeliveryRoute = DeliveryRouteImport.update({ id: '/delivery', path: '/delivery', getParentRoute: () => rootRouteImport } as any)
const ContactRoute = ContactRouteImport.update({ id: '/contact', path: '/contact', getParentRoute: () => rootRouteImport } as any)
const AdminRoute = AdminRouteImport.update({ id: '/admin', path: '/admin', getParentRoute: () => rootRouteImport } as any)
const AboutRoute = AboutRouteImport.update({ id: '/about', path: '/about', getParentRoute: () => rootRouteImport } as any)
const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const AdminIndexRoute = AdminIndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => AdminRoute } as any)
const AdminSettingsRoute = AdminSettingsRouteImport.update({ id: '/settings', path: '/settings', getParentRoute: () => AdminRoute } as any)
const AdminReviewsRoute = AdminReviewsRouteImport.update({ id: '/reviews', path: '/reviews', getParentRoute: () => AdminRoute } as any)
const AdminProductsRoute = AdminProductsRouteImport.update({ id: '/products', path: '/products', getParentRoute: () => AdminRoute } as any)
const AdminGalleryRoute = AdminGalleryRouteImport.update({ id: '/gallery', path: '/gallery', getParentRoute: () => AdminRoute } as any)
const AdminCategoriesRoute = AdminCategoriesRouteImport.update({ id: '/categories', path: '/categories', getParentRoute: () => AdminRoute } as any)
const AdminAnnouncementsRoute = AdminAnnouncementsRouteImport.update({ id: '/announcements', path: '/announcements', getParentRoute: () => AdminRoute } as any)
const AdminGiftingRoute = AdminGiftingRouteImport.update({ id: '/gifting', path: '/gifting', getParentRoute: () => AdminRoute } as any)
const AdminDeliveryRoute = AdminDeliveryRouteImport.update({ id: '/delivery', path: '/delivery', getParentRoute: () => AdminRoute } as any)
const AdminBiRoute = AdminBiRouteImport.update({ id: '/bi', path: '/bi', getParentRoute: () => AdminRoute } as any)
const AdminBiSalesRoute = AdminBiSalesRouteImport.update({ id: '/sales', path: '/sales', getParentRoute: () => AdminBiRoute } as any)
const AdminBiFinancialRoute = AdminBiFinancialRouteImport.update({ id: '/financial', path: '/financial', getParentRoute: () => AdminBiRoute } as any)
const AdminBiMarketingRoute = AdminBiMarketingRouteImport.update({ id: '/marketing', path: '/marketing', getParentRoute: () => AdminBiRoute } as any)
const AdminBiSupportRoute = AdminBiSupportRouteImport.update({ id: '/support', path: '/support', getParentRoute: () => AdminBiRoute } as any)
const AdminBiOperationsRoute = AdminBiOperationsRouteImport.update({ id: '/operations', path: '/operations', getParentRoute: () => AdminBiRoute } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/admin': typeof AdminRouteWithChildren
  '/contact': typeof ContactRoute
  '/delivery': typeof DeliveryRoute
  '/reviews': typeof ReviewsRoute
  '/shop': typeof ShopRoute
  '/admin/': typeof AdminIndexRoute
  '/admin/gallery': typeof AdminGalleryRoute
  '/admin/products': typeof AdminProductsRoute
  '/admin/reviews': typeof AdminReviewsRoute
  '/admin/settings': typeof AdminSettingsRoute
  '/admin/categories': typeof AdminCategoriesRoute
  '/admin/announcements': typeof AdminAnnouncementsRoute
  '/admin/gifting': typeof AdminGiftingRoute
  '/admin/delivery': typeof AdminDeliveryRoute
  '/admin/bi': typeof AdminBiRouteWithChildren
  '/admin/bi/sales': typeof AdminBiSalesRoute
  '/admin/bi/financial': typeof AdminBiFinancialRoute
  '/admin/bi/marketing': typeof AdminBiMarketingRoute
  '/admin/bi/support': typeof AdminBiSupportRoute
  '/admin/bi/operations': typeof AdminBiOperationsRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/contact': typeof ContactRoute
  '/delivery': typeof DeliveryRoute
  '/reviews': typeof ReviewsRoute
  '/shop': typeof ShopRoute
  '/admin': typeof AdminIndexRoute
  '/admin/gallery': typeof AdminGalleryRoute
  '/admin/products': typeof AdminProductsRoute
  '/admin/reviews': typeof AdminReviewsRoute
  '/admin/settings': typeof AdminSettingsRoute
  '/admin/categories': typeof AdminCategoriesRoute
  '/admin/announcements': typeof AdminAnnouncementsRoute
  '/admin/gifting': typeof AdminGiftingRoute
  '/admin/delivery': typeof AdminDeliveryRoute
  '/admin/bi': typeof AdminBiRouteWithChildren
  '/admin/bi/sales': typeof AdminBiSalesRoute
  '/admin/bi/financial': typeof AdminBiFinancialRoute
  '/admin/bi/marketing': typeof AdminBiMarketingRoute
  '/admin/bi/support': typeof AdminBiSupportRoute
  '/admin/bi/operations': typeof AdminBiOperationsRoute
}

export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/admin': typeof AdminRouteWithChildren
  '/contact': typeof ContactRoute
  '/delivery': typeof DeliveryRoute
  '/reviews': typeof ReviewsRoute
  '/shop': typeof ShopRoute
  '/admin/': typeof AdminIndexRoute
  '/admin/gallery': typeof AdminGalleryRoute
  '/admin/products': typeof AdminProductsRoute
  '/admin/reviews': typeof AdminReviewsRoute
  '/admin/settings': typeof AdminSettingsRoute
  '/admin/categories': typeof AdminCategoriesRoute
  '/admin/announcements': typeof AdminAnnouncementsRoute
  '/admin/gifting': typeof AdminGiftingRoute
  '/admin/delivery': typeof AdminDeliveryRoute
  '/admin/bi': typeof AdminBiRouteWithChildren
  '/admin/bi/sales': typeof AdminBiSalesRoute
  '/admin/bi/financial': typeof AdminBiFinancialRoute
  '/admin/bi/marketing': typeof AdminBiMarketingRoute
  '/admin/bi/support': typeof AdminBiSupportRoute
  '/admin/bi/operations': typeof AdminBiOperationsRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/' | '/about' | '/admin' | '/contact' | '/delivery' | '/reviews' | '/shop'
    | '/admin/' | '/admin/gallery' | '/admin/products' | '/admin/reviews' | '/admin/settings'
    | '/admin/categories' | '/admin/announcements' | '/admin/gifting' | '/admin/delivery'
    | '/admin/bi' | '/admin/bi/sales' | '/admin/bi/financial' | '/admin/bi/marketing'
    | '/admin/bi/support' | '/admin/bi/operations'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/' | '/about' | '/contact' | '/delivery' | '/reviews' | '/shop'
    | '/admin' | '/admin/gallery' | '/admin/products' | '/admin/reviews' | '/admin/settings'
    | '/admin/categories' | '/admin/announcements' | '/admin/gifting' | '/admin/delivery'
    | '/admin/bi' | '/admin/bi/sales' | '/admin/bi/financial' | '/admin/bi/marketing'
    | '/admin/bi/support' | '/admin/bi/operations'
  id:
    | '__root__' | '/' | '/about' | '/admin' | '/contact' | '/delivery' | '/reviews' | '/shop'
    | '/admin/' | '/admin/gallery' | '/admin/products' | '/admin/reviews' | '/admin/settings'
    | '/admin/categories' | '/admin/announcements' | '/admin/gifting' | '/admin/delivery'
    | '/admin/bi' | '/admin/bi/sales' | '/admin/bi/financial' | '/admin/bi/marketing'
    | '/admin/bi/support' | '/admin/bi/operations'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  AdminRoute: typeof AdminRouteWithChildren
  ContactRoute: typeof ContactRoute
  DeliveryRoute: typeof DeliveryRoute
  ReviewsRoute: typeof ReviewsRoute
  ShopRoute: typeof ShopRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
    '/about': { id: '/about'; path: '/about'; fullPath: '/about'; preLoaderRoute: typeof AboutRouteImport; parentRoute: typeof rootRouteImport }
    '/contact': { id: '/contact'; path: '/contact'; fullPath: '/contact'; preLoaderRoute: typeof ContactRouteImport; parentRoute: typeof rootRouteImport }
    '/delivery': { id: '/delivery'; path: '/delivery'; fullPath: '/delivery'; preLoaderRoute: typeof DeliveryRouteImport; parentRoute: typeof rootRouteImport }
    '/reviews': { id: '/reviews'; path: '/reviews'; fullPath: '/reviews'; preLoaderRoute: typeof ReviewsRouteImport; parentRoute: typeof rootRouteImport }
    '/shop': { id: '/shop'; path: '/shop'; fullPath: '/shop'; preLoaderRoute: typeof ShopRouteImport; parentRoute: typeof rootRouteImport }
    '/admin': { id: '/admin'; path: '/admin'; fullPath: '/admin'; preLoaderRoute: typeof AdminRouteImport; parentRoute: typeof rootRouteImport }
    '/admin/': { id: '/admin/'; path: '/'; fullPath: '/admin/'; preLoaderRoute: typeof AdminIndexRouteImport; parentRoute: typeof AdminRoute }
    '/admin/gallery': { id: '/admin/gallery'; path: '/gallery'; fullPath: '/admin/gallery'; preLoaderRoute: typeof AdminGalleryRouteImport; parentRoute: typeof AdminRoute }
    '/admin/products': { id: '/admin/products'; path: '/products'; fullPath: '/admin/products'; preLoaderRoute: typeof AdminProductsRouteImport; parentRoute: typeof AdminRoute }
    '/admin/reviews': { id: '/admin/reviews'; path: '/reviews'; fullPath: '/admin/reviews'; preLoaderRoute: typeof AdminReviewsRouteImport; parentRoute: typeof AdminRoute }
    '/admin/settings': { id: '/admin/settings'; path: '/settings'; fullPath: '/admin/settings'; preLoaderRoute: typeof AdminSettingsRouteImport; parentRoute: typeof AdminRoute }
    '/admin/categories': { id: '/admin/categories'; path: '/categories'; fullPath: '/admin/categories'; preLoaderRoute: typeof AdminCategoriesRouteImport; parentRoute: typeof AdminRoute }
    '/admin/announcements': { id: '/admin/announcements'; path: '/announcements'; fullPath: '/admin/announcements'; preLoaderRoute: typeof AdminAnnouncementsRouteImport; parentRoute: typeof AdminRoute }
    '/admin/gifting': { id: '/admin/gifting'; path: '/gifting'; fullPath: '/admin/gifting'; preLoaderRoute: typeof AdminGiftingRouteImport; parentRoute: typeof AdminRoute }
    '/admin/delivery': { id: '/admin/delivery'; path: '/delivery'; fullPath: '/admin/delivery'; preLoaderRoute: typeof AdminDeliveryRouteImport; parentRoute: typeof AdminRoute }
    '/admin/bi': { id: '/admin/bi'; path: '/bi'; fullPath: '/admin/bi'; preLoaderRoute: typeof AdminBiRouteImport; parentRoute: typeof AdminRoute }
    '/admin/bi/sales': { id: '/admin/bi/sales'; path: '/sales'; fullPath: '/admin/bi/sales'; preLoaderRoute: typeof AdminBiSalesRouteImport; parentRoute: typeof AdminBiRoute }
    '/admin/bi/financial': { id: '/admin/bi/financial'; path: '/financial'; fullPath: '/admin/bi/financial'; preLoaderRoute: typeof AdminBiFinancialRouteImport; parentRoute: typeof AdminBiRoute }
    '/admin/bi/marketing': { id: '/admin/bi/marketing'; path: '/marketing'; fullPath: '/admin/bi/marketing'; preLoaderRoute: typeof AdminBiMarketingRouteImport; parentRoute: typeof AdminBiRoute }
    '/admin/bi/support': { id: '/admin/bi/support'; path: '/support'; fullPath: '/admin/bi/support'; preLoaderRoute: typeof AdminBiSupportRouteImport; parentRoute: typeof AdminBiRoute }
    '/admin/bi/operations': { id: '/admin/bi/operations'; path: '/operations'; fullPath: '/admin/bi/operations'; preLoaderRoute: typeof AdminBiOperationsRouteImport; parentRoute: typeof AdminBiRoute }
  }
}

interface AdminBiRouteChildren {
  AdminBiSalesRoute: typeof AdminBiSalesRoute
  AdminBiFinancialRoute: typeof AdminBiFinancialRoute
  AdminBiMarketingRoute: typeof AdminBiMarketingRoute
  AdminBiSupportRoute: typeof AdminBiSupportRoute
  AdminBiOperationsRoute: typeof AdminBiOperationsRoute
}

const AdminBiRouteChildren: AdminBiRouteChildren = {
  AdminBiSalesRoute,
  AdminBiFinancialRoute,
  AdminBiMarketingRoute,
  AdminBiSupportRoute,
  AdminBiOperationsRoute,
}

const AdminBiRouteWithChildren = AdminBiRoute._addFileChildren(AdminBiRouteChildren)

interface AdminRouteChildren {
  AdminIndexRoute: typeof AdminIndexRoute
  AdminGalleryRoute: typeof AdminGalleryRoute
  AdminProductsRoute: typeof AdminProductsRoute
  AdminReviewsRoute: typeof AdminReviewsRoute
  AdminSettingsRoute: typeof AdminSettingsRoute
  AdminCategoriesRoute: typeof AdminCategoriesRoute
  AdminAnnouncementsRoute: typeof AdminAnnouncementsRoute
  AdminGiftingRoute: typeof AdminGiftingRoute
  AdminDeliveryRoute: typeof AdminDeliveryRoute
  AdminBiRoute: typeof AdminBiRouteWithChildren
}

const AdminRouteChildren: AdminRouteChildren = {
  AdminIndexRoute,
  AdminGalleryRoute,
  AdminProductsRoute,
  AdminReviewsRoute,
  AdminSettingsRoute,
  AdminCategoriesRoute,
  AdminAnnouncementsRoute,
  AdminGiftingRoute,
  AdminDeliveryRoute,
  AdminBiRoute: AdminBiRouteWithChildren,
}

const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute: AdminRouteWithChildren,
  ContactRoute,
  DeliveryRoute,
  ReviewsRoute,
  ShopRoute,
}

export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
