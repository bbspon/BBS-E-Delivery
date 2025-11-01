import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import ProductList from "./pages/customer-order/ProductListingPage";
import ProductDetail from "./pages/customer-order/ProductDetailPage";
import FoodMenuListingPage from "./pages/customer-order/FoodMenuListingPage";
import FoodItemDetailPage from "./pages/customer-order/FoodItemDetailPage";
import ComboOffersPage from "./pages/customer-order/ComboOffersPage";
import WaterCanListingPage from "./pages/customer-order/WaterCanListingPage";
import WaterCanSubscriptionPage from "./pages/customer-order/WaterCanSubscriptionPage";
import CartPage from "./pages/customer-order/CartPage";
import CheckoutPage from "./pages/customer-order/CheckoutPage";
import OrderConfirmationPage from "./pages/customer-order/OrderConfirmation";

import LoginSignupPage from "./pages/user-profile/LoginSignupPage";
import OTPVerificationPage from "./pages/user-profile/OTPVerification";
import ResetPasswordPage from "./pages/user-profile/ResetPassword";
import ProfilePage from "./pages/user-profile/ProfilePage";
import MyOrdersPage from "./pages/user-profile/MyOrdersPage";
import MyAddressesPage from "./pages/user-profile/MyAddressesPage";

import DeliveryAgentDashboard from "./pages/delivery-agent-dashboard/DeliveryAgentDashboard";
import AssignedOrdersPage from "./pages/delivery-agent-dashboard/AssignedOrdersPage";
import OrderDetailPage from "./pages/delivery-agent-dashboard/OrderDetailPage";
import PickupConfirmationPage from "./pages/delivery-agent-dashboard/PickupConfirmationPage";
import DeliveryConfirmationPage from "./pages/delivery-agent-dashboard/DeliveryConfirmation";
import DeliveryHistoryPage from "./pages/delivery-agent-dashboard/DeliveryHistoryPage";
import DeliveryAgentProfileWalletPage from "./pages/delivery-agent-dashboard/DeliveryAgentProfileWallet";
import HubAssignmentPage from "./pages/logistics-and-delivery/HubAssignmentPage";
import RiderAllocationPage from "./pages/logistics-and-delivery/RiderAllocation";
import LiveOrderTrackingDashboard from "./pages/logistics-and-delivery/LiveOrderTrackingDashboard";
import DeliveryZoneManagementPage from "./pages/logistics-and-delivery/DeliveryZoneManagement";
import SlotOptimizationPage from "./pages/logistics-and-delivery/SlotOptimizationPage";
import InventoryRefillRequestPage from "./pages/logistics-and-delivery/InventoryRefillRequest";

import PushNotificationTemplates from "./pages/notification-communication/PushNotificationTemplates";
import SMSEmailTemplateManager from "./pages/notification-communication/SMSEmailTemplateManager";
import NotificationCenter from "./pages/notification-communication/NotificationCenter";
import NotificationCenterRoles from "./pages/notification-communication/NotificationCenterRoles";
import SalesReportPage from "./pages/reports-analytics/SalesReportPage";
import OrderReportPage from "./pages/reports-analytics/OrderReportPage";
import CustomerRetentionReport from "./pages/reports-analytics/CustomerRetentionReport";
import DeliveryAgentPerformanceReport from "./pages/reports-analytics/DeliveryAgentPerformanceReport";
import AppSettingsPage from "./pages/misc-settings/AppSettingsPage";
import CmsPageManager from "./pages/misc-settings/CmsPageManager";
import ProductManagementPage from "./pages/vendor-dashboard/products";
import AddEditProductPage from "./pages/vendor-dashboard/AddEdit";

import CustomerSupport from "./pages/CustomerSupportPage";
import EscrowInfoPage from "./pages/EscrowInfoPage";

import VendorDashboardPage from "./pages/vendor-dashboard/Page";
import InventoryManagementPage from "./pages/vendor-dashboard/InventoryManagementPage";
import VendorOrdersPage from "./pages/vendor-dashboard/VendorOrders";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuBuilderPage from "./pages/vendor-dashboard/MenuBuilderPage";
import ComboOfferCreationPage from "./pages/vendor-dashboard/ComboOfferCreationPage";
import DeliverySlotManagementPage from "./pages/vendor-dashboard/DeliverySlotManagement";
import VendorReviewsPage from "./pages/vendor-dashboard/VendorReviews";
import VendorPayoutsWalletPage from "./pages/vendor-dashboard/VendorPayoutsWallet";
import VendorProfileBankDetails from "./pages/vendor-dashboard/VendorProfileBankDetails";
import AdminDashboardPage from "./pages/admin-panel/AdminDashboard";
import ManageCustomersPage from "./pages/admin-panel/ManageCustomers";
import ManageVendorsPage from "./pages/admin-panel/ManageVendorsPage";
import ManageDeliveryAgentsPage from "./pages/admin-panel/ManageDeliveryAgentsPage";
import ApproveNewVendorRequests from "./pages/admin-panel/ApproveNewVendorRequests";
import CategoryManagementPage from "./pages/admin-panel/CategoryManagementPage";
import ProductMasterPage from "./pages/admin-panel/ProductMasterPage";
import FoodItemMasterPage from "./pages/admin-panel/FoodItemMasterPage";
import OrderManagementPage from "./pages/admin-panel/OrderManagementPage";
import RefundCancellationManagement from "./pages/admin-panel/RefundCancellationManagement";
import CommissionManagementPage from "./pages/admin-panel/CommissionManagementPage";
import PayoutManagementPage from "./pages/admin-panel/PayoutManagementPage";
import SupportTicketManagement from "./pages/admin-panel/SupportTicketPage";
import AdminProfileSettingsPage from "./pages/admin-panel/AdminProfileSettingsPage";
import ProductComparisonPage from "./pages/customer-order/ProductComparisonPage";

import WishlistPage from "./pages/customer-order/WishlistPage";
import GiftCardPage from "./pages/customer-order/GiftCardPage";
import HelpCenterPage from "./pages/customer-order/HelpCenterPage";
import VendorStorefront from "./pages/vendor-dashboard/VendorStorefront";
import VendorEarningsPage from "./pages/vendor-dashboard/VendorEarningsPage";
import VendorSupportPage from "./pages/vendor-dashboard/VendorSupportPage";
import VendorAnalyticsPage from "./pages/vendor-dashboard/VendorAnalyticsPage";
import BulkProductUploadPage from "./pages/vendor-dashboard/BulkProductUploadPage";
import AdvancedOrderTrackingPage from "./pages/order-ship/AdvancedOrderTrackingPage";
import ReturnExchangeRequestPage from "./pages/order-ship/ReturnExchangeRequestPage";
import OrderDisputeResolutionPage from "./pages/order-ship/OrderDisputePage";
import MultipleShippingAddressPage from "./pages/order-ship/MultipleShippingAddressPage";
import TrackOrderPage from "./pages/order-ship/TrackOrderPage";
import RouteOptimizationPage from "./pages/order-ship/RouteOptimizationPage";
import DeliveryMapPage from "./pages/delivery/DeliveryMapPage";
import FailedDeliveriesPage from "./pages/agent/FailedDeliveriesPage";
import DeliveryFeedbackPage from "./pages/feedback/DeliveryFeedbackPage";
import AddressResolveTool from "./pages/tools/AddressResolveTool";

function App() {
  return (
    <>
      <Router>
        <Routes>
          //1 to 10
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductList />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
          <Route path="/foodmenu/:id" element={<FoodMenuListingPage />} />
          <Route path="/fooditemdetail/:id" element={<FoodItemDetailPage />} />
          <Route path="/combo-offers" element={<ComboOffersPage />} />
          <Route path="/water-can/:id" element={<WaterCanListingPage />} />
          <Route
            path="/water-can-subscription/:id"
            element={<WaterCanSubscriptionPage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          />
          <Route
            path="/product-comparison"
            element={<ProductComparisonPage />}
          />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/gift-card" element={<GiftCardPage />} />
          <Route path="/help-center" element={<HelpCenterPage />} />
          <Route
            path="/advanced-order-tracking"
            element={<AdvancedOrderTrackingPage />}
          />
          <Route
            path="/return-exchange-request"
            element={<ReturnExchangeRequestPage />}
          />
          <Route
            path="/order-dispute"
            element={<OrderDisputeResolutionPage />}
          />
          <Route
            path="/multiple-shipping"
            element={<MultipleShippingAddressPage />}
          />
          <Route path="/track-order/:orderId" element={<TrackOrderPage />} />
          <Route
            path="/agent/failed-deliveries"
            element={<FailedDeliveriesPage />}
          />
          <Route
            path="/tools/address-resolver"
            element={<AddressResolveTool />}
          />
          <Route path="/agent/feedback" element={<DeliveryFeedbackPage />} />
          //11 to 16
          <Route path="/login" element={<LoginSignupPage />} />
          <Route path="/otp" element={<OTPVerificationPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/myorders" element={<MyOrdersPage />} />
          <Route path="/myaddresses" element={<MyAddressesPage />} />
          //17 to 23 DELIVERY AGENT FLOW
          <Route path="/deliveryagent" element={<DeliveryAgentDashboard />} />
          <Route path="/assignedorders" element={<AssignedOrdersPage />} />
          <Route path="/orderdetail/:id" element={<OrderDetailPage />} />
          <Route
            path="/pickupconfirmation"
            element={<PickupConfirmationPage />}
          />
          <Route path="/deliverymap" element={<DeliveryMapPage />} />
          <Route
            path="/deliveryconfirmation"
            element={<DeliveryConfirmationPage />}
          />
          <Route path="/deliveryhistory" element={<DeliveryHistoryPage />} />
          <Route
            path="/route-optimization"
            element={<RouteOptimizationPage />}
          />
          {/* ✅ Add this */}
          <Route
            path="/profile-wallet"
            element={<DeliveryAgentProfileWalletPage />}
          />
          //24 to 35: 🏪 VENDOR SHOP/RESTAURANT PANEL
          <Route path="/vendor-dashboard" element={<VendorDashboardPage />} />
          <Route
            path="/products-management"
            element={<ProductManagementPage />}
          />
          <Route
            path="/add-edit-product/:id"
            element={<AddEditProductPage />}
          />
          <Route
            path="/inventory-management"
            element={<InventoryManagementPage />}
          />
          <Route path="/vendor-orders" element={<VendorOrdersPage />} />
          <Route path="/menu-builder" element={<MenuBuilderPage />} />
          <Route
            path="/combo-offer-creation"
            element={<ComboOfferCreationPage />}
          />
          <Route
            path="/delivery-slot-management"
            element={<DeliverySlotManagementPage />}
          />
          <Route path="/vendor-reviews" element={<VendorReviewsPage />} />
          <Route
            path="/vendor-payouts-wallet"
            element={<VendorPayoutsWalletPage />}
          />
          <Route
            path="/vendor-profile-bank-details"
            element={<VendorProfileBankDetails />}
          />
          <Route path="/vendor-storefront" element={<VendorStorefront />} />
          <Route path="/vendor-earnings" element={<VendorEarningsPage />} />
          <Route path="/vendor-support" element={<VendorSupportPage />} />
          <Route path="/vendor-analytics" element={<VendorAnalyticsPage />} />
          <Route
            path="/bulk-product-upload"
            element={<BulkProductUploadPage />}
          />
          //36 to 49: 🛠️ ADMIN PANEL
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/manage-customers" element={<ManageCustomersPage />} />
          <Route path="/manage-vendors" element={<ManageVendorsPage />} />
          <Route
            path="/manage-delivery-agents"
            element={<ManageDeliveryAgentsPage />}
          />
          <Route
            path="/approve-new-vendor-requests"
            element={<ApproveNewVendorRequests />}
          />
          <Route
            path="/category-management"
            element={<CategoryManagementPage />}
          />
          <Route path="/product-master" element={<ProductMasterPage />} />
          <Route path="/food-item-master" element={<FoodItemMasterPage />} />
          <Route path="/order-management" element={<OrderManagementPage />} />
          <Route
            path="/refund-cancellation"
            element={<RefundCancellationManagement />}
          />
          <Route
            path="/commission-management"
            element={<CommissionManagementPage />}
          />
          <Route path="/payout-management" element={<PayoutManagementPage />} />
          <Route path="/support-ticket" element={<SupportTicketManagement />} />
          <Route
            path="/profile-settings"
            element={<AdminProfileSettingsPage />}
          />
          //50 to 55:package: LOGISTICS & DELIVERY FLOW
          <Route path="/hubassignment" element={<HubAssignmentPage />} />
          <Route path="/riderallocation" element={<RiderAllocationPage />} />
          <Route
            path="/liveordertracking"
            element={<LiveOrderTrackingDashboard />}
          />
          <Route
            path="/deliveryzonemanagement"
            element={<DeliveryZoneManagementPage />}
          />
          <Route path="/slotoptimization" element={<SlotOptimizationPage />} />
          <Route
            path="/inventoryrefill"
            element={<InventoryRefillRequestPage />}
          />
          //56 to 59: NOTIFICATIONS & COMMUNICATION
          <Route
            path="/pushnotification"
            element={<PushNotificationTemplates />}
          />
          <Route
            path="/smsemailtemplate"
            element={<SMSEmailTemplateManager />}
          />
          <Route path="/notificationcenter" element={<NotificationCenter />} />
          <Route
            path="/notificationcenterroles"
            element={<NotificationCenterRoles />}
          />
          //60 to 63: REPORTS & ANALYTICS
          <Route path="/salesreport" element={<SalesReportPage />} />
          <Route path="/orderreport" element={<OrderReportPage />} />
          <Route
            path="/customerretention"
            element={<CustomerRetentionReport />}
          />
          <Route
            path="/deliveryagentperformance"
            element={<DeliveryAgentPerformanceReport />}
          />
          //64 to 65: MISC + SETTINGS
          <Route path="/appsettings" element={<AppSettingsPage />} />
          <Route path="/cms" element={<CmsPageManager />} />
          <Route path="/customersupport" element={<CustomerSupport />} />
          <Route path="/escrow" element={<EscrowInfoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
