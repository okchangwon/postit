!function(t){function i(i){for(var s,h,r=i[0],a=i[1],_=i[2],l=0,c=[];l<r.length;l++)h=r[l],o[h]&&c.push(o[h][0]),o[h]=0;for(s in a)Object.prototype.hasOwnProperty.call(a,s)&&(t[s]=a[s]);for(d&&d(i);c.length;)c.shift()();return n.push.apply(n,_||[]),e()}function e(){for(var t,i=0;i<n.length;i++){for(var e=n[i],s=!0,r=1;r<e.length;r++){var a=e[r];0!==o[a]&&(s=!1)}s&&(n.splice(i--,1),t=h(h.s=e[0]))}return t}var s={},o={1:0},n=[];function h(i){if(s[i])return s[i].exports;var e=s[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,h),e.l=!0,e.exports}h.m=t,h.c=s,h.d=function(t,i,e){h.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:e})},h.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},h.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return h.d(i,"a",i),i},h.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},h.p="";var r=window.webpackJsonp=window.webpackJsonp||[],a=r.push.bind(r);r.push=i,r=r.slice();for(var _=0;_<r.length;_++)i(r[_]);var d=a;n.push([10,0]),e()}([,,function(t,i,e){"use strict";(function(t){e.d(i,"a",function(){return h});var s=e(0),o=e.n(s);const n=[];class h extends o.a{constructor(){super(),n.push(this),this._init(),this._caching(),this._activate()}_init(){this._offset={},this._options=this._getOptions(),this._visible=!1}_caching(){this._$window=t(window),this._$document=t(document),this._$el=t(this._options.selector).eq(0)}_activate(){this._$window.on("mousedown",this._onMousedownWindow.bind(this)),this._$window.on("resize",this._onResizeWindow.bind(this)),this._$el.on("click contextmenu","._btn",this._onClickBtn.bind(this))}_onMousedownWindow(i){t(i.target).closest(this._options.selector).length||this._visible&&this.hide()}_onResizeWindow(){this._visible&&this._adjustPosition()}_onClickBtn(i){const e=t(i.target).data("code");this.hide(),this.emit(e,i),i.preventDefault()}_setPosition(t){const i=this._$document.width(),e=this._$document.height(),s=this._$el.width(),o=this._$el.height(),n=t.left>i-s?t.left-s:t.left,h=t.top>e-o?t.top-o:t.top;this._offset={left:n,top:h},this._$el.css(this._offset)}_adjustPosition(){const t=this._$document.width(),i=this._$document.height(),e=this._$el.width(),s=this._$el.height(),o=Math.min(this._offset.left,t-e),n=Math.min(this._offset.top,i-s);this._offset={left:o,top:n},this._$el.css(this._offset)}isVisible(){return this._visible}getOffset(){return this._offset}show({offset:t}){this._visible=!0,this._setPosition(t),this._$el.stop().slideDown(50)}hide(){this._visible&&(this._visible=!1,this._$el.fadeOut(150))}}}).call(this,e(1))},function(t,i,e){"use strict";e.d(i,"a",function(){return n});var s=e(0),o=e.n(s);class n extends o.a{constructor(){super(),this._init(),this._caching(),this._activate()}_init(){}_caching(){}_activate(){}_getOffsetFromEvent(t){return{left:t.clientX,top:t.clientY}}}},function(t,i,e){"use strict";var s=e(0),o=e.n(s);const n={text:"",textSize:12,textColor:"black",bgColor:"yellow",fold:!1,left:0,top:0,timer:-1,width:250,height:200};let h=0;class r{constructor(t){this.id=this.id||t.id||(new Date).getTime(),this.sort=++h,Object.assign(this,n,t)}set(t){Object.assign(this,t)}resetDefaultSize(){this.set({width:n.width,height:n.height})}}e.d(i,"a",function(){return a});class a extends o.a{constructor(){super(),this._list=[]}create(t={},i){const e=new r(t);this._list.push(e),this.save(),"function"==typeof i&&i(e)}empty(t){this._list=[],this.save(),"function"==typeof t&&t()}remove(t,i){const e=this.find(t);e&&(this._list.splice(this._list.indexOf(e),1),e._interval&&(clearInterval(e._interval),e._interval=null),this.save(),"function"==typeof i&&i())}find(t){return this._list.find(i=>i.id===Number(t))}update(t,i){this.find(t).set(i),this.save()}save(){localStorage.setItem("postits",JSON.stringify(this._list))}load(){return JSON.parse(localStorage.getItem("postits"))}toFront(t,i){const e=this.find(t),s=this._list.slice();s.splice(s.indexOf(e),1),s.push(e),s.forEach((t,i)=>{t.sort=i}),this.save(),"function"==typeof i&&i(s.map(t=>t.id))}sort(t,i){this._list.forEach((i,e)=>{i.resetDefaultSize();const s=Math.min(t.width-i.width,t.height-i.height)-20,o=20*Math.floor(s/20);let n=20*e,h=20*e;n=n%o+20*Math.floor(n/o),n%=20*Math.floor((t.width-i.width)/20),h%=o,i.left=n+20,i.top=h+20,i.sort=e}),this.save(),"function"==typeof i&&i(this._list)}}},function(t,i,e){"use strict";e.d(i,"a",function(){return o});var s=e(2);class o extends s.a{_getOptions(){return{selector:"._postit_contextmenu"}}_caching(){super._caching(),this._$textColor=this._$el.find("._textColor"),this._$textSize=this._$el.find("._textSize"),this._$bgColor=this._$el.find("._bgColor"),this._$fold=this._$el.find("._fold"),this._$unfold=this._$el.find("._unfold"),this._$timer=this._$el.find("._timer")}_activate(){super._activate(),this._$bgColor.on("change",this._onChangeBgColor.bind(this)),this._$textSize.on("change",this._onChangeTextSize.bind(this)),this._$textColor.on("change",this._onChangeTextColor.bind(this))}_onChangeBgColor(){const t=this._$bgColor.val();this._$bgColor.attr("data-value",t),this.emit("changeBgColor",t)}_onChangeTextSize(){this.emit("changeTextSize",this._$textSize.val())}_onChangeTextColor(){const t=this._$textColor.val();this._$textColor.attr("data-value",t),this.emit("changeTextColor",t)}show({offset:t,postit:i}){super.show({offset:t}),this.postitId=i.id,this.update(i)}update(t){this._$textColor.val(t.textColor),this._$textSize.val(t.textSize),this._$bgColor.val(t.bgColor),this._$fold.toggle(!t.fold),this._$unfold.toggle(t.fold),this._$bgColor.attr("data-value",t.bgColor),this._$textColor.attr("data-value",t.textColor),this._$timer.is(":focus")||this._$timer.val(t.timer>0?t.timer:0)}hide(){super.hide();const t=Number(this._$timer.val());this.emit("hide",this.postitId,t)}}},function(t,i,e){"use strict";(function(t){e.d(i,"a",function(){return n});var s=e(3),o=e(5);class n extends s.a{_init(){this._contextmenu=new o.a,this._draggingPostitId=null}_caching(){this._$window=t(window),this._$document=t(document),this._$board=t("._postit_board").eq(0),this._template=t("script[type='text/x-postit-template']").text()}_activate(){this._$board.on("contextmenu","._postit",this._onContextmenu.bind(this)).on("mousedown","._postit",this._onMousedownPostit.bind(this)).on("click","._toggle_btn",this._onClickFold.bind(this)).on("click","._remove_btn",this._onClickRemove.bind(this)).on("input","._text",this._onInputText.bind(this)).on("mousedown","._postit ._header",this._onMousedownHeader.bind(this)).on("mousedown","._postit ._text",this._onMousedownTextarea.bind(this)),this._contextmenu.on("fold",this._onFold.bind(this)).on("delete",this._onRemove.bind(this)).on("changeBgColor",this._onChangeBgColor.bind(this)).on("changeTextSize",this._onChangeTextSize.bind(this)).on("changeTextColor",this._onChangeTextColor.bind(this)).on("hide",this._onHideContextmenu.bind(this)),this._$window.on("resize",this._onResizeWindow.bind(this)).on("mousemove",this._onMousemoveWindow.bind(this)).on("mouseup",this._onMouseupWindow.bind(this))}_onContextmenu(i){const e=t(i.currentTarget),s=Number(e.data("id")),o=this._getOffsetFromEvent(i);this.emit("contextmenu",o,s),i.preventDefault()}openContextmenu(t,i){this._contextmenu.show({offset:t,postit:i})}_find(t){const i=this._$board.find(`._postit[data-id='${t}']`);return i.length?i:null}_create(i){return t(this._template).attr("data-id",i.id).appendTo(this._$board)}_onMousedownPostit(i){const e=t(i.currentTarget),s=Number(e.data("id"));this.emit("toFront",s)}_onClickFold(i){const e=t(i.target).closest("._postit").attr("data-id");this.emit("fold",e)}_onClickRemove(i){const e=t(i.target).closest("._postit").attr("data-id");this.emit("remove",e)}_onInputText(i){const e=t(i.target).closest("._postit").attr("data-id"),s=t(i.currentTarget).val();this.emit("changeText",e,s)}_onFold(){const t=this._contextmenu.postitId;this.emit("fold",t)}_onRemove(){const t=this._contextmenu.postitId;this.emit("remove",t)}_onChangeBgColor(t){const i=this._contextmenu.postitId;this.emit("changeBgColor",i,t)}_onChangeTextSize(t){const i=this._contextmenu.postitId;this.emit("changeTextSize",i,t)}_onChangeTextColor(t){const i=this._contextmenu.postitId;this.emit("changeTextColor",i,t)}_onHideContextmenu(t,i){i&&this.emit("setPostitTimer",t,i)}_onResizeWindow(){this._$board.find("._postit").each((i,e)=>{this._adjustPosition(t(e))})}_onMousedownTextarea(i){const e=t(i.currentTarget),s=e.closest("._postit");s.addClass("selected"),s.data({textareaWidth:parseInt(e.width(),10),textareaHeight:parseInt(e.height(),10)})}_onMousedownHeader(i){const e=t(i.currentTarget).closest("._postit"),s=Number(e.data("id"));this._draggingPostitId=s}_onMousemoveWindow(t){if(this._draggingPostitId){const i=this._$board.find(`._postit[data-id='${this._draggingPostitId}']`),e=t.originalEvent,s=parseInt(i.css("left"),10)+e.movementX,o=parseInt(i.css("top"),10)+e.movementY;this.emit("movePostit",this._draggingPostitId,s,o)}}_onMouseupWindow(){const t=this._$board.find("._postit.selected");if(t.length){const i=t.find("._text"),e=i.width()-t.data("textareaWidth"),s=i.height()-t.data("textareaHeight"),o=t.attr("data-id");(e||s)&&(this.emit("resizePostit",o,e,s),this._adjustPosition(t)),t.removeClass("selected")}this._draggingPostitId&&(this._draggingPostitId=null)}_adjustPosition(t){const i=t.attr("data-id"),e=this._$document.width(),s=this._$document.height(),o=t.width(),n=t.height(),h=parseInt(t.css("left"),10),r=parseInt(t.css("top"),10),a=Math.max(0,Math.min(h,e-o)),_=Math.max(0,Math.min(r,s-n));h===a&&r===_||this.emit("adjustPosition",i,a,_),this._adjustSize(t)}_adjustSize(t){const i=t.attr("data-id"),e=this._$document.width(),s=this._$document.height(),o=t.width(),n=t.height();(o>e||n>s)&&this.emit("adjustSize",i,Math.min(o,e),Math.min(n,s))}render(t){const i=this._find(t.id)||this._create(t),e=i.find("._text");e.val()!==t.text&&e.val(t.text),e.css({width:t.width-2,height:t.height-16,color:t.textColor,"font-size":`${t.textSize}px`}),i.find("._remain_time").text(`[${t.timer}초 남음]`).toggle(t.timer>=0),i.find("._title").text(t.text.trim().split("\n")[0]).css({color:t.textColor}),i.is(":visible")&&!this._draggingPostitId?i.stop(!0,!0).animate({left:t.left,top:t.top},100,()=>{this._adjustPosition(i)}):(i.css({left:t.left,top:t.top}),this._adjustPosition(i)),t.timer&&this._contextmenu.isVisible()&&this._contextmenu.postitId===t.id&&this._contextmenu.update(t),i.css({"z-index":t.sort+1e3}).attr("data-bg-color",t.bgColor).toggleClass("fold",t.fold).show()}empty(){this._$board.find("._postit").remove()}remove(t){this._$board.find(`._postit[data-id='${t}']`).remove(),t===this._contextmenu.postitId&&this._contextmenu.hide()}updateZindex(t){t.forEach((t,i)=>{this._$board.find(`._postit[data-id='${t}']`).css({"z-index":i+1e3})})}}}).call(this,e(1))},function(t,i,e){"use strict";e.d(i,"a",function(){return o});var s=e(2);class o extends s.a{_getOptions(){return{selector:"._global_contextmenu"}}}},function(t,i,e){"use strict";(function(t){e.d(i,"a",function(){return n});var s=e(3),o=e(7);class n extends s.a{_init(){this._contextmenu=new o.a}_caching(){this._$el=t("._postit_board").eq(0)}_activate(){this._$el.on("contextmenu",this._onContextmenu.bind(this)),this._contextmenu.on("create",this._onCreate.bind(this)).on("sort",this._onSort.bind(this)).on("empty",this._onEmpty.bind(this))}_onContextmenu(t){this._$el.is(t.target)&&(this._contextmenu.show({offset:this._getOffsetFromEvent(t)}),t.preventDefault())}_onCreate(){const t=this._contextmenu.getOffset();this.emit("create",t)}_onSort(){const t={width:this._$el.width(),height:this._$el.height()};this.emit("sort",t)}_onEmpty(){this.emit("empty")}}}).call(this,e(1))},function(t,i,e){"use strict";e.d(i,"a",function(){return s});class s{constructor(t,i,e){this._store=t,this._boardView=i,this._postitView=e,this._activate(),this._load()}_activate(){this._boardView.on("create",this._onCreate.bind(this)).on("sort",this._onSort.bind(this)).on("empty",this._onEmpty.bind(this)),this._postitView.on("fold",this._onFold.bind(this)).on("remove",this._onRemove.bind(this)).on("changeText",this._onChangeText.bind(this)).on("contextmenu",this._onContextmenu.bind(this)).on("changeBgColor",this._onChangeBgColor.bind(this)).on("changeTextSize",this._onChangeTextSize.bind(this)).on("changeTextColor",this._onChangeTextColor.bind(this)).on("setPostitTimer",this._onSetPostitTimer.bind(this)).on("adjustPosition",this._onAdjustPosition.bind(this)).on("adjustSize",this._onAdjustSize.bind(this)).on("toFront",this._onToFront.bind(this)).on("resizePostit",this._onResizePostit.bind(this)).on("movePostit",this._onMovePostit.bind(this))}_load(){(this._store.load()||[]).forEach(t=>{this._store.create(t,t=>{this._postitView.render(t),this._initPostitTimer(t.id,t.timer)})})}_onCreate(t){this._store.create({},i=>{this._store.update(i.id,{left:t.left,top:t.top}),this._postitView.render(i)})}_onSort(t){this._store.sort(t,t=>t.forEach(t=>{this._postitView.render(t)}))}_onEmpty(){this._store.empty(()=>{this._postitView.empty()})}_onFold(t){const i=this._store.find(t);this._store.update(t,{fold:!i.fold}),this._postitView.render(i)}_onRemove(t){this._store.remove(t,()=>{this._postitView.remove(t)})}_onChangeText(t,i){const e=this._store.find(t);e.text!==i&&(this._store.update(t,{text:i}),this._postitView.render(e))}_onContextmenu(t,i){const e=this._store.find(i);this._postitView.openContextmenu(t,e)}_onChangeBgColor(t,i){const e=this._store.find(t);this._store.update(t,{bgColor:i}),this._postitView.render(e)}_onChangeTextSize(t,i){const e=this._store.find(t);this._store.update(t,{textSize:i}),this._postitView.render(e)}_onChangeTextColor(t,i){const e=this._store.find(t);this._store.update(t,{textColor:i}),this._postitView.render(e)}_onSetPostitTimer(t,i){this._initPostitTimer(t,i)}_initPostitTimer(t,i){const e=this._store.find(t);!e||i<0||(e._interval&&(clearInterval(e._interval),e._interval=null),this._store.update(e.id,{timer:i}),this._postitView.render(e),e._interval=setInterval(()=>{--i>=0&&(this._store.update(e.id,{timer:i}),this._postitView.render(e)),0===i&&(clearInterval(e._interval),e._interval=null,this._store.remove(e.id,()=>{this._postitView.remove(e.id)}))},1e3))}_onAdjustPosition(t,i,e){const s=this._store.find(t);this._store.update(t,{left:i,top:e}),this._postitView.render(s)}_onAdjustSize(t,i,e){const s=this._store.find(t);this._store.update(t,{width:i,height:e}),this._postitView.render(s)}_onToFront(t){this._store.toFront(t,t=>{this._postitView.updateZindex(t)})}_onResizePostit(t,i,e){const s=this._store.find(t);this._store.update(t,{width:s.width+i,height:s.height+e})}_onMovePostit(t,i,e){const s=this._store.find(t);this._store.update(t,{left:i,top:e}),this._postitView.render(s)}}},function(t,i,e){"use strict";e.r(i),function(t){var i=e(9),s=e(4),o=e(8),n=e(6);t(function(){const t=new s.a,e=new o.a,h=new n.a;window.postitApp=new i.a(t,e,h)})}.call(this,e(1))}]);