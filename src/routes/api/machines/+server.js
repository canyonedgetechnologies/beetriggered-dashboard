import { json } from '@sveltejs/kit';
export async function GET({ request }) {
      
    let data = [
        {
          "_id": "6557a613d8c7174cfb137aee",
          "name": "Test Machine 1",
          "location": "Table 1",
          "status": "running",
          "ip_address": "192.168.1.23",
          "startup_time": "2024-06-21 11:22:52.487306",
          "last_checkin": "2024-06-21 11:22:52.487306",
          "__v": 0,
          "config": {
            "device.node_id": "opencanary-1",
            "ip.ignorelist": [],
            "logtype.ignorelist": [],
            "git.enabled": true,
            "git.port": 9418,
            "ftp.enabled": false,
            "ftp.port": 21,
            "ftp.banner": "FTP server ready",
            "http.banner": "Apache/2.2.22 (Ubuntu)",
            "http.enabled": false,
            "http.port": 80,
            "http.skin": "nasLogin",
            "http.skin.list": [
              {
                "desc": "Plain HTML Login",
                "name": "basicLogin"
              },
              {
                "desc": "Synology NAS Login",
                "name": "nasLogin"
              }
            ],
            "https.enabled": true,
            "https.port": 443,
            "https.skin": "nasLogin",
            "https.certificate": "/etc/ssl/opencanary/opencanary.pem",
            "https.key": "/etc/ssl/opencanary/opencanary.key",
            "httpproxy.enabled": false,
            "httpproxy.port": 8080,
            "httpproxy.skin": "squid",
            "httproxy.skin.list": [
              {
                "desc": "Squid",
                "name": "squid"
              },
              {
                "desc": "Microsoft ISA Server Web Proxy",
                "name": "ms-isa"
              }
            ],
            "logger": {
              "class": "PyLogger",
              "kwargs": {
                "formatters": {
                  "plain": {
                    "format": "%(message)s"
                  },
                  "syslog_rfc": {
                    "format": "opencanaryd[%(process)-5s:%(thread)d]: %(name)s %(levelname)-5s %(message)s"
                  }
                },
                "handlers": {
                  "console": {
                    "class": "logging.StreamHandler",
                    "stream": "ext://sys.stdout"
                  },
                  "file": {
                    "class": "logging.FileHandler",
                    "filename": "/var/tmp/opencanary.log"
                  },
                  "Webhook": {
                    "class": "opencanary.logger.WebhookHandler",
                    "url": "http://www.beetriggered.com/api/logs",
                    "method": "POST",
                    "data": {
                      "message": "%(message)s"
                    },
                    "status_code": 200,
                    "headers": {
                      "Content-Type": "application/json"
                    }
                  }
                }
              }
            },
            "portscan.enabled": false,
            "portscan.ignore_localhost": false,
            "portscan.logfile": "/var/log/kern.log",
            "portscan.synrate": 5,
            "portscan.nmaposrate": 5,
            "portscan.lorate": 3,
            "portscan.ignore_ports": [],
            "smb.auditfile": "/var/log/samba-audit.log",
            "smb.enabled": true,
            "mysql.enabled": false,
            "mysql.port": 3306,
            "mysql.banner": "5.5.43-0ubuntu0.14.04.1",
            "ssh.enabled": true,
            "ssh.port": 22,
            "ssh.version": "SSH-2.0-OpenSSH_5.1p1 Debian-4",
            "redis.enabled": false,
            "redis.port": 6379,
            "rdp.enabled": false,
            "rdp.port": 3389,
            "sip.enabled": false,
            "sip.port": 5060,
            "snmp.enabled": false,
            "snmp.port": 161,
            "ntp.enabled": false,
            "ntp.port": 123,
            "tftp.enabled": false,
            "tftp.port": 69,
            "tcpbanner.maxnum": 10,
            "tcpbanner.enabled": false,
            "tcpbanner_1.enabled": false,
            "tcpbanner_1.port": 8001,
            "tcpbanner_1.datareceivedbanner": "",
            "tcpbanner_1.initbanner": "",
            "tcpbanner_1.alertstring.enabled": false,
            "tcpbanner_1.alertstring": "",
            "tcpbanner_1.keep_alive.enabled": false,
            "tcpbanner_1.keep_alive_secret": "",
            "tcpbanner_1.keep_alive_probes": 11,
            "tcpbanner_1.keep_alive_interval": 300,
            "tcpbanner_1.keep_alive_idle": 300,
            "telnet.enabled": false,
            "telnet.port": 23,
            "telnet.banner": "",
            "telnet.honeycreds": [
              {
                "username": "admin",
                "password": "$pbkdf2-sha512$19000$bG1NaY3xvjdGyBlj7N37Xw$dGrmBqqWa1okTCpN3QEmeo9j5DuV2u1EuVFD8Di0GxNiM64To5O/Y66f7UASvnQr8.LCzqTm6awC8Kj/aGKvwA"
              },
              {
                "username": "admin",
                "password": "admin1"
              }
            ],
            "mssql.enabled": false,
            "mssql.version": "2012",
            "mssql.port": 1433,
            "vnc.enabled": true,
            "vnc.port": 5000
          }
        },
        {
          "_id": "65587121b1b0fa5bcbce17b8",
          "name": "Machine 2",
          "location": "Desk 1",
          "status": "running",
          "ip_address": "192.168.1.29",
          "startup_time": "2024-06-21 11:22:52.487306",
          "last_checkin": "2024-06-21 11:22:52.487306",
          "__v": 0,
          "config": {
            "device.node_id": "opencanary-2",
            "ip.ignorelist": [],
            "logtype.ignorelist": [],
            "git.enabled": false,
            "git.port": 9418,
            "ftp.enabled": false,
            "ftp.port": 21,
            "ftp.banner": "FTP server ready",
            "http.banner": "Apache/2.2.22 (Ubuntu)",
            "http.enabled": true,
            "http.port": 80,
            "http.skin": "nasLogin",
            "http.skin.list": [
              {
                "desc": "Plain HTML Login",
                "name": "basicLogin"
              },
              {
                "desc": "Synology NAS Login",
                "name": "nasLogin"
              }
            ],
            "https.enabled": false,
            "https.port": 443,
            "https.skin": "nasLogin",
            "https.certificate": "/etc/ssl/opencanary/opencanary.pem",
            "https.key": "/etc/ssl/opencanary/opencanary.key",
            "httpproxy.enabled": false,
            "httpproxy.port": 8080,
            "httpproxy.skin": "squid",
            "httproxy.skin.list": [
              {
                "desc": "Squid",
                "name": "squid"
              },
              {
                "desc": "Microsoft ISA Server Web Proxy",
                "name": "ms-isa"
              }
            ],
            "logger": {
              "class": "PyLogger",
              "kwargs": {
                "formatters": {
                  "plain": {
                    "format": "%(message)s"
                  },
                  "syslog_rfc": {
                    "format": "opencanaryd[%(process)-5s:%(thread)d]: %(name)s %(levelname)-5s %(message)s"
                  }
                },
                "handlers": {
                  "console": {
                    "class": "logging.StreamHandler",
                    "stream": "ext://sys.stdout"
                  },
                  "file": {
                    "class": "logging.FileHandler",
                    "filename": "/var/tmp/opencanary.log"
                  },
                  "Webhook": {
                    "class": "opencanary.logger.WebhookHandler",
                    "url": "http://www.beetriggered.com/api/logs",
                    "method": "POST",
                    "data": {
                      "message": "%(message)s"
                    },
                    "status_code": 200,
                    "headers": {
                      "Content-Type": "application/json"
                    }
                  }
                }
              }
            },
            "portscan.enabled": false,
            "portscan.ignore_localhost": false,
            "portscan.logfile": "/var/log/kern.log",
            "portscan.synrate": 5,
            "portscan.nmaposrate": 5,
            "portscan.lorate": 3,
            "portscan.ignore_ports": [],
            "smb.auditfile": "/var/log/samba-audit.log",
            "smb.enabled": true,
            "mysql.enabled": false,
            "mysql.port": 3306,
            "mysql.banner": "5.5.43-0ubuntu0.14.04.1",
            "ssh.enabled": false,
            "ssh.port": 22,
            "ssh.version": "SSH-2.0-OpenSSH_5.1p1 Debian-4",
            "redis.enabled": false,
            "redis.port": 6379,
            "rdp.enabled": false,
            "rdp.port": 3389,
            "sip.enabled": false,
            "sip.port": 5060,
            "snmp.enabled": false,
            "snmp.port": 161,
            "ntp.enabled": false,
            "ntp.port": 123,
            "tftp.enabled": false,
            "tftp.port": 69,
            "tcpbanner.maxnum": 10,
            "tcpbanner.enabled": false,
            "tcpbanner_1.enabled": false,
            "tcpbanner_1.port": 8001,
            "tcpbanner_1.datareceivedbanner": "",
            "tcpbanner_1.initbanner": "",
            "tcpbanner_1.alertstring.enabled": false,
            "tcpbanner_1.alertstring": "",
            "tcpbanner_1.keep_alive.enabled": false,
            "tcpbanner_1.keep_alive_secret": "",
            "tcpbanner_1.keep_alive_probes": 11,
            "tcpbanner_1.keep_alive_interval": 300,
            "tcpbanner_1.keep_alive_idle": 300,
            "telnet.enabled": false,
            "telnet.port": 23,
            "telnet.banner": "",
            "telnet.honeycreds": [
              {
                "username": "admin",
                "password": "$pbkdf2-sha512$19000$bG1NaY3xvjdGyBlj7N37Xw$dGrmBqqWa1okTCpN3QEmeo9j5DuV2u1EuVFD8Di0GxNiM64To5O/Y66f7UASvnQr8.LCzqTm6awC8Kj/aGKvwA"
              },
              {
                "username": "admin",
                "password": "admin1"
              }
            ],
            "mssql.enabled": false,
            "mssql.version": "2012",
            "mssql.port": 1433,
            "vnc.enabled": false,
            "vnc.port": 5000
          }
        }
    ];

    return json(data);
}