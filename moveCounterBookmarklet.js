(() => {
  window.GC_Observer = null;
  const attachObserver = () => {
    const moveCounterId = "GC_MoveCounter";
    const moveListSelectorEvents = "wc-events-move-list";
    const moveListSelector = "wc-move-list";
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
      let selectedSpan = document.querySelector(
        `${moveListSelectorEvents} span.selected`
      );
      if (!selectedSpan) {
        selectedSpan = document.querySelector(
          `${moveListSelector} span.selected`
        );
      }
      if (selectedSpan) {
        let moveText =
          selectedSpan.parentElement?.parentElement?.childNodes[0]
            ?.textContent || "";
        if (moveText.length <= 1) {
          const previousSibling =
            selectedSpan.parentElement?.parentElement?.previousElementSibling;
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
// javascript:(()=>{window.GC_Observer=null;const attachObserver=()=>{const e="GC_MoveCounter",t="wc-events-move-list",o="wc-move-list",n="nav-top-menu";if(!document.getElementById(e)){const t=document.createElement("div");t.style="display: flex;justify-content: center;font-size: xxx-large;",t.id=e;const o=document.getElementsByClassName(n)[0];if(o)o.appendChild(t);else return void console.error("Sidebar element not found.")}const c=()=>{let n=document.querySelector(`${t} span.selected`);n||(n=document.querySelector(`${o} span.selected`)),n&&(moveText=n.parentElement?.parentElement?.childNodes[0]?.textContent||"",moveText.length<=1&&(moveText=n.parentElement?.parentElement?.previousElementSibling?.childNodes[0]?.textContent||""),document.getElementById(e).textContent=moveText)};let r=document.getElementsByTagName(t)[0];r||(r=document.getElementsByTagName(o)[0]),r?(window.GC_Observer&&(window.GC_Observer.disconnect(),window.GC_Observer=null),window.GC_Observer=new MutationObserver(c),window.GC_Observer.observe(r,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]}),c()):console.error(`Element "${o}" not found.`)};const t=document.getElementById("board-layout-sidebar"),o=new MutationObserver(attachObserver);o.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]}),attachObserver()})();
