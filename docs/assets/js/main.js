"use strict";const request=document.querySelector(".js-inputText"),results=document.querySelector(".results__container"),searchButton=document.querySelector(".js-search__btn");searchButton.addEventListener("click",getData);const deleteButton=document.querySelector(".deleteButton");deleteButton.addEventListener("click",deleteAllFav);let series=[],seriesFav=[];function getLocalStorage(){const e=localStorage.getItem("favSeries"),t=JSON.parse(e);null!==t&&(seriesFav=t,paintLocalstoreSeries())}function paintLocalstoreSeries(){for(let e of seriesFav){const t=document.querySelector(".fav__container");paintSerie(e,e.show.id,t,"eachSerieFav__container",!1,"resultFavTitle").addEventListener("click",removeFav)}}function setLocalStorage(e){localStorage.setItem("favSeries",JSON.stringify(e))}function getData(){const e=request.value;fetch("//api.tvmaze.com/search/shows?q="+e).then(e=>e.json()).then(e=>{cleanDiv(results),series=e;const t=getFavInd();for(let e=0;e<series.length;e++){const r=parseInt(series[e].show.id);-1!=t.indexOf(r)?paintSerie(series[e],r,results,"eachSerie__container",!0,"resultTitle"):paintSerie(series[e],r,results,"eachSerie__container",!1,"resultTitle")}listenImages()})}function paintSerie(e,t,r,a,s,n){const o=createDiv(createTitle(e.show.name,n),createImg(e),t,a,s);return r.appendChild(o),o}function listenImages(){const e=document.querySelectorAll(".eachSerie__container");for(const t of e)t.addEventListener("click",favSeries)}function favSeries(e){const t=series.find(t=>t.show.id==e.currentTarget.id),r=t.show.id;if(-1==getFavInd().indexOf(parseInt(r))){seriesFav.push(t),e.currentTarget.classList.add("alreadyFav");paintSerie(t,r,document.querySelector(".fav__container"),"eachSerieFav__container",!1,"resultFavTitle").addEventListener("click",removeFav),localStorage.removeItem("favSeries"),seriesFav.length>0&&setLocalStorage(seriesFav)}else removeFavFromResult(e.currentTarget.id)}function removeFavFromResult(e){const t=document.querySelectorAll(".eachSerieFav__container");for(const r of t)r.id==e&&r.remove();const r=getFavInd().indexOf(e);seriesFav.splice(r,1),localStorage.removeItem("favSeries"),seriesFav.length>0&&setLocalStorage(seriesFav);const a=document.querySelectorAll(".eachSerie__container");for(const t of a)t.id==e&&t.classList.remove("alreadyFav")}function removeFav(e){e.currentTarget.remove();const t=getFavInd().indexOf(parseInt(e.currentTarget.id));seriesFav.splice(t,1),localStorage.removeItem("favSeries"),seriesFav.length>0&&setLocalStorage(seriesFav);const r=document.querySelectorAll(".eachSerie__container");for(const t of r)t.id==parseInt(e.currentTarget.id)&&t.classList.remove("alreadyFav")}function deleteAllFav(){localStorage.removeItem("favSeries"),seriesFav=[];cleanDiv(document.querySelector(".fav__container"));const e=document.querySelectorAll(".eachSerie__container");for(const t of e)t.classList.remove("alreadyFav")}function getFavInd(){let e=[];for(let t of seriesFav)e.push(parseInt(t.show.id));return e}function createImg(e){const t=document.createElement("img");return t.classList.add("resultImg"),t.classList.add("js-resultImg"),e.show.image?t.src=e.show.image.original:t.src="//via.placeholder.com/210x295/ffffff/666666/?text="+e.show.name,t}function createTitle(e,t){const r=document.createElement("p");r.classList.add(t);const a=document.createTextNode(e);return r.appendChild(a),r}function createDiv(e,t,r,a,s){const n=document.createElement("div");return n.classList.add(a),s&&n.classList.add("alreadyFav"),n.id=r,n.appendChild(t),n.appendChild(e),n}function cleanDiv(e){for(;e.firstChild;)e.removeChild(e.firstChild)}getLocalStorage();