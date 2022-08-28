import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

export const errorRate = new Rate("errors");

export const options = {
  vus: 100,
  iterations: 1000,
};

export default function () {
  const url = "https://api.preview.tigrisdata.cloud/api/v1/databases/list";
  const token = `Bearer ${__ENV.AUTH_TOKEN}`;
  const params = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
  const data = {};

  check(http.post(url, data, params), {
    "status is 200": (r) => r.status === 200,
  }) || errorRate.add(1);
}
