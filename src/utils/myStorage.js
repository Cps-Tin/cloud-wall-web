var myStorage = {

     // 用户点赞集合
  addPrize(prize){
    let prizeList = this.getPrizeList();
    prizeList.push(prize);
    this.setPrizeList(prizeList);
  },
  getPrizeList(){
    return JSON.parse(localStorage.getItem("prizeList")) || [];
  },
  setPrizeList(prizeList){
    localStorage.setItem("prizeList",JSON.stringify(prizeList));
  },
  removePrizeList(){
    localStorage.removeItem("prizeList");
  },

  // 用户登陆信息
  getUserSession(){
    return JSON.parse(sessionStorage.getItem("userSession")) || null;
  },
  setUserSession(user){
    sessionStorage.setItem("userSession",JSON.stringify(user));
  },
  removeUserSession(){
    sessionStorage.removeItem("userSession");
  },

    
};
export default myStorage