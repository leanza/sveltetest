<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

{@render children()}
