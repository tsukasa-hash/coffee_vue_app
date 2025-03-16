<template>
    <div>
        <h1>抽出メソッドを登録する</h1>
        <div class="py-5">
            <div class="container">
            <div class="row">
                <div class="col-md-12">
                <form id="c_form-h" class="">
                    <div class="form-group row">
                        <label for="inputmailh" class="col-2 col-form-label" style="">メソッド名</label>
                        <div class="col-10 col-md-4" style="">
                            <input type="text" class="form-control" id="inputmailh">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputmailh" class="col-2 col-form-label" style="">コーヒー粉の量</label>
                        <div class="col-10 col-md-4" style="">
                            <input type="text" class="form-control" id="inputmailh">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputmailh" class="col-2 col-form-label" style="">コーヒーの量</label>
                        <div class="col-10 col-md-4" style="">
                            <input type="text" class="form-control" id="inputmailh">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputmailh" class="col-2 col-form-label" style="">抽出に必要なお湯の量</label>
                        <div class="col-10 col-md-4" style="">
                            <input type="text" class="form-control" id="inputmailh">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputmailh" class="col-2 col-form-label" style="">お湯の温度</label>
                        <div class="col-10 col-md-4" style="">
                            <input type="text" class="form-control" id="inputmailh">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputmailh" class="col-2 col-form-label" style="">ドリッパーの種類</label>
                        <div class="col-10 col-md-4" style="">
                            <input type="text" class="form-control" id="inputmailh">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">登録</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        <router-link to="/top">メニューに戻る</router-link>
        <br>
        <router-link to="/">トップページに戻る</router-link>
    </div>
</template>
<script setup>
import {ref} from 'vue';
import axios from 'axios';
</script>
<style scoped>

</style>