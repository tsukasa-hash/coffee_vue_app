<template>
    <div>
        <h1>何をする？</h1>
        <router-link to="/">抽出する</router-link>
        <br>
        <router-link to="/method_register">抽出を登録する</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'topPage'
}
</script>