<template>
    <div>
        <h1>トップページ</h1>
        <button class="btn btn-primary">top page</button>
        <router-link to="/">HelloWorldへ遷移</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'topPage'
}
</script>