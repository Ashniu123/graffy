import httpClient from './httpClient.js';
import wsClient from './wsClient.js';

const WSRE = /^wss?:\/\//;

export default function GraffyClient(baseUrl, getOptions = () => ({})) {
  if (WSRE.test(baseUrl)) {
    return wsClient(baseUrl, getOptions);
  } else {
    return httpClient(baseUrl, getOptions);
  }
}
