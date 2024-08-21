import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_tracks':
      return action.payload;
      case 'delete_track':
        return state.filter(track => track._id !== action.payload);
    default:
      return state;
  }
};

const deleteTrack = dispatch => async (id) => {
  try {
    await trackerApi.delete(`/tracks/${id}`);
    dispatch({ type: 'delete_track', payload: id });
  } catch (err) {
    console.log(err);
  }
};

const fetchTracks = dispatch => async () => {
  const response = await trackerApi.get('/tracks');
  dispatch({ type: 'fetch_tracks', payload: response.data });
};
const createTrack = dispatch => async (name, locations) => {
  await trackerApi.post('/tracks', { name, locations });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack, deleteTrack },
  []
);
