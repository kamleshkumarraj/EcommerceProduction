import {Router} from 'express'
import isLoggedIn from '../../middlewares/isLoggedIn.middleware.js';
import { addAddress } from '../../controllers/address/addAddr.controller.js';
import { deleteAddress } from '../../controllers/address/deleteAddress.controller';
import { addressValidation, validateFunc } from '../../validators/validation';
import { updateAddress } from '../../controllers/address/updateAddress.controller';
import { getMyAddress } from '../../controllers/address/getMyAddress.controller';

const addressHandlerRouter = Router();

addressHandlerRouter.use(isLoggedIn)
addressHandlerRouter.route('/add').post(addressValidation() , validateFunc , addAddress)
addressHandlerRouter.route('/remove').delete(deleteAddress)
addressHandlerRouter.route('/update').patch(updateAddress)
addressHandlerRouter.route('/get').get(getMyAddress)