<script>
    import "../app.css";
    import { toggleMode } from "mode-watcher";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    import { Button } from '$lib/components/ui/button';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import * as Table from '$lib/components/ui/table';
    import { Sun, Moon, CircleUser, Trash, CirclePlus } from 'lucide-svelte';
    import { Input } from '$lib/components/ui/input';

    import { onMount } from 'svelte';

    import { page } from '$app/stores';

    let alertSettingsOpen = false;

    let alertHandlers = [];

    let newAlertHandler = {
      type: 'email',
      address: ''
    }

    const addAlertHandler = async () => {
      await fetch('/api/handlers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAlertHandler)
      }).then(res => res.json()).then(data => {
        getAlertHandlers();
        newAlertHandler.address = '';
      });
    }

    const deleteAlertHandler = async (handler) => {
      await fetch(`/api/handlers/${handler}`, {
        method: 'DELETE'
      }).then(res => res.json()).then(data => {
        getAlertHandlers();
      });
    }

    const getAlertHandlers = async () => {
      const res = await fetch('/api/handlers');
      const data = await res.json();
      alertHandlers = data;
    }

    onMount(() => {
      getAlertHandlers();
    });
    
</script>
<Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
    <NavBrand href="/" class="text-gray-900 dark:text-white">
      <img src="/logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span class="flex flex-col gap-1">
        <span class="whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">Bee Triggered</span>
        <small class="text-[8px]">by <a href="https://www.canyonedgetech.com" class="font-bold">Canyon Edge Technologies</a></small>
      </span>
      
    </NavBrand>
    <NavUl>
    </NavUl>
    <div class="flex gap-4 md:order-2">
        <Button on:click={toggleMode} variant="outline" size="icon">
            <Sun
              class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <Moon
              class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span class="sr-only">Toggle theme</span>
        </Button>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
              <Button builders={[builder]} variant="outline" size="icon"><CircleUser class="h-[1.2rem] w-[1.2rem]" /></Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end" class="w-56">
              <DropdownMenu.Label>{$page.data.session?.user?.email}</DropdownMenu.Label>
              <DropdownMenu.Item on:click={() => { alertSettingsOpen = !alertSettingsOpen}}>Manage Alert Handlers</DropdownMenu.Item>
              <DropdownMenu.Item href="/auth/signout">Sign Out</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        <NavHamburger />
    </div>
</Navbar>
<div class="py-24">

    <slot></slot>
</div>

<Dialog.Root bind:open={alertSettingsOpen}>
  <Dialog.Content class="sm:max-w-[425px] hover:glow-green transition-all duration-1000">
    <Dialog.Header>
      <Dialog.Title>Manage Alert Handlers</Dialog.Title>
      <Dialog.Description>
        Choose where you recieve alerts
      </Dialog.Description>

      <b>Subscribe Email to Alerts:</b>
      <form on:submit|preventDefault={addAlertHandler} class="flex flex-row gap-4">
          <Input type="email" placeholder="Enter Email Address here..." bind:value={newAlertHandler.address} />
          <Button size="icon" variant="outline" type="submit">
            <CirclePlus class="h-[1.2rem] w-[1.2rem]" />
          </Button>
      </form>
      <!-- Show a list of alert methods for email, slack, and teams webhooks -->
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Method</Table.Head>
            <Table.Head>Address</Table.Head>
            <Table.Head class="text-right w-[100px]"></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each alertHandlers as handler}
          <Table.Row>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>
              {handler.address}
            </Table.Cell>
            <Table.Cell class="text-right">
              <Button variant="destructive" size="icon" on:click={() => { deleteAlertHandler(handler._id) }}>
                <Trash class="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </Table.Cell>
          </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>