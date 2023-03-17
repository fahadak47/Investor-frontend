// two types of tokens company and User but stored sigle set at a time
export function storeTokens(tokens) {
  console.log("STORE PROCESSS", tokens);
  localStorage.setItem("IP_accessToken", tokens?.accessToken);
  localStorage.setItem("IP_refreshToken", tokens?.refreshToken);
  localStorage.setItem(
    "IP_levelTwoProfileStatus",
    JSON.stringify(tokens?.levelTwoProfileStatus)
  );
}

// Funtion for storing state who accessing the App COmpany OR User
export function storeAppState(state) {
  localStorage.setItem("IP_State", state);
}
