

function registerToggleButton(toggleSelector) {
   const toggleButton = document.querySelector(toggleSelector)
   toggleButton.addEventListener('click', (e) => {
      const leftButton = toggleButton.querySelector('.left-button')
      const rightButton = toggleButton.querySelector('.right-button')
      if (e.target.classList.contains('left-button')) {
         leftButton.classList.add('person-type-button-active')
         rightButton.classList.remove('person-type-button-active')
      }
      if (e.target.classList.contains('right-button')) {
         rightButton.classList.add('person-type-button-active')
         leftButton.classList.remove('person-type-button-active')
      }
   })
}

registerToggleButton('#toggle-best')

function makeCartOpenable(){
   document.querySelectorAll('.person-cart').forEach( cart => {
      if (cart.querySelector('.open-cart-button')){
         cart.querySelector('.open-cart-button').addEventListener('click', (e) => {
            cart.querySelector('.full-cart').classList.toggle('cart-bottom-active')
            cart.querySelector('.small-cart').classList.toggle('cart-bottom-active')
         })
      }
      
   } )


}

function makeRecomendButtonActive(){
   document.querySelectorAll('.rate-button').forEach( button => {
      button.addEventListener('click', (e) => {
         const personButtons = button.parentNode.parentNode
         const personCart = personButtons.parentNode.parentNode
         const personId = personCart.dataset.person_id
         const likeButton = personButtons.querySelector('.like-button')
         const dislikeButton = personButtons.querySelector('.dislike-button')
         if (button.classList.contains('rate-button-active')) return
         if (button == likeButton) {
            if (dislikeButton.classList.contains('rate-button-active')) {
               dislikeButton.classList.remove('rate-button-active')
               likeButton.classList.add('rate-button-active')
               changeRecomendText(likeButton, '+')
               changeRecomendText(dislikeButton, '-')
               removeRateId(personId)
               addRateId(personId, 'like')
            } else {
               likeButton.classList.add('rate-button-active')
               changeRecomendText(likeButton, '+')
               addRateId(personId, 'like')
            }
         }
         if (button == dislikeButton){
            if (likeButton.classList.contains('rate-button-active')) {
               likeButton.classList.remove('rate-button-active')
               dislikeButton.classList.add('rate-button-active')
               changeRecomendText(dislikeButton, '+')
               changeRecomendText(likeButton, '-')
               removeRateId(personId)
               addRateId(personId, 'dislike')
            } else {
               dislikeButton.classList.add('rate-button-active')
               changeRecomendText(dislikeButton, '+')
               addRateId(personId, 'dislike')
            }
         }
         //button.classList.add('rate-button-active')
         //button.parentNode.querySelector('span').innerHTML = button.parentNode.querySelector('span').innerHTML.split(':')[0] + ': ' + (+button.parentNode.querySelector('span').innerHTML.split(':')[1]+1)
      })
      
   } )
}

function changeRecomendText(button, char){
   if (char == '+') {
      button.parentNode.querySelector('span').innerHTML = button.parentNode.querySelector('span').innerHTML.split(':')[0] + ': ' 
      + (+button.parentNode.querySelector('span').innerHTML.split(':')[1]+1)
      return
   }
   if (char == '-'){
      button.parentNode.querySelector('span').innerHTML = button.parentNode.querySelector('span').innerHTML.split(':')[0] + ': ' 
      + (+button.parentNode.querySelector('span').innerHTML.split(':')[1]-1)
      return
   }
}

const rate = {personCarts: [{id: 'hfghgf', recommend: 'like'}, {id: 'dgfdg', recommend: 'dislike'}]}

makeCartOpenable()
makeRecomendButtonActive()

function removeRateId(personId){
   let json = {}
   if (localStorage.getItem('Rate')){
      json = JSON.parse(localStorage.getItem('Rate'))
   } else return
   const carts = json.personCarts
   for (let i = 0; i < carts.length; i++){
      if (carts[i].id == personId){
         json.personCarts.splice(i, 1)
         localStorage.setItem('Rate', JSON.stringify(json))
      }
   }
}

function addRateId(personId, recommend){
   let json = {}
   if (localStorage.getItem('Rate')){
      json = JSON.parse(localStorage.getItem('Rate'))
      json.personCarts.push({id: personId, recommend})
      localStorage.setItem('Rate', JSON.stringify(json))
   } else {
      json.personCarts = []
      json.personCarts.push({id: personId, recommend})
      localStorage.setItem('Rate', JSON.stringify(json))
   }
}

function initRecommendButtons(){
   if (!localStorage.getItem('Rate')) return
   else {
      const json = JSON.parse(localStorage.getItem('Rate'))

      json.personCarts.forEach( cart => {
         console.log(cart)
         const personCart = document.querySelector(`[data-person_id="${cart.id}"]`)
         if (cart.recommend == 'like') {
            personCart.querySelector('.like-button').classList.add('rate-button-active')
            return
         }
         if (cart.recommend == 'dislike') {
            personCart.querySelector('.dislike-button').classList.add('rate-button-active')
            return
         }
      } )
   }
}

function addLoader(rootSelector){
   const root = document.querySelector(rootSelector)
   const loaderWrapper = document.createElement('div')
   loaderWrapper.classList.add('loader-wrapper')
   const loader = document.createElement('div')
   const loaderImg = document.createElement('img')
   loaderImg.src = './assets/img/loader.svg'
   loader.appendChild(loaderImg)
   loaderWrapper.appendChild(loader)
   loaderWrapper.classList.add('loader')
   root.appendChild(loaderWrapper)
}

function removeLoader(rootSelector){
   const root = document.querySelector(rootSelector)
   root.removeChild(root.querySelector('.loader-wrapper'))
}

function loadMore(){
   document.querySelector('.load-button').addEventListener('click', () => {
      addLoader('.container-common-rating')
      setTimeout(() => {
         removeLoader('.container-common-rating')
      }, 500)
   })
}

initRecommendButtons()
loadMore()









