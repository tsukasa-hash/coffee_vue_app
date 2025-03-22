<template>
    <div>
        <h1>どの抽出メソッドを見る？</h1>
        <!-- TODO:ユーザが登録している抽出メソッドの一覧をデフォルト表示する -->
        <button class="btn btn-light shadow-sm" @click="get_methods">抽出方法を取得する</button>
        <div>
            <label v-for="method in methods" :key="method.id">
                <input type="radio" :value="method.id" v-model="method_id">{{ method.method_name }}
            </label>
            <br>
            {{ this.method_id }}
        </div>
        <div v-if="this.isShow">
            <!-- TODO:method_idを渡し、タイトルに表示する -->
            <MethodDetailViewer/>
        </div>
        <br>
        <router-link to="/top">メニューに戻る</router-link>
        <br>
        <router-link to="/">トップページに戻る</router-link>
    </div>
</template>
<script>
import MethodDetailViewer from "./MethodDetailViewer.vue";

export default {
    name: "MethodListViewer",
    components: {
        MethodDetailViewer
    },
    data: () => ({
        methods: null,
        isShow: false,
        method_id: null
    }),
    methods: {
       async get_methods() {
            await this.axios
                .get(`http://127.0.0.1:5000/api/get_methods`)
                .then((res) => {
                    if (res.data.is_success) {
                        this.methods = res.data.methods;
                    } else {
                        alert("リクエストは失敗しました。")
                }
                })
                .catch(() => {
                    this.is_success = false;
                    alert("通信中にエラーが発生しました。");
                    
                });
        },
    },
    watch: {
        method_id: function() {
            this.isShow = this.method_id !== null
        }
    }
}
</script>
<style scoped>

</style>