import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

export const errorRate = new Rate("errors");

export const options = {
  vus: 100,
  iterations: 1000,
};

export default function () {
  const url = "https://api.preview.tigrisdata.cloud/v1/health";

  check(http.get(url), {
    "status is 200": (r) => r.status === 200,
  }) || errorRate.add(1);
}
