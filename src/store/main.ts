import { reactive, toRefs } from "vue";

import { defineStore } from "pinia";


interface IMainStore {
  isHomeLinkVisible: boolean
}

export const useMain = defineStore("main", () => {
  const state: IMainStore = reactive({
    isHomeLinkVisible: false
  });

  

  return {
    ...toRefs(state),
    
  };
});
