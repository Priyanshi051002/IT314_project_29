import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 50 }, // Ramp up to 50 virtual users over 30 seconds
    { duration: "5s", target: 100 }, // Spike up to 100 virtual users over 5 seconds
    { duration: "30s", target: 50 }, // Ramp down to 50 virtual users over 30 seconds
  ],
};

export default function () {
  http.get("https://da-sh.vercel.app/");
  sleep(1);
}
