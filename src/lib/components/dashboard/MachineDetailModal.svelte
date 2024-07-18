<script>
    import * as Dialog from '$lib/components/ui/dialog';
    import * as Card from '$lib/components/ui/card';
    import { Switch } from "$lib/components/ui/switch";
    import { Input } from "$lib/components/ui/input";
    import { Badge } from "$lib/components/ui/badge";
    import { Button } from '$lib/components/ui/button';
    import * as Select from "$lib/components/ui/select";
    export let machine = {
        "_id": "6557a613d8c7174cfb137aee",
        "name": "Test Machine 1",
        "location": "Table 1",
        "status": "running",
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
        },
        open: false
    };

    const addPort = (e) => {
        if (e.key === "," && machine.config["portscan.ignore_ports.list"] !== "" && !machine.config["portscan.ignore_ports"].includes(machine.config["portscan.ignore_ports.list"]) && machine.config["portscan.ignore_ports.list"] > 0 && machine.config["portscan.ignore_ports.list"] < 65535) {
            machine.config["portscan.ignore_ports"] = [...machine.config["portscan.ignore_ports"], machine.config["portscan.ignore_ports.list"]];
            machine.config["portscan.ignore_ports.list"] = "";
        }
    }
</script>

<Dialog.Root bind:open={machine.open}>
    <Dialog.Content class="sm:max-w-[425px] hover:glow-green transition-all duration-1000">
      <Dialog.Header>
        <Dialog.Title>{machine.name}</Dialog.Title>
        <Dialog.Description>
          The BuzzBox at location {machine.location}.
        </Dialog.Description>
      </Dialog.Header>
      <div class="flex flex-col gap-4 max-h-[400px] overflow-auto">
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">Git:</span>
                    <Switch bind:checked={machine.config["git.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["git.enabled"]}
            <Card.Content>
                <div class="flex flex-row gap-4 justify-between items-center">
                    <span class="font-bold">Port:</span>
                    <Input type="number" bind:value={machine.config["git.port"]} class="w-fit" />
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">FTP:</span>
                    <Switch bind:checked={machine.config["ftp.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["ftp.enabled"]}
            <Card.Content>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Port:</span>
                        <Input type="number" bind:value={machine.config["ftp.port"]} class="w-fit" />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Banner:</span>
                        <Input type="text" bind:value={machine.config["ftp.banner"]} class="w-fit" />
                    </div>
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">HTTP:</span>
                    <Switch bind:checked={machine.config["http.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["http.enabled"]}
            <Card.Content>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Port:</span>
                        <Input type="number" bind:value={machine.config["http.port"]} class="w-fit" />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Skin:</span>
                        <Select.Root selected={{ value: machine.config["http.skin"], label: machine.config['http.skin.label'] }} onSelectedChange={(e) => {
                            e && (machine.config["http.skin"] = e.value);
                            e && (machine.config["http.skin.label"] = e.label);
                        }}>
                            <Select.Trigger class="w-[180px]">
                              <Select.Value placeholder="Skin" />
                            </Select.Trigger>
                            <Select.Content>
                                {#each machine.config["http.skin.list"] as skin}
                                    <Select.Item value={skin.name}>{skin.desc}</Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Banner:</span>
                        <Input type="text" bind:value={machine.config["http.banner"]} class="w-fit" />
                    </div>
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">HTTPS:</span>
                    <Switch bind:checked={machine.config["https.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["https.enabled"]}
            <Card.Content>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Port:</span>
                        <Input type="number" bind:value={machine.config["https.port"]} class="w-fit" />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Skin:</span>
                        <Select.Root selected={{ value: machine.config["https.skin"], label: machine.config['https.skin.label'] }} onSelectedChange={(e) => {
                            e && (machine.config["https.skin"] = e.value);
                            e && (machine.config["https.skin.label"] = e.label);
                        }}>
                            <Select.Trigger class="w-[180px]">
                              <Select.Value placeholder="Skin" />
                            </Select.Trigger>
                            <Select.Content>
                                {#each machine.config["http.skin.list"] as skin}
                                    <Select.Item value={skin.name}>{skin.desc}</Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Certificate:</span>
                        <Input type="text" bind:value={machine.config["https.certificate"]} class="w-fit" />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Key:</span>
                        <Input type="text" bind:value={machine.config["https.key"]} class="w-fit" />
                    </div>
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">HTTP Proxy:</span>
                    <Switch bind:checked={machine.config["httpproxy.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["httpproxy.enabled"]}
            <Card.Content>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Port:</span>
                        <Input type="number" bind:value={machine.config["httpproxy.port"]} class="w-fit" />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Skin:</span>
                        <Select.Root selected={{ value: machine.config["httpproxy.skin"], label: machine.config['httpproxy.skin.label'] }} onSelectedChange={(e) => {
                            e && (machine.config["httpproxy.skin"] = e.value);
                            e && (machine.config["httpproxy.skin.label"] = e.label);
                        }}>
                            <Select.Trigger class="w-[180px]">
                              <Select.Value placeholder="Skin" />
                            </Select.Trigger>
                            <Select.Content>
                                {#each machine.config["httpproxy.skin.list"] as skin}
                                    <Select.Item value={skin.name}>{skin.desc}</Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    </div>
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">Port Scan:</span>
                    <Switch bind:checked={machine.config["portscan.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["portscan.enabled"]}
            <Card.Content>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Ignore Localhost:</span>
                        <Switch bind:checked={machine.config["portscan.ignore_localhost"]} />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Log File:</span>
                        <Input type="text" bind:value={machine.config["portscan.logfile"]} class="w-fit" />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Syn Rate:</span>
                        <Input type="number" bind:value={machine.config["portscan.synrate"]} class="w-fit" />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">NMAP OS Rate:</span>
                        <Input type="number" bind:value={machine.config["portscan.nmaposrate"]} class="w-fit" />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">LO Rate:</span>
                        <Input type="number" bind:value={machine.config["portscan.lorate"]} class="w-fit" />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="flex flex-col gap-2">
                        <span class="font-bold">Ignore Ports:</span>
                            <span class="flex flex-row gap-2 flex-wrap">
                                {#each machine.config["portscan.ignore_ports"] as port}
                                    <Badge variant="outline">{port}</Badge>
                                {/each}
                            </span>
                        </span>
                        
                            
                        <!-- On typing a comma, add value to port list -->
                        <Input type="number" min="0" max="65535" bind:value={machine.config["portscan.ignore_ports.list"]} on:keyup={addPort} class="w-fit" />
                        
                        
                    </div>
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">SMB:</span>
                    <Switch bind:checked={machine.config["smb.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["smb.enabled"]}
            <Card.Content>
                <div class="flex flex-row gap-4 justify-between items-center">
                    <span class="font-bold">Audit File:</span>
                    <Input type="text" bind:value={machine.config["smb.auditfile"]} class="w-fit" />
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">MySQL:</span>
                    <Switch bind:checked={machine.config["mysql.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["mysql.enabled"]}
            <Card.Content>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Port:</span>
                        <Input type="number" bind:value={machine.config["mysql.port"]} class="w-fit" />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Banner:</span>
                        <Input type="text" bind:value={machine.config["mysql.banner"]} class="w-fit" />
                    </div>
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">SSH:</span>
                    <Switch bind:checked={machine.config["ssh.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["ssh.enabled"]}
            <Card.Content>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Port:</span>
                        <Input type="number" bind:value={machine.config["ssh.port"]} class="w-fit" />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Version:</span>
                        <Input type="text" bind:value={machine.config["ssh.version"]} class="w-fit" />
                    </div>
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">Redis:</span>
                    <Switch bind:checked={machine.config["redis.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["redis.enabled"]}
            <Card.Content>
                <div class="flex flex-row gap-4 justify-between items-center">
                    <span class="font-bold">Port:</span>
                    <Input type="number" bind:value={machine.config["redis.port"]} class="w-fit" />
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">RDP:</span>
                    <Switch bind:checked={machine.config["rdp.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["rdp.enabled"]}
            <Card.Content>
                <div class="flex flex-row gap-4 justify-between items-center">
                    <span class="font-bold">Port:</span>
                    <Input type="number" bind:value={machine.config["rdp.port"]} class="w-fit" />
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">SIP:</span>
                    <Switch bind:checked={machine.config["sip.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["sip.enabled"]}
            <Card.Content>
                <div class="flex flex-row gap-4 justify-between items-center">
                    <span class="font-bold">Port:</span>
                    <Input type="number" bind:value={machine.config["sip.port"]} class="w-fit" />
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">SNMP:</span>
                    <Switch bind:checked={machine.config["snmp.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["snmp.enabled"]}
            <Card.Content>
                <div class="flex flex-row gap-4 justify-between items-center">
                    <span class="font-bold">Port:</span>
                    <Input type="number" bind:value={machine.config["snmp.port"]} class="w-fit" />
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">NTP:</span>
                    <Switch bind:checked={machine.config["ntp.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["ntp.enabled"]}
            <Card.Content>
                <div class="flex flex-row gap-4 justify-between items-center">
                    <span class="font-bold">Port:</span>
                    <Input type="number" bind:value={machine.config["ntp.port"]} class="w-fit" />
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">TFTP:</span>
                    <Switch bind:checked={machine.config["tftp.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["tftp.enabled"]}
            <Card.Content>
                <div class="flex flex-row gap-4 justify-between items-center">
                    <span class="font-bold">Port:</span>
                    <Input type="number" bind:value={machine.config["tftp.port"]} class="w-fit" />
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">Telnet:</span>
                    <Switch bind:checked={machine.config["telnet.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["telnet.enabled"]}
            <Card.Content>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Port:</span>
                        <Input type="number" bind:value={machine.config["telnet.port"]} class="w-fit" />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Banner:</span>
                        <Input type="text" bind:value={machine.config["telnet.banner"]} class="w-fit" />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="flex flex-col gap-2">
                        <span class="font-bold">Honeycreds:</span>
                            <span class="flex flex-row gap-2 flex-wrap">
                                {#each machine.config["telnet.honeycreds"] as cred}
                                    <Badge variant="outline">{cred.username}</Badge>
                                {/each}
                            </span>
                        </span>
                    </div>
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">MSSQL:</span>
                    <Switch bind:checked={machine.config["mssql.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["mssql.enabled"]}
            <Card.Content>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Port:</span>
                        <Input type="number" bind:value={machine.config["mssql.port"]} class="w-fit" />
                    </div>
                    <div class="flex flex-row gap-4 justify-between items-center">
                        <span class="font-bold">Version:</span>
                        <Input type="text" bind:value={machine.config["mssql.version"]} class="w-fit" />
                    </div>
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between gap-2">
                    <span class="font-bold">VNC:</span>
                    <Switch bind:checked={machine.config["vnc.enabled"]} />
                </div>
            </Card.Header>
            {#if machine.config["vnc.enabled"]}
            <Card.Content>
                <div class="flex flex-row gap-4 justify-between items-center">
                    <span class="font-bold">Port:</span>
                    <Input type="number" bind:value={machine.config["vnc.port"]} class="w-fit" />
                </div>
            </Card.Content>
            {/if}
        </Card.Root>
      </div>
      <Dialog.Footer class="gap-2">
        <Button variant="outline" on:click={() => {machine.open = !machine.open}} class="hover:glow-green transition-all duration-500">Cancel</Button>
        <Button type="submit" class="hover:glow-green transition-all duration-500">Save Changes</Button>
      </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>