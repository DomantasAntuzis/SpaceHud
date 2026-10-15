<script>
  import favicon from "$lib/assets/favicon.svg";
  import "../app.css";
  import { onMount } from "svelte";
  import { refreshUser } from "$lib/state/user.svelte.js";

  let { children } = $props();

  onMount(refreshUser);
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
