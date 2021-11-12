import axios from "axios";
import * as Constants from "../constants/Constants";

export default function CallApi(endpoint, method, body, param) {
  return axios({
    method: method,
    url: `${Constants.API_URL}/${endpoint}`,
    headers: Constants.HEADERS,
    params: { ...param },
    data: body,
  }).catch((err) => {
    console.log(err);
  });
}
