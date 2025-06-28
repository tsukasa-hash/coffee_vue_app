<template>
  <div>
    <h1>Firestoreのテストページ</h1>
    <router-link to="/">
      トップページに戻る
    </router-link>
    <button @click="getFirestoreCollection">
      Firestoreからデータを取得
    </button>
    <pre>{{ collectionData }}</pre>
    <p>Firestoreのコレクションからデータを取得して表示します。</p>
    <button @click="registerFirestoreData">
      Firestoreにデータを登録
    </button>
    <p>Firestoreのコレクションにデータを登録します。</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default defineComponent({
  data(): { collectionData: string } {
    return { collectionData: "" };
  },
  methods: {
    async getFirestoreCollection() {
      const querySnapshot = await getDocs(collection(db, "testCollection"));
      this.collectionData = "";
      querySnapshot.forEach((doc) => {
        this.collectionData += `${doc.id} => ${JSON.stringify(doc.data())}\n`;
      });
    },
    async registerFirestoreData() {
      try {
        const docRef = await addDoc(collection(db, "testCollection"), {
          name: "Sample Data",
          value: 123,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
});
</script>
