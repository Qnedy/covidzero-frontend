import { put } from "redux-saga/effects";
import http from "~/utils/config/http";
import { orderBy } from "lodash";

import { City } from "./types";
import { setAllCases, setCitiesCases, setStatesCases } from "./actions";

export function* findAllCases() {
  try {
    const resp = yield http.get("/cases/state/report");
    yield put(setAllCases(resp.data));
  } catch (error) {
    yield put(setAllCases([]));
  }
}

export function* findCitiesCases() {
  try {
    const resp = yield http.get("/cases/city");
    const cities = orderBy(
      resp.data.cases,
      [(city: City) => city.totalcases],
      ["desc"]
    );
    yield put(setCitiesCases(cities));
  } catch (error) {
    yield put(setCitiesCases([]));
  }
}

export function* findStatesCases() {
  try {
    const resp = yield http.get("/cases/state");
    yield put(setStatesCases(resp.data));
  } catch (error) {
    yield put(setStatesCases([]));
  }
}
