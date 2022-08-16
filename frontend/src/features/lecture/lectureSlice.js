import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPopularLectures,
  fetchRecommendLectures,
  fetchLatestLectures,
  fetchLectureDetail,
  fetchSections,
  fetchIsEnroll,
  fetchReviews,
} from './lectureActions';
import thumbnail1 from '../../img/pop.jpeg';

const initialState = {
  popularLectures: [],
  recommendLectures: {
    lecList: [],
    ageGroup: 0,
    userGender: 0,
  },
  lectures: [],
  lecture: {
    lecId: '',
    lecThumb: '',
    lecTitle: '',
    lecLevel: '',
    lecGenre: '',
    lecCategory: '',
    lecPrice: '',
    lecContents: '',
    lecNotice: '',
    lecSchedule: '',
    dayAndTime: '',
    lecStartDate: '',
    lecEndDate: '',
    lecStudent: '',
    lecLimit: '',
    insInfo: {},
  },
  isEnroll: false,
  sections: [],
  reviews: [],
};

const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPopularLectures.fulfilled]: (state, { payload }) => {
      state.popularLectures = payload.data;
    },
    [fetchRecommendLectures.fulfilled]: (state, { payload }) => {
      console.log('reco', payload.data);
      state.recommendLectures = payload.data;
    },
    [fetchLatestLectures.fulfilled]: (state, { payload }) => {
      state.lectures = payload.content;
    },
    [fetchLectureDetail.fulfilled]: (state, { payload }) => {
      state.lecture = payload.data;
    },
    [fetchSections.fulfilled]: (state, { payload }) => {
      state.sections = payload.data.content;
    },
    [fetchIsEnroll.fulfilled]: (state, { payload }) => {
      state.isEnroll = payload.data;
    },
    [fetchReviews.fulfilled]: (state, { payload }) => {
      state.reviews = payload.data.content;
    },
  },
});

export default lectureSlice.reducer;
