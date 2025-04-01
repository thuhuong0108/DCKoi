import { ServiceType } from "./../../../models/ServiceType";
import { call, fork, put, select, take } from "redux-saga/effects";
import { BlogState, blogActions } from "./blogSlices";
import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "@/models/Common";
import { createBlogs, getBlogs } from "@/api/blog";

function* fetchBlogWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getBlogs, action.payload);
    if (data.isSuccess) {
      yield put(blogActions.fetchBlogSuccess(data));
    } else {
      messageSuccess(data.message);
      yield put(blogActions.fetchBlogFailed());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(blogActions.fetchBlogFailed());
    console.log(error);
  }
}

function* createBlogWorker(action: PayloadAction<ServiceType>) {
  try {
    const data = yield call(createBlogs, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const blogState: BlogState = yield select((state) => state.blog);

      yield put(
        blogActions.fetchBlog({
          pageNumber: blogState.blogs.pageNumber,
          pageSize: blogState.blogs.pageSize,
        })
      );
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(blogActions.fetchBlogFailed());
    console.log(error);
  }
}

function* fetchBlogWatcher() {
  while (true) {
    const action = yield take(blogActions.fetchBlog.type);
    yield fork(fetchBlogWorker, action);
  }
}

function* createBlogWatcher() {
  while (true) {
    const action = yield take(blogActions.createBlog.type);
    yield fork(createBlogWorker, action);
  }
}

export function* blogSaga() {
  yield fork(fetchBlogWatcher);
  yield fork(createBlogWatcher);
}
