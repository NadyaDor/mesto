(()=>{"use strict";class e{constructor({myId:e,data:t,handleCardClick:s,handleDeleteClick:n,handleSetLike:i,handleDeleteLike:r},a){this._data=t,this._cardId=t._id,this._userId=t.userId,this._likes=t.likes,this._name=t.name,this._link=t.link,this._ownerId=t.owner._id,this._myId=e,this._handleCardClick=s,this._handleDeleteClick=n,this._handleSetLike=i,this._handleDeleteLike=r,this._templateSelector=a}_getTemplate(){return document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(!0)}generateCard(){return this._element=this._getTemplate(),this._elementLike=this._element.querySelector(".card__hurt"),(this.hasMyLike=this._likes.some((e=>e._id===this._myId)))?this._elementLike.classList.add("card__hurt_active"):this._elementLike.classList.remove("card__hurt_active"),this._elementMask=this._element.querySelector(".card__mask"),this._elementMask.src=this._link,this._elementMask.alt=this._name,this._element.querySelector(".card__place").textContent=this._name,this._likesCount=this._element.querySelector(".card__hurt-count"),this._likesCount.textContent=this._likes.length,this._setEventListeners(),this._element}cardId(){return this._cardId}isLike(){this._likes.forEach((e=>{e._id===this._userId?this._elementLike.classList.add("card__hurt_active"):this._elementLike.classList.remove("card__hurt_active")}))}_setEventListeners(){this._elementLike.addEventListener("click",(()=>{this._elementLike.classList.contains("card__hurt_active")?this._handleDeleteLike(this._cardId):this._handleSetLike(this._cardId)})),this._element.querySelector(".card__basket").addEventListener("click",this._handleDeleteClick),this._elementMask.addEventListener("click",(()=>{this._handleCardClick(this._name,this._link)}))}handleLikeClick=e=>{this._likes=e.likes,this._likesCount.textContent=this._likes.length,this._elementLike.classList.toggle("card__hurt_active")};_handleDeleteClick(){this._handleDeleteClick(this._cardId)}deleteCard(){this._element.remove(),this._element=null}}class t{constructor(e,t){this._element=t,this.enableValidationObj=e,this._inputs=Array.from(this._element.querySelectorAll(this.enableValidationObj.inputSelector)),this._button=this._element.querySelector(this.enableValidationObj.submitButtonSelector)}_showInputError(e,t){const s=this._element.querySelector(`#${e.id}-error`);e.classList.add(this.enableValidationObj.inputErrorClass),s.textContent=t,s.classList.add(this.enableValidationObj.errorClass)}_hideInputError(e){const t=this._element.querySelector(`#${e.id}-error`);e.classList.remove(this.enableValidationObj.inputErrorClass),t.textContent="",t.classList.remove(this.enableValidationObj.errorClass)}_isValid(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_hasInvalidInput(){return this._inputs.some((e=>!e.validity.valid))}_toggleBattonState(){this._hasInvalidInput()?(this._button.setAttribute("disabled",!0),this._button.classList.add(this.enableValidationObj.inactiveButtonClass)):(this._button.removeAttribute("disabled"),this._button.classList.remove(this.enableValidationObj.inactiveButtonClass))}_setEventListernes(){this._toggleBattonState(),this._element.addEventListener("reset",(()=>{setTimeout((()=>{this._toggleBattonState()}),0)})),this._inputs.forEach((e=>{e.addEventListener("input",(()=>{this._isValid(e),this._toggleBattonState()}))}))}enableValidation(){this._element.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListernes()}}const s=document.querySelector(".profile__edit-button"),n=document.querySelector(".popup_profile"),i=(n.querySelector(".popup__input_type_name"),n.querySelector(".popup__input_type_about"),document.querySelector(".profile__name"),document.querySelector(".profile__about"),document.querySelector(".profile__avatar"),document.querySelector(".popup_card")),r=document.querySelector(".profile__add-button"),a=(document.querySelector(".popup-mesto"),document.querySelector(".popup_basket")),o=document.querySelector(".profile__edit-avatar"),l=(document.querySelector(".popup__input_type_avatar"),document.querySelector(".popup_avatar")),h={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button-edit",inactiveButtonClass:"popup__button-edit_inactive",inputErrorClass:"popup__input_error",errorClass:"popup__input-error_active"};class c{constructor(e){this._popupElement=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}open(){this._popupElement.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popupElement.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){27===e.keyCode&&this.close()}_handleOverlayClose(){this._popupElement.addEventListener("mousedown",(e=>{e.currentTarget===e.target&&this.close()}))}setEventListeners(){this._closeButton=this._popupElement.querySelector(".popup__close"),this._closeButton.addEventListener("click",(()=>{this.close()})),this._handleOverlayClose()}}class d extends c{constructor({popupElement:e,handleFormSubmit:t}){super(e),this._form=this._popupElement.querySelector(".popup__form"),this._handleFormSubmit=t,this._inputList=Array.from(this._form.querySelectorAll(".popup__input"))}_getInputValues(){return this._formValues={},this._inputList.forEach((e=>{this._formValues[e.name]=e.value})),this._formValues}setEventListeners(){this._popupElement.addEventListener("submit",(e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues(),(()=>{this.close()}))})),super.setEventListeners()}close(){this._form.reset(),super.close()}}let _;const u=new class{constructor(e){this.baseUrl=e.baseUrl,this.headers=e.headers}_checkResponse(e){return e.ok?e.json():Promise.reject(new Error(`Ошибка: ${e.status}`))}getUserInfo(){return fetch(`${this.baseUrl}/users/me`,{headers:this.headers}).then(this._checkResponse)}getInitialCards(){return fetch(`${this.baseUrl}/cards`,{method:"GET",headers:this.headers}).then(this._checkResponse)}updateUserInfo(e){return fetch(`${this.baseUrl}/users/me`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({name:e.name,about:e.about})}).then(this._checkResponse)}updateAvatar(e){return fetch(`${this.baseUrl}/users/me/avatar`,{method:"PATCH",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify({avatar:e.avatar})}).then(this._checkResponse)}addCard(e){return fetch(`${this.baseUrl}/cards`,{method:"POST",headers:{...this.headers,"Content-Type":"application/json"},body:JSON.stringify(e)}).then(this._checkResponse)}deleteMyCard(e){return fetch(`${this.baseUrl}/cards/${e}`,{method:"DELETE",headers:this.headers}).then(this._checkResponse)}likeCard(e){return fetch(`${this.baseUrl}/cards/${e}/likes`,{method:"PUT",headers:this.headers}).then(this._checkResponse)}unlikeCard(e){return fetch(`${this.baseUrl}/cards/${e}/likes`,{method:"DELETE",headers:this.headers}).then(this._checkResponse)}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-68",headers:{authorization:"70f24e40-981a-4d62-bb24-0aeaa2de0af4"}});function p(e,t){e.querySelector(".popup__button-edit").textContent=t}Promise.all([u.getUserInfo(),u.getInitialCards()]).then((([e,t])=>{_=e._id,k.setUserInfo(e),L.renderItems(t)})).catch((e=>{console.log(e)}));const m=new class extends c{constructor(e){super(e),this._form=this._popupElement.querySelector(".popup__form")}callbackSubmit(e){this._handleSubmit=e}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleSubmit()}))}}(".popup_basket"),k=new class{constructor({nameElement:e,aboutElement:t,avatarElement:s}){this._nameElement=document.querySelector(e),this._aboutElement=document.querySelector(t),this._avatarElement=document.querySelector(s)}getUserInfo(){return{name:this._nameElement.textContent,about:this._aboutElement.textContent,avatar:this._avatarElement.src}}setUserInfo({name:e,about:t,avatar:s}){this._nameElement.textContent=e,this._aboutElement.textContent=t,this._avatarElement.src=s}}({nameElement:".profile__name",aboutElement:".profile__about",avatarElement:".profile__avatar"}),b=new d({popupElement:".popup_profile",handleFormSubmit:(e,t)=>{p(n,"Сохранение..."),u.updateUserInfo(e).then((e=>{k.setUserInfo(e),t()})).catch((e=>{console.log(e)})).finally((()=>{p(n,"Сохранить")}))}}),v=new d({popupElement:".popup_avatar",handleFormSubmit:(e,t)=>{p(l,"Сохранение..."),u.updateAvatar(e).then((e=>{k.setUserInfo(e),t()})).catch((e=>{console.log(e)})).finally((()=>{p(l,"Сохранить")}))}}),E=new class extends c{constructor(e){super(e),this._zoomMask=this._popupElement.querySelector(".popup-mesto__mask"),this._zoomName=this._popupElement.querySelector(".popup-mesto__name")}open(e){super.open(),this._zoomMask.src=e.link,this._zoomName.textContent=e.name,this._zoomMask.alt=e.alt}}(".popup-mesto");function y(t){const s=new e({myId:_,data:t,handleCardClick:()=>{E.open(t)},handleDeleteClick:()=>{m.open(),m.callbackSubmit((()=>{p(a,"Удаление..."),u.deleteMyCard(t._id).then((e=>{s.deleteCard(e),m.close()})).catch((e=>{console.log(e)})).finally((()=>{p(a,"Да")}))}))},handleSetLike:e=>{u.likeCard(e).then((e=>{s.handleLikeClick(e)})).catch((e=>{console.log(`handleSetLike - ${e}`)}))},handleDeleteLike:e=>{u.unlikeCard(e).then((e=>{s.handleLikeClick(e)})).catch((e=>{console.log(`handleDeleteLike - ${e}`)}))}},"#card-template"),n=s.generateCard();return t.owner._id!==_&&n.querySelector(".card__basket").remove(),n}const L=new class{constructor({renderer:e},t){this._renderer=e,this._selector=document.querySelector(t)}renderItems(e){e.reverse().forEach((e=>{this._renderer(e)}))}addItem(e){this._selector.prepend(e)}}({renderer:e=>{const t=y(e);L.addItem(t)}},".cards"),S=new d({popupElement:".popup_card",handleFormSubmit:(e,t)=>{const s={name:e.name,link:e.link};p(i,"Сохранение..."),u.addCard(s).then((e=>{!function(e){const t=y(e);L.addItem(t)}(e),t()})).catch((e=>{console.log(e)})).finally((()=>{p(i,"Создать")}))}});s.addEventListener("click",(()=>{b.open()})),o.addEventListener("click",(()=>{v.open()})),r.addEventListener("click",(()=>{S.open()})),b.setEventListeners(),S.setEventListeners(),E.setEventListeners(),v.setEventListeners(),m.setEventListeners(),new t(h,i).enableValidation(),new t(h,n).enableValidation(),new t(h,l).enableValidation()})();