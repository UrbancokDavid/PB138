export module Settings {
  export const host_address: string = "http://localhost";
  export const host_port: number = 3000;
  export const host: string = host_address + ':' + String(host_port);
}
