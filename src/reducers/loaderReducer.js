import { IS_SETTING_UP } from '../constants/setup/setupLoaderTypes';
import { IS_POSTING_ITEM } from '../constants/items/itemLoaderTypes';
import { IS_LOADING_DASH_ITEMS } from '../constants/dashboard/dashboardLoaderTypes';
import { IS_LOADING_EXTERNAL } from '../constants/external/externalLoaderTypes';
import { IS_AUTHENTICATING, IS_SIGNING_UP } from '../constants/account/accountLoaderTypes';
import { IS_UPLOADING_IMAGE, IS_UPLOADING_ATTACHMENTS } from '../constants/file/fileLoaderTypes';

const initialState = {
  isSigningUp: false,
  isSettingUp: false,
  isPostingItem: false,
  isAuthenticating: false,
  isUploadingImage: false,
  isLoadingExternal: false,
  isLoadingDashItems: false,
  isUploadingAttachments: false
}

export default function(state=initialState, action) {
  switch (action.type) {
    case IS_SIGNING_UP:
      return { ...state, ...{ isSigningUp: action.data } };
    case IS_SETTING_UP:
      return { ...state, ...{ isSettingUp: action.data } };
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
    case IS_LOADING_EXTERNAL:
      return { ...state, ...{ isLoadingExternal: action.data } };
    default:
      return state;
  }
}
