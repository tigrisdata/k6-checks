import grpc from "k6/net/grpc";
import { check } from "k6";
import { Rate } from "k6/metrics";

export const errorRate = new Rate("errors");

export const options = {
  vus: 100,
  iterations: 1000,
};

const client = new grpc.Client();
client.load(["../includes/api"], "server/v1/health.proto");

export default () => {
  const url = "api.preview.tigrisdata.cloud:443";

  client.connect(url, {
    // plaintext: false
  });

  check(client.invoke("HealthAPI/Health", {}), {
    "status is OK": (r) => r && r.status === grpc.StatusOK,
  }) || errorRate.add(1);

  client.close();
};
