import { authSaga } from "../slices/auth/authSaga";
import { equipmentSaga } from "../slices/equipment/equipmentSaga";
import { packageItemSaga } from "../slices/packageItem/packageItemSaga";
import { packageSaga } from "../slices/package/packageSaga";
import { templateConstructionSaga } from "../slices/templateConstruction/templateConstructionSaga";
import { templateConstructionDetailSaga } from "../slices/templateConstructionDetail/templateConstructionDetailSaga";
import { projectSaga } from "../slices/project/projectSaga";

import { all } from "redux-saga/effects";
import { serviceSaga } from "../slices/service/serviceSaga";
import { staffSaga } from "../slices/staff/staffSaga";
import { projectDetailSaga } from "../slices/projectDetail/projectDetailSaga";
import { quotationProjectSaga } from "../slices/quotationProject/quotationProjectSaga";
import { quotationSaga } from "../slices/quotation/quotationSaga";
import { quotationDetailSaga } from "../slices/quotationDetail/quotationDetailSaga";
import { designSaga } from "../slices/design/designSaga";
import { designImageSaga } from "../slices/imageDesign/imageDesignSaga";
import { designDetailSaga } from "../slices/designDetail/designDetailSaga";
import { customerDesignSaga } from "../slices/customerDesign/customerDesignSaga";
import { constructionSaga } from "../slices/construction/constructionSaga";
import { contractSaga } from "../slices/contract/contractSaga";
import { constructionProjectSaga } from "../slices/constructionProject/constructionProjectSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    packageItemSaga(),
    equipmentSaga(),
    serviceSaga(),
    staffSaga(),
    packageSaga(),
    templateConstructionSaga(),
    templateConstructionDetailSaga(),
    projectSaga(),
    projectDetailSaga(),
    quotationProjectSaga(),
    quotationSaga(),
    quotationDetailSaga(),
    designSaga(),
    designImageSaga(),
    designDetailSaga(),
    customerDesignSaga(),
    constructionSaga(),
    contractSaga(),
    constructionProjectSaga(),
  ]);
}
