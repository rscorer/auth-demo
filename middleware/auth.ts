export default defineNuxtRouteMiddleware(async ({path}, from) => {
    const user = await useSupabaseUser()
    if (user.value) {
        return
    }
    console.log("No user")
    const {auth} = await useSupabaseAuthClient()
    const session = await auth.getSession()
    if (session.data.session !== null) {
        console.log("Got Auth session, user = ", session.data.session.user)
        return
    }
    console.log("No auth session")
    return navigateTo(`/login?redirectTo=${path}`)
})
