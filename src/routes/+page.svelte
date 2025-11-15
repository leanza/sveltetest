<script lang="ts">
  import { onMount } from "svelte";
  type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    address: { city: string };
    company: { name: string };
  };
  let users: User[] = [];
  let loading: boolean = true;
  let error: string | null = null;
  onMount(async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users?_limit=10"
      );
      if (!response.ok) throw new Error("Failed to fetch");
      users = await response.json();
    } catch (err) {
      if (err instanceof Error) {
        error = err.message;
      } else {
        error = String(err);
      }
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Svelte + Tailwind + API</title>
</svelte:head>

<div
  class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12"
>
  <div class="max-w-12xl mx-auto px-4 sm:px-6 lg:px-12">
    <div class="text-center mb-12">
      <h1
        class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4"
      >
        User Directory
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Discover profiles from our API-powered directory. Fetched in real-time.
      </p>
    </div>

    {#if loading}
      <div class="flex flex-col justify-center items-center h-96 space-y-4">
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"
        ></div>
        <p class="text-lg text-gray-600 font-medium">Fetching users...</p>
      </div>
    {:else if error}
      <div
        class="bg-red-50 border-l-4 border-red-400 text-red-700 p-6 rounded-lg shadow-sm mb-8"
      >
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <div>
            <h3 class="text-sm font-semibold">Fetch Error</h3>
            <p class="text-sm">{error}</p>
          </div>
        </div>
      </div>
    {:else}
      <!-- Full-bleed table section -->
      <div class="w-full -mx-4 sm:-mx-6 lg:-mx-8">
        <div class="mx-auto px-4 sm:px-6 lg:px-8">
          <div
            class="bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden"
          >
            <div class="px-6 py-4 bg-gradient-to-r from-indigo-500 to-blue-600">
              <h2 class="text-xl font-semibold text-white">
                User List ({users.length} total)
              </h2>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      City
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Company
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {#each users as user (user.id)}
                    <tr class="hover:bg-gray-50 transition-colors duration-200">
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        <div class="flex items-center">
                          <div
                            class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3"
                          >
                            <span class="text-white font-semibold text-sm">
                              {user.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <div class="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div class="text-sm text-gray-500">
                              ID: {user.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        <span
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          @{user.username}
                        </span>
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {user.email}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {user.phone}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        <span
                          class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {user.address.city}
                        </span>
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {user.company.name}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {#if users.length === 0}
        <div class="text-center py-12">
          <p class="text-gray-500 text-lg">No users found.</p>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  /* Optional: Custom styles if Tailwind needs extension */
</style>
