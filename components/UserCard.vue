<template>

    <div v-if="user"
         class="block mt-4 mx-auto max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div

                class="rounded p-3 flex justify-center space-x-3 bg-white"
        >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ name }}</h5>
        </div>
        <img v-if="profile"
             class="rounded-full w-12 h-12 border-2 border-blue-400"
             :src="profile"/>
        <pre class="text-sm mt-3 text-gray-700 dark:text-gray-400"> {{ user }}</pre>
    </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

const name = computed(
    () => user.value?.email
)
const profile = computed(
    () => user.value?.user_metadata.avatar_url
)
</script>
