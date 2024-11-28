(() => {
  window.GC_Observer = null;
  const attachObserver = () => {
    const moveCounterId = "GC_MoveCounter";
    const moveListSelectorEvents = "wc-events-move-list";
    const moveListSelectorEventsSelected = "wc-events-move-list span.selected";
    const moveListSelector = "wc-move-list";
    const moveListSelectorSelected = "wc-move-list span.selected";
    const sidebarClassName = "nav-top-menu";

    if (!document.getElementById(moveCounterId)) {
      const c = document.createElement("div");
      c.style = "display: flex;justify-content: center;font-size: xxx-large;";
      c.id = moveCounterId;
      const sidebar = document.getElementsByClassName(sidebarClassName)[0];
      if (sidebar) {
        sidebar.appendChild(c);
      } else {
        console.error("Sidebar element not found.");
        return;
      }
    }
    const updateMoveCounter = () => {
      let selectedSpan = document.querySelector(moveListSelectorEventsSelected);
      if (!selectedSpan) {
        selectedSpan = document.querySelector(moveListSelectorSelected);
      }
      if (selectedSpan) {
        let moveText = selectedSpan.parentElement?.parentElement?.childNodes[0]?.textContent || "";
        if (moveText.length <= 1) {
          const previousSibling = selectedSpan.parentElement?.parentElement?.previousElementSibling;
          moveText = previousSibling?.childNodes[0]?.textContent || "";
        }
        document.getElementById(moveCounterId).textContent = moveText;
      }
    };

    let targetNode = document.getElementsByTagName(moveListSelectorEvents)[0];
    if (!targetNode) {
      targetNode = document.getElementsByTagName(moveListSelector)[0];
    }

    if (targetNode) {
      if (window.GC_Observer) {
        window.GC_Observer.disconnect();
        window.GC_Observer = null;
      }
      window.GC_Observer = new MutationObserver(updateMoveCounter);
      window.GC_Observer.observe(targetNode, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class"],
      });

      updateMoveCounter();
    } else {
      console.error(`Element "${moveListSelector}" not found.`);
    }
  };

  const targetNode = document.getElementById("board-layout-sidebar");
  const observerWrapper = new MutationObserver(attachObserver);
  observerWrapper.observe(targetNode, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });

  attachObserver();
})();

// Bookmarklet:
// javascript:(()=>{window.GC_Observer=null;const attachObserver=()=>{const moveCounterId="GC_MoveCounter";const moveListSelectorEvents="wc-events-move-list";const moveListSelectorEventsSelected="wc-events-move-list span.selected";const moveListSelector="wc-move-list";const moveListSelectorSelected="wc-move-list span.selected";const sidebarClassName="nav-top-menu";if(!document.getElementById(moveCounterId)){const c=document.createElement("div");c.style="display:flex;justify-content:center;font-size:xxx-large;";c.id=moveCounterId;const sidebar=document.getElementsByClassName(sidebarClassName)[0];if(sidebar){sidebar.appendChild(c);}else{console.error("Sidebar element not found.");return;}}const updateMoveCounter=()=>{let selectedSpan=document.querySelector(moveListSelectorEventsSelected);if(!selectedSpan){selectedSpan=document.querySelector(moveListSelectorSelected);}if(selectedSpan){let moveText=selectedSpan.parentElement?.parentElement?.childNodes[0]?.textContent||"";if(moveText.length<=1){const previousSibling=selectedSpan.parentElement?.parentElement?.previousElementSibling;moveText=previousSibling?.childNodes[0]?.textContent||"";}document.getElementById(moveCounterId).textContent=moveText;}};let targetNode=document.getElementsByTagName(moveListSelectorEvents)[0];if(!targetNode){targetNode=document.getElementsByTagName(moveListSelector)[0];}if(targetNode){if(window.GC_Observer){window.GC_Observer.disconnect();window.GC_Observer=null;}window.GC_Observer=new MutationObserver(updateMoveCounter);window.GC_Observer.observe(targetNode,{childList:true,subtree:true,attributes:true,attributeFilter:["class"],});updateMoveCounter();}else{console.error(`Element "${moveListSelector}" not found.`);}};const targetNode=document.getElementById("board-layout-sidebar");const observerWrapper=new MutationObserver(attachObserver);observerWrapper.observe(targetNode,{childList:true,subtree:true,attributes:true,attributeFilter:["class"],});attachObserver();})();
