const C_PREFIX = "/clusters/c"
const WITHOUT_C_PREFIX = "/clusters/"

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.startsWith(C_PREFIX)) {
    return navigateTo(to.path.replace(C_PREFIX, WITHOUT_C_PREFIX));
  }
});