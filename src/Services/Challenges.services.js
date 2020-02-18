/**
    * Obtener todos los retos según la página, el estado y opcionalmente una palabra clave
    */
export const getChallengesByPageAndStatus = async function (page, state, isASearch) {

   let url = `${process.env.REACT_APP_BACK_URL}/challenges/${page}/${state}`;
   url = isASearch ? url + `/search/?value=${this.state.searchElement}` : url;
   const token = this.state.token;

   await axios.get(url, {
      headers: { 'x-auth-token': `${token}` }

   }).then((result) => {
      if (result.data) {
         this.setState({ renderedChallenges: result.data.result, totalElements: result.data.totalElements, loadingChallenges: false });
      }
   }).catch((error) => {
      this.setState({ renderedChallenges: [], totalElements: [], loadingChallenges: false });

   });

   // await this.begginingPage.current.scrollIntoView();
}