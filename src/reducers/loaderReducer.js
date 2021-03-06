import { IS_SETTING_UP } from '../constants/setup/setupLoaderTypes';
import { IS_POSTING_ITEM } from '../constants/items/itemLoaderTypes';
import { IS_LOADING_EXTERNAL } from '../constants/external/externalLoaderTypes';
import { IS_LOADING_DASH_ITEMS, IS_LOADING_MORE_DASH_ITEMS, IS_MY_CONNECTIONS } from '../constants/dashboard/dashboardLoaderTypes';
import { IS_AUTHENTICATING, IS_SIGNING_UP, IS_SENDING_FORGOT_PASSWORD,IS_SENDING_RESET_PASSWORD } from '../constants/account/accountLoaderTypes';
import { IS_LOADING_NOTIFICATIONS } from '../constants/notifications/notificationLoaderTypes';
import { IS_UPLOADING_IMAGE, IS_UPLOADING_ATTACHMENTS } from '../constants/file/fileLoaderTypes';
import { IS_LOADING_CONNECTION_NOTIFICATIONS } from '../constants/connections/connectionLoaderTypes';
import { IS_LOADING_PROFILE, IS_SAVING_PROFILE, IS_SAVING_SKILLS, IS_SAVING_TOPICS } from '../constants/profiles/profileLoaderTypes';

const initialState = {
  isSigningUp: false,
  isSettingUp: false,
  isPostingItem: false,
  isAuthenticating: false,
  isLoadingProfile: false,
  isSavingProfile: false,
  isSavingSkills: false,
  isSavingTopics: false,
  isUploadingImage: false,
  isLoadingExternal: false,
  isLoadingDashItems: false,
  isLoadingMoreDashItems: false,
  isMyConnections: false,
  isLoadingConnections: false,
  isLoadingNotifications: false,
  isUploadingAttachments: false,
  isSendingForgotPassword: false
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
    case IS_LOADING_PROFILE:
      return { ...state, ...{ isLoadingProfile: action.data } };
    case IS_SAVING_SKILLS:
      return { ...state, ...{ isSavingSkills: action.data } };
    case IS_SAVING_TOPICS:
      return { ...state, ...{ isSavingTopics: action.data } };
    case IS_SAVING_PROFILE:
      return { ...state, ...{ isSavingProfile: action.data } };
    case IS_LOADING_DASH_ITEMS:
      return { ...state, ...{ isLoadingDashItems: action.data } };
    case IS_MY_CONNECTIONS:
      return { ...state, ...{ isMyConnections: action.data } };
    case IS_UPLOADING_ATTACHMENTS:
      return { ...state, ...{ isUploadingAttachments: action.data } };
    case IS_LOADING_CONNECTION_NOTIFICATIONS:
      return { ...state, ...{ isLoadingConnections: action.data } };
    case IS_LOADING_NOTIFICATIONS:
      return { ...state, ...{ isLoadingNotifications: action.data } };
    case IS_LOADING_EXTERNAL:
      return { ...state, ...{ isLoadingExternal: action.data } };
    case IS_SENDING_FORGOT_PASSWORD:
      return { ...state, ...{ isSendingForgotPassword: action.data } };
    case IS_LOADING_MORE_DASH_ITEMS:
      return { ...state, ...{ isLoadingMoreDashItems: action.data } };
    case IS_SENDING_RESET_PASSWORD:
      return { ...state, ...{ isLoadingResetPassword: action.data } };
    default:
      return state;
  }
}
