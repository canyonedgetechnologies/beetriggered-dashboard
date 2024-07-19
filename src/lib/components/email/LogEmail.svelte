<script>
    import Time from 'svelte-time';
    import { JsonView } from '@zerodevx/svelte-json-view';
    import { Html } from 'svelte-email';

    export let log;
</script>
<Html>

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

</Html>
