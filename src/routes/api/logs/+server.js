import { json } from '@sveltejs/kit';
export async function GET({ request }) {
      
    let data = [
        {
          "_id": "6675628c013d5b95e9217dca",
          "dst_host": "127.0.0.1",
          "dst_port": 443,
          "local_time": "2024-06-21 11:22:52.487306",
          "local_time_adjusted": "2024-06-21 05:22:52.487413",
          "logdata": {
            "HOSTNAME": "localhost",
            "PATH": "/index.html",
            "SKIN": "nasLogin",
            "USERAGENT": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
          },
          "logtype": 3000,
          "node_id": "opencanary-1",
          "src_host": "127.0.0.1",
          "src_port": 57700,
          "utc_time": "2024-06-21 11:22:52.487404",
          "__v": 0
        },
        {
          "_id": "667560ef013d5b95e9217dc3",
          "dst_host": "127.0.0.1",
          "dst_port": 443,
          "local_time": "2024-06-21 11:15:59.622214",
          "local_time_adjusted": "2024-06-21 05:15:59.622241",
          "logdata": {
            "HOSTNAME": "localhost",
            "PATH": "/index.html",
            "SKIN": "nasLogin",
            "USERAGENT": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
          },
          "logtype": 3000,
          "node_id": "opencanary-1",
          "src_host": "127.0.0.1",
          "src_port": 57040,
          "utc_time": "2024-06-21 11:15:59.622234",
          "__v": 0
        }
      ];

    return json(data);
}