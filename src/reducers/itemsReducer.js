import * as ItemTypes from '../constants/items/itemTypes';
import { SET_NEW_COMMENT_ERROR } from '../constants/items/itemErrorTypes';
import { SET_REQUESTED_CONNECTION, UNSET_REQUESTED_CONNECTION } from '../constants/connections/connectionReducerTypes';
import {
  SET_FILTERED_ITEMS, SET_EXPANDED_ITEM, SET_EXPANDING_ITEM, SET_SHRINK_ITEM,
  SET_LOADING_COMMENTS, SET_COMMENTS, SET_NEW_COMMENT, RESET_COMMENTS,
  INCREMENT_LIKES, DECREMENT_LIKES, INCREMENT_INTERESTED, DECREMENT_INTERESTED
} from '../constants/items/itemReducerTypes';

const initialState = {
  items: {},
  page: 0,
  pageSize: 15
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FILTERED_ITEMS:
      let newItems = {};
      if (action.page === 1) newItems = Object.assign({}, action.items);
      if (action.page > 1) newItems = Object.assign({}, state.items, action.items);
      return { ...state, ...{ items: newItems, page: action.page } };
    case SET_SHRINK_ITEM:
      let itemShrink = Object.assign({}, state.items[action.id]);
      itemShrink['expanded'] = false;
      const newItemShrink = Object.assign({}, { [action.id]: itemShrink });
      return {
        ...state, ...{
          items: Object.assign({}, state.items, newItemShrink)
        }
      };
    case SET_EXPANDING_ITEM:
      let itemExpanding = Object.assign({}, state.items[action.id]);
      itemExpanding['isExpanding'] = action.data;
      const newItemExpanding = Object.assign({}, { [action.id]: itemExpanding });
      return {
        ...state, ...{
          items: Object.assign({}, state.items, newItemExpanding)
        }
      };
    case SET_EXPANDED_ITEM:
      let itemExpand = Object.assign({}, state.items[action.id]);
      switch (itemExpand.itemType) {
        case ItemTypes.OPP_ITEM:
          itemExpand["description"] = action.data.description;
          itemExpand["attachments"] = action.data.attachmentsUrls;
          itemExpand["skills"] = action.data.skills;
          itemExpand["reward"] = action.data.reward;
          itemExpand["endDateTime"] = action.data.endDateTime;
          break;
        case ItemTypes.EVENT_ITEM:
          itemExpand["description"] = action.data.description;
          itemExpand["attachments"] = action.data.attachmentsUrls;
          break;
        default:
          break;
      }
      itemExpand["expanded"] = true;
      itemExpand["isExpanding"] = false;
      const newItemExpanded = Object.assign({}, { [action.id]: itemExpand });
      return {
        ...state, ...{
          items: Object.assign({}, state.items, newItemExpanded)
        }
      };
    case SET_LOADING_COMMENTS:
      let itemLoadingComments = Object.assign({}, state.items[action.id]);
      itemLoadingComments['showComments'] = action.showComments;
      itemLoadingComments['isLoadingComments'] = action.isLoadingComments;
      const newItemLoadingComments = Object.assign({}, { [action.id]: itemLoadingComments });
      return {
        ...state, ...{
          items: Object.assign({}, state.items, newItemLoadingComments)
        }
      };
    case SET_NEW_COMMENT:
      let itemNewComment = Object.assign({}, state.items[action.id]);
      itemNewComment.comments.push(action.comment);
      itemNewComment['numberOfComments'] = itemNewComment['numberOfComments'] + 1;
      const newItemComment = Object.assign({}, { [action.id]: itemNewComment });
      return {
        ...state, ...{
          items: Object.assign({}, state.items, newItemComment)
        }
      };
    case SET_NEW_COMMENT_ERROR:
      let itemNewCommentError = Object.assign({}, state.items[action.id]);
      let commentErrorIndex = itemNewCommentError.comments.indexOf(action.comment);
      itemNewCommentError.comments[commentErrorIndex] = Object.assign({}, itemNewCommentError.comments[commentErrorIndex], { error: 'Could not post this comment' });
      itemNewCommentError['numberOfComments'] = itemNewCommentError['numberOfComments'] - 1;
      const newItemCommentError = Object.assign({}, { [action.id]: itemNewCommentError });
      return {
        ...state, ...{
          items: Object.assign({}, state.items, newItemCommentError)
        }
      };
    case SET_COMMENTS:
      let itemComments = Object.assign({}, state.items[action.id]);
      itemComments['comments'] = action.data;
      const newItemComments = Object.assign({}, { [action.id]: itemComments });
      return {
        ...state, ...{
          items: Object.assign({}, state.items, newItemComments)
        }
      };
    case RESET_COMMENTS:
      let itemResetComments = Object.assign({}, state.items[action.id]);
      itemResetComments['comments'] = [];
      itemResetComments['showComments'] = false;
      itemResetComments['isLoadingComments'] = false;
      const newItemResetComments = Object.assign({}, { [action.id]: itemResetComments });
      return {
        ...state, ...{
          items: Object.assign({}, state.items, newItemResetComments)
        }
      };
    case INCREMENT_LIKES:
      let itemIncrementLikes = Object.assign({}, state.items[action.id]);
      itemIncrementLikes['numberOfLikes'] = itemIncrementLikes['numberOfLikes'] + 1;
      itemIncrementLikes['isLiked'] = true;
      const newItemIncrementLikes = Object.assign({}, { [action.id]: itemIncrementLikes });
      return {
        ...state, ...{
          items: Object.assign({}, state.items, newItemIncrementLikes)
        }
      };
    case DECREMENT_LIKES:
      let itemDecrementLikes = Object.assign({}, state.items[action.id]);
      itemDecrementLikes['numberOfLikes'] = itemDecrementLikes['numberOfLikes'] - 1;
      const newItemDecrementLikes = Object.assign({}, { [action.id]: itemDecrementLikes });
      return {
        ...state, ...{
          items: Object.assign({}, state.items, newItemDecrementLikes)
        }
      };
    case INCREMENT_INTERESTED:
      let itemIncrementInterested = Object.assign({}, state.items[action.id]);
      itemIncrementInterested['numberGoing'] = itemIncrementInterested['numberGoing'] + 1;
      const newItemIncrementInterested = Object.assign({}, { [action.id]: itemIncrementInterested });
      return {
        ...state, ...{
          items: Object.assign({}, state.items, newItemIncrementInterested)
        }
      };
    case DECREMENT_INTERESTED:
      let itemDecrementInterested = Object.assign({}, state.items[action.id]);
      itemDecrementInterested['numberGoing'] = itemDecrementInterested['numberGoing'] - 1;
      const newItemDecrementInterested = Object.assign({}, { [action.id]: itemDecrementInterested });
      return {
        ...state, ...{
          items: Object.assign({}, state.items, newItemDecrementInterested)
        }
      };
    case SET_REQUESTED_CONNECTION:
      let itemSetConnectionRequested = Object.assign({}, state.items[action.id]);
      itemSetConnectionRequested['connectionState'] = 'requested';
      const newItemSetConnectionRequested = Object.assign({}, { [action.id]: itemSetConnectionRequested });
      return {
        ...state, ...{
          items: Object.assign({}, state.items, newItemSetConnectionRequested)
        }
      };
    case UNSET_REQUESTED_CONNECTION:
      let itemUnSetConnectionRequested = Object.assign({}, state.items[action.id]);
      itemUnSetConnectionRequested['connectionState'] = 'initial';
      const newItemUnSetConnectionRequested = Object.assign({}, { [action.id]: itemUnSetConnectionRequested });
      return {
        ...state, ...{
          items: Object.assign({}, state.items, newItemUnSetConnectionRequested)
        }
      };
    default:
      return state;
  }
}
