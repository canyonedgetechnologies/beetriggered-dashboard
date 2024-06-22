<script>
    import * as Dialog from '$lib/components/ui/dialog';
    import Button from '../ui/button/button.svelte';
    import Time from 'svelte-time';
    import { JsonView } from '@zerodevx/svelte-json-view';
    import { logtypes } from '$lib';
    export let log = {
        open: false,
    };
</script>
<Dialog.Root bind:open={log.open}>
    <Dialog.Content class="sm:max-w-[425px] hover:glow-green transition-all duration-1000">
      <Dialog.Header>
        <Dialog.Title>{logtypes[log.logtype]} Detected</Dialog.Title>
        <Dialog.Description>
          A {logtypes[log.logtype]} was detected by {log.node_id}.
        </Dialog.Description>
      </Dialog.Header>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
            <span class="font-bold">Time:</span>
            <span><Time timestamp={new Date(log.local_time_adjusted)} format="dddd @ h:mm A · MMMM D, YYYY" relative /></span>
        </div>
        <div class="flex flex-col gap-2">
            <span class="font-bold">Source IP:</span>
            <span>{log.src_host}:{log.src_port}</span>
        </div>
        <div class="flex flex-col gap-2">
            <span class="font-bold">Destination IP:</span>
            <span>{log.dst_host}:{log.dst_port}</span>
        </div>
      </div>
      <div class="h-30 overflow-auto">

        <JsonView json={log.logdata} />
      </div>
      <Dialog.Footer class="gap-2">
        <Button variant="outline" on:click={() => {log.open = !log.open}} class="hover:glow-green transition-all duration-500">Close</Button>
        <Button type="submit" class="hover:glow-green transition-all duration-500">Mark as Read</Button>
      </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>