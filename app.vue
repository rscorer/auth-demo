<template>
    <div>
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>
    </div>
</template>

<script setup>

import {onMounted, ref} from "vue";

const {auth} = useSupabaseAuthClient()

const session = ref()
onMounted(() => {
    auth.onAuthStateChange((_, _session) => {
        session.value = _session
        console.log("Auth State changed", session.value)
    })
})

</script>
