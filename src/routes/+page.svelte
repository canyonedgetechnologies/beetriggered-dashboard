<script>
	import { Button } from "$lib/components/ui/button/index.js";
    import { Ellipsis, Mail, Eye, Cog, RefreshCw } from "lucide-svelte";
	import * as Card from "$lib/components/ui/card/index.js";
    import * as Table from "$lib/components/ui/table";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Indicator } from 'flowbite-svelte';
    import Time from 'svelte-time';
    import { logtypes } from '$lib';

    import { dayjs } from 'svelte-time';

    import axios from 'axios';

    import { onMount } from 'svelte';
    import LogDetailModal from "$lib/components/dashboard/LogDetailModal.svelte";
    import MachineDetailModal from "$lib/components/dashboard/MachineDetailModal.svelte";

    let logs = [];
    let machines = [];

    const getLogs = async () => {
        logs = await axios.get('/api/logs').then((res) => { return res.data} );

        for (let log of logs) {
            log.open = false;
        }
    }

    const getMachines = async () => {
        machines = await axios.get('/api/machines').then((res) => { return res.data} );

        for (let machine of machines) {
            machine.open = false;
        }
    }

    onMount(() => {
        getLogs();
        getMachines();
    });
</script>
<div class="px-10 flex flex-col gap-16">
    <div class="flex flex-col gap-8">
        <h1>Alerts</h1>
        <Card.Root class="pt-8">
            <Card.Content>
                <Table.Root>
                    <Table.Header>
                    <Table.Row>
                        <Table.Head class="w-[100px]">Code</Table.Head>
                        <Table.Head>Buzz Box</Table.Head>
                        <Table.Head>Title</Table.Head>
                        <Table.Head>Source IP</Table.Head>
                        <Table.Head>Destination IP</Table.Head>
                        <Table.Head>Time</Table.Head>
                        <Table.Head class="text-right"></Table.Head>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {#each logs as log}
                    <Table.Row>
                        <Table.Cell class="font-medium">{log.logtype}</Table.Cell>
                        <Table.Cell>{log["node_id"]}</Table.Cell>
                        <Table.Cell>{logtypes[log.logtype]} detected</Table.Cell>
                        <Table.Cell>{log.src_host}</Table.Cell>
                        <Table.Cell>{log.dst_host}</Table.Cell>
                        <Table.Cell><Time timestamp={new Date(log.local_time_adjusted)} relative /></Table.Cell>
                        <Table.Cell class="text-right">
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild let:builder>
                                <Button builders={[builder]} variant="outline" size="icon"><Ellipsis class="h-[1.2rem] w-[1.2rem]" /></Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content class="w-56">
                                    <DropdownMenu.Item>
                                        <Mail class="mr-2 h-4 w-4" />
                                        <span>Mark as Read</span>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item on:click={() => {log.open = !log.open}}>
                                        <Eye class="mr-2 h-4 w-4" />
                                        <span>View Details</span>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </Table.Cell>
                    </Table.Row>
                    {/each}
                    </Table.Body>
                </Table.Root>
            </Card.Content>
        </Card.Root>
    </div>
    <div class="flex flex-col gap-6">
        <h1>Buzz Boxes</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each machines as machine}
            <Card.Root class="hover:glow-green transition-all duration-1000">
                <Card.Header>
                    <div class="flex items-center justify-between">
                        {#if machine.status == "offline"}
                        <span class="flex items-center"><Indicator size="sm" color="red" class="me-1.5 glow-red" />Offline</span>
                        {:else if machine.status == "running"}
                        <span class="flex items-center"><Indicator size="sm" color="green" class="me-1.5 glow-green" />Online</span>
                        {/if}
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild let:builder>
                                <Button builders={[builder]} variant="outline" size="icon"><Ellipsis class="h-[1.2rem] w-[1.2rem]" /></Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content class="w-56">
                                <DropdownMenu.Item on:click={() => machine.open = !machine.open}>
                                    <Cog class="mr-2 h-4 w-4" />
                                    <span>Configure</span>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item>
                                    <RefreshCw class="mr-2 h-4 w-4" />
                                    <span>Check For Updates</span>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>
                    <h2>{machine.name}</h2>
                </Card.Header>
                <Card.Content>
                    <ul class="flex flex-col gap-2">
                        <li class="flex flex-row justify-between gap-2"><span class="font-bold">Last Check In: </span><Time timestamp={machine.last_checkin} relative /></li>
                        <li class="flex flex-row justify-between gap-2"><span class="font-bold">IP Address: </span> {machine.ip_address}</li>
                        <li class="flex flex-row justify-between gap-2"><span class="font-bold">Location: </span> {machine.location}</li>
                        <li class="flex flex-row justify-between gap-2"><span class="font-bold">Uptime: </span> {dayjs(machine.startup_time).toNow(true)}</li>
                    </ul>
                </Card.Content>
            </Card.Root>
            {/each}
        </div>
    </div>
</div>

{#each logs as log}
<LogDetailModal bind:log={log} />
{/each}

{#each machines as machine}
<MachineDetailModal bind:machine={machine} />
{/each}

  
