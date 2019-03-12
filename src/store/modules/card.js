const state = {
  cardItem: {}
}

// getters
const getters = {}

// actions
const actions = {
  cardItem({ commit },data) {
    if(data) {
      function clean() {
        return true
      }

      clean()

      let idcard = document.getElementById("CVR_IDCard");					
      let cdRes = idcard.ReadCard();
      
      if(cdRes == 0) {
        // 读卡成功
        let result = {}
        result.name = idcard.Name
        result.userNumber = idcard.CardNo
        result.idCardStartTime = idcard.EffectedDate
        result.idCardEndTime = idcard.ExpiredDate
        result.img = idcard.Picture

        // 换算年龄
        let Age = 0
        let birStr = idcard.Born.replace('年','-')
        birStr = birStr.replace('月','-')
        birStr = birStr.replace('日','-')
        birStr = birStr.split('-');
        
        let by = birStr[0];
        let bm = birStr[1];
        let bd = birStr[2];

        let nowStr = new Date();
        
        let ny = nowStr.getFullYear();
        let nm = nowStr.getMonth() + 1;
        let nd = nowStr.getDate();

        if(by == ny){
          Age = 0; //0岁
        } else {
          let ageDiff = ny - by ; //年之差
          if(ageDiff > 0){
            if(nm == bm) {
                var dayDiff = nd - bd; //日之差
                if(dayDiff < 0) {
                  Age = ageDiff - 1
                } else {
                  Age = ageDiff
                }
            } else {
              var monthDiff = nm - bm;//月之差
              if(monthDiff < 0){
                Age = ageDiff - 1;
              } else {
                Age = ageDiff ;
              }
            }
          }
        }
        result.Age = Age
        commit('cardItem', result)
      } else {
        alert(cdRes)
      }
    } else {
      commit('cardItem', {})
    }
  }
}

// mutations
const mutations = {
  cardItem(state, data) {
    state.cardItem = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}