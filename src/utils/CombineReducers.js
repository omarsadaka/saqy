import {combineReducers} from 'redux';
import registerReducer from '../redux/Register/Reducers';
import verificationReducer from '../redux/Verification/Reducers';
import setPasswordReducer from '../redux/SetPassword/Reducers';
import loginReducer from '../redux/Login/Reducers';
import categoryReducer from '../redux/Category/Reducers';
import categoryServiceReducer from '../redux/CategoryService/Reducers';
import companyInfoReducer from '../redux/CompanyDetails/Reducers';
import cartReducer from '../redux/Cart/Reducers';
import locationReducer from '../redux/Location/Reducers';
import favroitesReducer from '../redux/Favorites/Reducers';
import regionReducer from '../redux/Region/Reducers';
import smsReducer from '../redux/SMS/Reducers';
import ordersReducer from '../redux/Orders/Reducers';
import resetPassword from '../redux/ResetPassword/Reducers';
import resetPasswordVerification from '../redux/ResetPasswordVerification/Reducers';
import changePassword from '../redux/ChangePassword/Reducers';
import WaterProviderBySubCat1 from '../redux/WaterProvidersBySubCat1/Reducers';
import WaterProviderBySubCat2 from '../redux/WaterProvidersBySubCat2/Reducers';
import TankProviderBySubCat1 from '../redux/TankProvidersBySubCat1/Reducers';
import TankProviderBySubCat2 from '../redux/TankProvidersBySubCat2/Reducers';
import TankProviderBySubCat3 from '../redux/TankProvidersBySubCat3/Reducers';
import Profile from '../redux/Profile/Reducers';
import Cart from '../redux/Cart/Reducers';
import Notification from '../redux/Notification/Reducers';
import AddressesReducer from '../redux/Address/Reducers';

export default combineReducers({
  register: registerReducer,
  verification: verificationReducer,
  setPassword: setPasswordReducer,
  resetPassword: resetPassword,
  resetPasswordVerification: resetPasswordVerification,
  changePassword: changePassword,
  login: loginReducer,
  category: categoryReducer,
  categoryService: categoryServiceReducer,
  companyInfo: companyInfoReducer,
  cart: cartReducer,
  location: locationReducer,
  favroites: favroitesReducer,
  region: regionReducer,
  sms: smsReducer,
  orders: ordersReducer,
  WaterProviderBySubCat1: WaterProviderBySubCat1,
  WaterProviderBySubCat2: WaterProviderBySubCat2,
  TankProviderBySubCat1: TankProviderBySubCat1,
  TankProviderBySubCat2: TankProviderBySubCat2,
  TankProviderBySubCat3: TankProviderBySubCat3,
  Profile: Profile,
  Cart: Cart,
  Notification: Notification,
  Addresses: AddressesReducer,
});
