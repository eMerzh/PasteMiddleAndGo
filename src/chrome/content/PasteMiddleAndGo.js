
var middlego = {
  
  isUrl: function(e)
  {
    var v = new RegExp();
    v.compile('^ *(https?:\\/\\/)?(www\\.)?([a-zA-Z1-90-]{2,}\\.)+?([a-zA-Z-]{2,6})(:\\d{2,})?(\\/\\S+)* *$');
    if (!v.test(e))
    {
      return false;
    }
    return true;
  },
  
  onPastAction: function()
  {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"].
      getService(Components.interfaces.nsIPrefBranch);
    var u=readFromClipboard();
    
    var ss = Components.classes["@mozilla.org/browser/search-service;1"]. 
      getService(Ci.nsIBrowserSearchService);
      
    var engine = ss.currentEngine;
    var search = engine.getSubmission(u,null);
    var browser = getBrowser();
    
      
    var browser = getBrowser();
    if(middlego.isUrl(u))
    {
      var tab = browser.loadOneTab(u,null,null,null,false,false);
    }
    else
    {
      var tab = browser.loadOneTab(search.uri.spec,null,null,search.postData,true,false);
    }
    browser.selectedTab = tab;
  }
}

function checkForMiddleClick(node, event) {
  // We should be using the disabled property here instead of the attribute,
  // but some elements that this function is used with don't support it (e.g.
  // menuitem).
  if (node.getAttribute("disabled") == "true")
    return; // Do nothing

  if (event.button == 1) {
    /*ChangeTabButton overlay*/
  if( node.getAttribute("class") == "tabs-newtab-button")
  {
    //gBrowser.selectedTab = gBrowser.addTab("http://www.perdu.com/");
    middlego.onPastAction();
    return;
  }
  
  /* Execute the node's oncommand or command.
     *
     * XXX: we should use node.oncommand(event) once bug 246720 is fixed.
     */
    var target = node.hasAttribute("oncommand") ? node :
                 node.ownerDocument.getElementById(node.getAttribute("command"));
    var fn = new Function("event", target.getAttribute("oncommand"));
    fn.call(target, event);

    // If the middle-click was on part of a menu, close the menu.
    // (Menus close automatically with left-click but not with middle-click.)
    closeMenus(event.target);
  }
}