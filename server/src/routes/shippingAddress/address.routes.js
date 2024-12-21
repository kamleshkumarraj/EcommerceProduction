import {Router} from 'express'
import isLoggedIn from '../../middlewares/isLoggedIn.middleware.js';
import { addAddress } from '../../controllers/address/addAddr.controller.js';
import { deleteAddress } from '../../controllers/address/deleteAddress.controller.js';
import { addressValidation, validateFunc } from '../../validators/validation.js';
import { updateAddress } from '../../controllers/address/updateAddress.controller.js';
import { getMyAddress } from '../../controllers/address/getMyAddress.controller.js';
import { updateSelectedAddressStatus } from '../../controllers/address/updateSelectedAddressStatus.controller.js';

export const addressHandlerRouter = Router();

addressHandlerRouter.use(isLoggedIn)
addressHandlerRouter.route('/add').post(addressValidation() , validateFunc , addAddress)
addressHandlerRouter.route('/remove/:addrId').delete(deleteAddress)
addressHandlerRouter.route('/update/:addrId').patch(updateAddress)
addressHandlerRouter.route('/get').get(getMyAddress)
addressHandlerRouter.route('/update-status/:prev/:curr').patch(updateSelectedAddressStatus)