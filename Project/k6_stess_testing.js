import http from "k6/http";
import { sleep, check } from "k6";
import { Counter, Rate } from "k6/metrics";

// Define a custom counter to track the number of errors
const errorCount = new Counter("errors");

// Define a custom rate to track the error rate
const errorRate = new Rate("error_rate");

export let options = {
  stages: [
    { duration: "30s", target: 100 }, // Ramp up to 100 virtual users over 30 seconds
    { duration: "2m", target: 100 }, // Stay at 100 virtual users for 2 minutes
    { duration: "30s", target: 0 }, // Ramp down to 0 virtual users over 30 seconds
  ],
  thresholds: {
    errors: ["count<10"], // Fail if there are more than 10 errors
    http_req_duration: ["p(99)<500"], // 99% of requests should complete within 500ms
    error_rate: ["rate<0.01"], // Error rate should be less than 1%
  },
};

export default function () {
  let res = http.get("https://da-sh.vercel.app/");
  check(res, { "status is 200": (r) => r.status === 200 }) || errorCount.add(1);
  errorRate.add(res.status >= 400); // Increment the error rate if the response status is an error code
  sleep(1);
}
