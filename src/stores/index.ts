import { getApiList } from '@/server'
import { defineStore } from 'pinia'
import type { Children, ChinaAdd, ChinaTotal, RootObject, StatisGradeCityDetail } from '@/stores/type'

export const useNovidStore = defineStore({
  id: 'novid',
  state: () => ({
    list:<RootObject>{},
    item:<Children[]>[],
    chinaAdd:<ChinaAdd>{},
    chinaTotal:<ChinaTotal>{},
    cityDetail:<StatisGradeCityDetail[]>[]
  }),
  getters: {
   
  },
  actions: {
    async getlist() {
      const result = await getApiList()
      this.list = result
      const { chinaAdd, chinaTotal } = this.list.diseaseh5Shelf
      this.chinaAdd = chinaAdd
      this.chinaTotal = chinaTotal
      this.cityDetail = this.list.statisGradeCityDetail.slice(0,10)
      console.log(result)
    }
  }
})
