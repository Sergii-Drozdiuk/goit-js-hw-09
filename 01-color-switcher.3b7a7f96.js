!function(){let t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");e.setAttribute("disabled","");let d=null;t.addEventListener("click",()=>{d=setInterval(()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`,t.setAttribute("disabled",""),e.removeAttribute("disabled")},1e3)}),e.addEventListener("click",()=>{clearInterval(d),e.setAttribute("disabled",""),t.removeAttribute("disabled")})}();
//# sourceMappingURL=01-color-switcher.3b7a7f96.js.map
