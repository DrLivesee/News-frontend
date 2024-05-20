import { reactive, toRefs } from "vue";

import { defineStore } from "pinia";


interface IMainStore {
  isHomeLinkVisible: boolean;
  isUserProfileVisible: boolean;
}

export const useMain = defineStore("main", () => {
  const state: IMainStore = reactive({
    isHomeLinkVisible: false,
    isUserProfileVisible: false,
  });

  

  return {
    ...toRefs(state),
    
  };
});
