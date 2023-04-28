import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 500, // Virtual users
  duration: "30s", // Test duration
};

export default function () {
  http.get("https://da-sh.vercel.app/");
  sleep(1);
}
