import { IS_POSTING_ITEM } from '../constants/items/itemLoaderTypes';
import { IS_AUTHENTICATING } from '../constants/account/accountLoaderTypes';
import { IS_LOADING_DASH_ITEMS } from '../constants/dashboard/dashboardLoaderTypes';
import { IS_UPLOADING_IMAGE, IS_UPLOADING_ATTACHMENTS } from '../constants/file/fileLoaderTypes';

const initialState = {
  isPostingItem: false,
  isAuthenticating: false,
  isUploadingImage: false,
  isLoadingDashItems: false,
  isUploadingAttachments: false
}

export default function(state=initialState, action) {
  switch (action.type) {
    case IS_POSTING_ITEM:
      return { ...state, ...{ isPostingItem: action.data } };
    case IS_AUTHENTICATING:
      return { ...state, ...{ isAuthenticating: action.data } };
    case IS_UPLOADING_IMAGE:
      return { ...state, ...{ isUploadingImage: action.data } };
    case IS_LOADING_DASH_ITEMS:
      return { ...state, ...{ isLoadingDashItems: action.data } };
    case IS_UPLOADING_ATTACHMENTS:
      return { ...state, ...{ isUploadingAttachments: action.data } };
    default:
      return state;
  }
}
