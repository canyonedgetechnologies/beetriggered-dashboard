<script>
    import "../app.css";
    import { ModeWatcher, toggleMode } from "mode-watcher";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    import { Button } from '$lib/components/ui/button';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Sun, Moon, CircleUser } from 'lucide-svelte';
    
</script>
<ModeWatcher />
<Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
    <NavBrand href="/">
      <img src="/logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span class="flex flex-col gap-1">
        <span class="whitespace-nowrap text-xl font-semibold dark:text-white">Bee Triggered</span>
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
            <DropdownMenu.Content class="w-56">
              <DropdownMenu.Label>My Account</DropdownMenu.Label>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        <NavHamburger />
    </div>
</Navbar>
<div class="py-24">

    <slot></slot>
</div>